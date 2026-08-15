"use client";

import { useState, useRef, useEffect } from "react";
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
  CheckCheck,
  CreditCard,
  Loader2,
  XCircle,
} from "lucide-react";
import { shopperDirectory } from "@/lib/mockShoppers";

type PaymentStatus = "pending" | "processing" | "completed" | "declined";

type Message =
  | { id: string; kind: "text"; sender: "customer" | "shopper"; text: string }
  | { id: string; kind: "image"; sender: "customer" | "shopper"; url: string }
  | {
      id: string;
      kind: "payment";
      status: PaymentStatus;
      itemSummary: string;
      price: number;
      vendorName: string;
      vendorAccount: string;
      vendorBank: string;
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
  const [isErrandComplete, setIsErrandComplete] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const storageKey = `waka-chat-${shopperId}`;

  // load saved conversation on mount so leaving and coming back resumes it
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {
        // ignore corrupted storage
      }
    }
    // reflect completion state immediately if this errand was already
    // marked complete in a previous visit — not just a one-time alert
    if (localStorage.getItem(`waka-chat-${shopperId}-completed-at`)) {
      setIsErrandComplete(true);
    }
    // ToS caution shows every time this errand's chat is opened —
    // intentionally not suppressed after the first view, since it's a
    // per-errand safety reminder, not a one-time device acknowledgment
    // TODO: replace with a Supabase query against the `messages` table,
    // scoped to this errand, once chat is wired to the backend
  }, [storageKey, shopperId]);

  // persist every change immediately — text messages persist across
  // reloads; image messages use blob URLs which only survive the current
  // browser session (they'll break after a real page reload) until
  // photos are uploaded to Supabase storage instead
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey]);

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

  // TEMPORARY test control — in the real app, the shopper submits these
  // vendor details from their own side of the call. This simulates that
  // arriving, so the "Approve & pay" flow can be built and tested from
  // the customer side alone until the shopper app exists.
  const simulateVendorDetails = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        kind: "payment",
        status: "pending",
        itemSummary: "Fresh tomatoes, 1 basket",
        price: 3500,
        vendorName: "Iya Basira Stores",
        vendorAccount: "0123456789",
        vendorBank: "GTBank",
      },
    ]);
  };

  const updatePaymentStatus = (id: string, status: PaymentStatus) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id && m.kind === "payment" ? { ...m, status } : m))
    );
  };

  // TODO: replace with a real backend call (Supabase Edge Function) that:
  //  1. disburses amount_to_vendor to vendor_account via Paystack/Flutterwave
  //     Transfers API
  //  2. credits shopper_fee to the shopper's wallet ledger
  //  3. updates this payment's row status (not the whole errand — an errand
  //     can involve several vendor payments if items come from different
  //     stores, so no single payment should assume the errand is finished)
  //  4. the UI should then wait for a webhook-confirmed result rather than
  //     assuming success the instant the button is tapped — the short
  //     "processing" delay below stands in for that real async wait
  const approvePayment = (msg: Message) => {
    if (msg.kind !== "payment") return;
    updatePaymentStatus(msg.id, "processing");
    setTimeout(() => {
      updatePaymentStatus(msg.id, "completed");
      // NOTE: deliberately does NOT mark the errand itself complete —
      // that's a separate signal (see the "mark complete" test control),
      // since one errand can require multiple vendor payments
    }, 1800);
  };

  const declinePayment = (msg: Message) => {
    if (msg.kind !== "payment") return;
    updatePaymentStatus(msg.id, "declined");
  };

  // guards the "mark complete" action against closing out an errand while
  // a vendor payment is still pending/processing — relevant now that a
  // single errand can involve several vendor payments
  const hasOutstandingPayment = messages.some(
    (m) => m.kind === "payment" && (m.status === "pending" || m.status === "processing")
  );

  return (
    <main className="h-screen bg-white text-charcoal flex flex-col overflow-hidden">
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
          {/* TEMPORARY test controls — belong on the shopper's side of the
              app once it exists */}
          <button
            onClick={simulateVendorDetails}
            className="w-9 h-9 rounded-full bg-paper flex items-center justify-center text-charcoal/40"
            title="TEST ONLY: simulate shopper submitting vendor payment details"
          >
            <CreditCard size={16} />
          </button>
          <button
            onClick={() => {
              if (hasOutstandingPayment) return;
              localStorage.setItem(
                `waka-chat-${shopperId}-completed-at`,
                new Date().toISOString()
              );
              setIsErrandComplete(true);
            }}
            disabled={hasOutstandingPayment || isErrandComplete}
            className="relative w-9 h-9 rounded-full bg-paper flex items-center justify-center text-charcoal/40 disabled:opacity-40"
            title={
              isErrandComplete
                ? "Errand already marked complete"
                : hasOutstandingPayment
                ? "Resolve outstanding vendor payments first"
                : "TEST ONLY: simulate shopper marking this errand complete (all vendor payments done)"
            }
          >
            <CheckCheck size={16} className={isErrandComplete ? "text-teal" : ""} />
            {/* visible (not just hover-tooltip) reason it's locked */}
            {hasOutstandingPayment && !isErrandComplete && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-clay border-2 border-white" />
            )}
          </button>
        </div>
      </div>

      {/* ===== errand-complete banner ===== */}
      {isErrandComplete && (
        <div className="flex items-center gap-2 bg-teal/10 text-teal px-4 py-2.5 text-xs font-medium flex-shrink-0">
          <CheckCircle2 size={14} />
          This errand is complete
        </div>
      )}

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
        {messages.map((msg) => {
          if (msg.kind === "payment") {
            return (
              <div key={msg.id} className="flex justify-start">
                <div className="max-w-[88%] rounded-2xl border border-ink/10 bg-white shadow-sm p-4">
                  <p className="font-mono text-[10px] text-charcoal/40 mb-2">
                    PAYMENT REQUEST
                  </p>
                  <p className="font-body font-semibold text-sm mb-1">
                    {msg.itemSummary}
                  </p>
                  <p className="font-display font-bold text-2xl mb-3">
                    ₦{msg.price.toLocaleString()}
                  </p>

                  <div className="rounded-xl bg-paper p-3 mb-4">
                    <p className="font-mono text-[10px] text-charcoal/40 mb-0.5">
                      PAYING
                    </p>
                    <p className="text-sm font-medium">{msg.vendorName}</p>
                    <p className="text-xs text-charcoal/50 font-mono">
                      {msg.vendorAccount} · {msg.vendorBank}
                    </p>
                  </div>

                  {msg.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => declinePayment(msg)}
                        className="flex-1 rounded-full border border-ink/15 text-charcoal text-xs font-medium py-2.5 hover:border-clay hover:text-clay transition-colors"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => approvePayment(msg)}
                        className="flex-1 rounded-full bg-mint text-ink text-xs font-medium py-2.5 hover:opacity-90 transition-opacity"
                      >
                        Approve &amp; pay
                      </button>
                    </div>
                  )}

                  {msg.status === "processing" && (
                    <div className="flex items-center justify-center gap-2 text-charcoal/50 text-xs py-2">
                      <Loader2 size={14} className="animate-spin" />
                      Processing payment...
                    </div>
                  )}

                  {msg.status === "completed" && (
                    <div className="flex items-center gap-2 text-teal text-xs font-medium py-1">
                      <CheckCircle2 size={14} />
                      Payment sent to vendor
                    </div>
                  )}

                  {msg.status === "declined" && (
                    <div className="flex items-center gap-2 text-clay text-xs font-medium py-1">
                      <XCircle size={14} />
                      Declined — contact support or select a different shopper
                    </div>
                  )}
                </div>
              </div>
            );
          }

          return (
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
          );
        })}
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