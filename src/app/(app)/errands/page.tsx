"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { shopperDirectory } from "@/lib/mockShoppers";

type Message =
  | { id: string; kind: "text"; sender: "customer" | "shopper"; text: string }
  | { id: string; kind: "image"; sender: "customer" | "shopper"; url: string }
  | { id: string; kind: "payment"; status: string; price: number };

// how long a completed errand's chat stays visible before it's cleared —
// shopper's "task complete" action starts this countdown. Tune as needed.
const CHAT_CLEAR_AFTER_HOURS = 12;

type Conversation = {
  shopperId: string;
  name: string;
  market: string;
  verified: boolean;
  lastMessage: string;
  hasStarted: boolean;
  isCompleted: boolean;
};

export default function ErrandsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const list: Conversation[] = [];

    for (const [id, shopper] of Object.entries(shopperDirectory)) {
      // if this errand was marked complete more than CHAT_CLEAR_AFTER_HOURS
      // ago, it's cleared from the list entirely — filter it out here
      const completedAt = localStorage.getItem(`waka-chat-${id}-completed-at`);
      if (completedAt) {
        const hoursSince =
          (Date.now() - new Date(completedAt).getTime()) / (1000 * 60 * 60);
        if (hoursSince >= CHAT_CLEAR_AFTER_HOURS) {
          continue; // cleared — don't add to the active list
        }
      }

      const saved = localStorage.getItem(`waka-chat-${id}`);
      let lastMessage = "Tap to start the conversation";
      let hasStarted = false;

      if (saved) {
        try {
          const messages: Message[] = JSON.parse(saved);
          if (messages.length > 0) {
            hasStarted = true;
            const last = messages[messages.length - 1];
            lastMessage =
              last.kind === "text"
                ? last.text
                : last.kind === "image"
                ? "📷 Photo"
                : `💳 ₦${last.price.toLocaleString()} payment`;
          }
        } catch {
          // ignore corrupted storage
        }
      }

      list.push({
        shopperId: id,
        name: shopper.name,
        market: shopper.market,
        verified: shopper.verified,
        lastMessage: completedAt ? "Errand completed" : lastMessage,
        hasStarted,
        isCompleted: Boolean(completedAt),
      });
    }

    // active (not-yet-completed) conversations first
    list.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
    setConversations(list);
  }, []);

  return (
    <main className="min-h-screen bg-white text-charcoal pb-28">
      <div className="mx-auto max-w-md px-5 pt-6">
        <h1 className="font-display font-bold text-2xl mb-6">Errands</h1>

        {conversations.length === 0 && (
          <p className="text-charcoal/50 text-sm">
            No active errands right now.
          </p>
        )}

        <div className="space-y-2">
          {conversations.map((c) => (
            <Link
              key={c.shopperId}
              href={`/chat/${c.shopperId}`}
              className="flex items-center gap-3 rounded-2xl bg-paper p-4"
            >
              <div className="w-11 h-11 rounded-full bg-teal/10 flex items-center justify-center font-display font-bold text-teal flex-shrink-0">
                {c.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-body font-semibold text-sm">{c.name}</p>
                  {c.verified && <CheckCircle2 size={12} className="text-teal" />}
                </div>
                <p
                  className={`text-xs truncate ${
                    c.isCompleted
                      ? "text-teal"
                      : c.hasStarted
                      ? "text-charcoal/60"
                      : "text-charcoal/40 italic"
                  }`}
                >
                  {c.lastMessage}
                </p>
              </div>
              <span className="font-mono text-[10px] text-charcoal/40 flex-shrink-0">
                {c.market}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </main>
  );
}