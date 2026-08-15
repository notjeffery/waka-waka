"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, MessageCircle } from "lucide-react";

const FAQS = [
  {
    q: "How do I know my payment is safe?",
    a: "Your money stays in escrow until you approve it on the live call — the shopper never handles your purchase funds directly.",
  },
  {
    q: "What if a shopper doesn't show up?",
    a: "You can select a different shopper from your errand's offer list at any time before payment is approved, no charge either way.",
  },
  {
    q: "How do I fund my wallet?",
    a: "Go to Profile → Add funds, choose an amount, and complete payment through your bank or card.",
  },
  {
    q: "Why do I need to verify my identity?",
    a: "It protects your wallet and keeps the platform safe — required before funding above a certain amount.",
  },
];

export default function SupportPage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white text-charcoal">
      <div className="mx-auto max-w-md px-5 pt-6 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-display font-bold text-xl">Help &amp; Support</h1>
        </div>

        <div className="space-y-2 mb-8">
          {FAQS.map((item, i) => (
            <div key={item.q} className="rounded-2xl bg-paper overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
              >
                <span className="text-sm font-body font-medium">{item.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-charcoal/40 flex-shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <p className="px-4 pb-4 text-xs text-charcoal/60 leading-relaxed">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>

        <button className="w-full flex items-center justify-center gap-2 rounded-full bg-ink text-paper text-sm font-medium py-3.5 hover:bg-teal transition-colors">
          <MessageCircle size={16} />
          Contact support
        </button>
      </div>
    </main>
  );
}