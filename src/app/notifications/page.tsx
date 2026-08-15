"use client";

import Link from "next/link";
import { ArrowLeft, UserCheck, CheckCircle2, CreditCard, MessageCircle } from "lucide-react";

// Mock feed — replace with a real Supabase query (a `notifications` table,
// populated by triggers on errand_offers/errands/payments) once wired up
const mockNotifications = [
  {
    id: "1",
    type: "offer",
    icon: UserCheck,
    title: "Chidi O. accepted your errand",
    detail: "Food Market · ₦3,500",
    time: "2m ago",
    unread: true,
  },
  {
    id: "2",
    type: "payment",
    icon: CreditCard,
    title: "Payment sent to Iya Basira Stores",
    detail: "₦3,500 · Fresh tomatoes",
    time: "1h ago",
    unread: true,
  },
  {
    id: "3",
    type: "message",
    icon: MessageCircle,
    title: "New message from Ngozi A.",
    detail: "\"On my way to Mile 12 now\"",
    time: "3h ago",
    unread: false,
  },
  {
    id: "4",
    type: "completed",
    icon: CheckCircle2,
    title: "Errand completed",
    detail: "Fabric · Tunde F.",
    time: "Yesterday",
    unread: false,
  },
];

const iconStyles: Record<string, string> = {
  offer: "bg-teal/10 text-teal",
  payment: "bg-mint/15 text-teal",
  message: "bg-charcoal/5 text-charcoal/60",
  completed: "bg-teal/10 text-teal",
};

export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-white text-charcoal pb-10">
      <div className="mx-auto max-w-md px-5 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/dashboard" className="p-1 -ml-1">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-display font-bold text-xl">Notifications</h1>
        </div>

        <div className="space-y-2">
          {mockNotifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 rounded-2xl p-4 ${
                  n.unread ? "bg-paper" : "bg-white border border-ink/5"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${iconStyles[n.type]}`}
                >
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-sm leading-snug">
                    {n.title}
                  </p>
                  <p className="text-charcoal/50 text-xs mt-0.5">{n.detail}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className="font-mono text-[10px] text-charcoal/40">
                    {n.time}
                  </span>
                  {n.unread && <span className="w-2 h-2 rounded-full bg-clay" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}