"use client";

import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Video,
  Phone,
  Camera,
  Send,
  ShieldAlert,
  Star,
  CheckCircle2,
  MapPin,
} from "lucide-react";

type Message =
  | { id: string; kind: "text"; sender: "customer" | "shopper"; text: string }
  | { id: string; kind: "image"; sender: "customer" | "shopper"; url: string };

// mock shopper lookup — replace with a real fetch by shopperId once wired to Supabase
const shopperDirectory: Record<
  string,
  { name: string; rating: number; categoryTrips: number; market: string; verified: boolean }
> = {
  "1": { name: "Chidi O.", rating: 4.8, categoryTrips: 42, market: "Mile 12 Market", verified: true },
  "2": { name: "Ngozi A.", rating: 4.9, categoryTrips: 67, market: "Mile 12 Market", verified: true },
  "3": { name: "Tunde F.", rating: 4.6, categoryTrips: 19, market: "Ketu Market", verified: false },
};

const suggestedPrompts = [
  "Here's what I need",
  "Let me share the specifications",
  "How soon can you get there?",
  "Can you confirm the price before buying?",
];

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const shopperId = (params?.shopperId as string) ?? "1";
  const shopper = shopperDirectory[shopperId] ?? shopperDirectory["1"];

  const [showTerms, setShowTerms] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasStartedChat = messages.length > 0;

  const sendText = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), kind: "text", sender: "customer", text: text.trim() },
    ]);
    setDraft("");
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), kind: "image", sender: "customer", url },
    ]);
    e.target.value = "";
  };

  return (
    <main className="min-h-screen bg-white text-charcoal flex flex-col">
      {/* ===== Terms of Service caution modal ===== */}
      {showTerms && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6">
            <div className="w-12 h-12 rounded-2xl bg-clay/10 flex items-center justify-center mb-4">
              <ShieldAlert size={22} className="text-clay" />
            </div>
            <h2 className="font-display font-bold text-lg leading-snug mb-2">
              Stay protected
              <br />
              keep it on Waka-Waka
            </h2>
            <p className="text-charcoal/60 text-sm leading-relaxed mb-6">
              Payments, price confirmations, and disputes are only covered
              when they happen on the platform. Sharing contact details or
              paying outside Waka-Waka means we can&rsquo;t help if something
              goes wrong.
            </p>
            <button
              onClick={() => setShowTerms(false)}
              className="w-full rounded-full bg-ink text-paper text-sm font-body font-medium py-3.5 hover:bg-teal transition-colors"
            >
              Continue to chat
            </button>
          </div>
        </div>
      )}

      {/* ===== header ===== */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-ink/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <ArrowLeft size={20} />
          </button>
          <div className="w-9 h-9 rounded-full bg-teal/10 flex items-center justify-center font-display font-bold text-teal text-sm">
            {shopper.name.charAt(0)}
          </div>
          <div>
            <p className="font-body font-semibold text-sm leading-tight">
              {shopper.name}
            </p>
            <p className="flex items-center gap-1 text-[11px] text-charcoal/50">
              <Star size={10} className="fill-mint text-mint" />
              {shopper.rating}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="w-9 h-9 rounded-full bg-paper flex items-center justify-center text-ink"
            title="Audio call (requires call infrastructure — UI only for now)"
          >
            <Phone size={16} />
          </button>
          <button
            className="w-9 h-9 rounded-full bg-paper flex items-center justify-center text-ink"
            title="Video call (requires call infrastructure — UI only for now)"
          >
            <Video size={16} />
          </button>
        </div>
      </div>

      {/* ===== message area ===== */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* shopper profile brief — appears automatically as the opener */}
        <div className="inline-flex items-center gap-2.5 rounded-2xl bg-paper px-3.5 py-2.5 max-w-[85%]">
          <div className="w-9 h-9 rounded-full bg-teal/10 flex items-center justify-center font-display font-bold text-teal text-sm flex-shrink-0">
            {shopper.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-body font-semibold text-sm leading-tight">{shopper.name}</p>
              {shopper.verified && <CheckCircle2 size={12} className="text-teal" />}
            </div>
            <p className="flex items-center gap-1 text-[11px] text-charcoal/50">
              <Star size={10} className="fill-mint text-mint" />
              {shopper.rating} · {shopper.categoryTrips} trips ·{" "}
              <MapPin size={10} />
              {shopper.market}
            </p>
          </div>
        </div>

        {/* suggested first-message prompts — only shown before the chat starts */}
        {!hasStartedChat && (
          <div className="flex flex-wrap gap-2 max-w-[90%]">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendText(prompt)}
                className="rounded-full border border-teal/40 text-teal text-xs font-medium px-3.5 py-2 hover:bg-teal/10 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* chat thread */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}
          >
            {msg.kind === "text" ? (
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.sender === "customer"
                    ? "bg-ink text-paper rounded-br-md"
                    : "bg-paper text-charcoal rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
            ) : (
              <img
                src={msg.url}
                alt="Sent"
                className="max-w-[70%] rounded-2xl border border-ink/10"
              />
            )}
          </div>
        ))}
      </div>

      {/* ===== input bar ===== */}
      <div className="border-t border-ink/10 px-4 py-3 flex items-center gap-2 flex-shrink-0">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handlePhotoCapture}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-ink flex-shrink-0"
          title="Take a photo — useful if the video call drops in a low-network market"
        >
          <Camera size={17} />
        </button>

        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendText(draft)}
          placeholder="Type a message..."
          className="flex-1 rounded-full bg-paper px-4 py-2.5 text-sm outline-none placeholder:text-charcoal/40"
        />

        <button
          onClick={() => sendText(draft)}
          className="w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center flex-shrink-0 hover:bg-teal transition-colors"
        >
          <Send size={16} />
        </button>
      </div>
    </main>
  );
}