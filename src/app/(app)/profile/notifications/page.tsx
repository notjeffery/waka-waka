"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Prefs = {
  errandUpdates: boolean;
  chatMessages: boolean;
  paymentAlerts: boolean;
  vendorPromotions: boolean;
};

const initialPrefs: Prefs = {
  errandUpdates: true,
  chatMessages: true,
  paymentAlerts: true,
  vendorPromotions: false,
};

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`relative inline-flex items-center w-11 h-6 rounded-full flex-shrink-0 transition-colors duration-200 focus:outline-none ${
        checked ? "bg-teal" : "bg-charcoal/20"
      }`}
    >
      <span
        className={`ml-0.5 inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function NotificationPreferencesPage() {
  const router = useRouter();
  const [prefs, setPrefs] = useState<Prefs>(initialPrefs);

  const toggle = (key: keyof Prefs) =>
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <main className="min-h-screen bg-white text-charcoal">
      <div className="mx-auto max-w-md px-5 pt-6 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-display font-bold text-xl">Notifications</h1>
        </div>

        <div className="rounded-2xl bg-paper overflow-hidden mb-6">
          <div className="flex items-center gap-3 px-4 py-4 border-b border-ink/5">
            <div className="flex-1">
              <p className="text-sm font-body font-medium">Errand updates</p>
              <p className="text-xs text-charcoal/50">
                Shopper accepted, on the way, completed
              </p>
            </div>
            <Toggle checked={prefs.errandUpdates} onChange={() => toggle("errandUpdates")} />
          </div>

          <div className="flex items-center gap-3 px-4 py-4 border-b border-ink/5">
            <div className="flex-1">
              <p className="text-sm font-body font-medium">Chat messages</p>
              <p className="text-xs text-charcoal/50">New messages from shoppers</p>
            </div>
            <Toggle checked={prefs.chatMessages} onChange={() => toggle("chatMessages")} />
          </div>

          <div className="flex items-center gap-3 px-4 py-4 border-b border-ink/5">
            <div className="flex-1">
              <p className="text-sm font-body font-medium">Payment alerts</p>
              <p className="text-xs text-charcoal/50">
                Wallet funding, transfers, vendor payments
              </p>
            </div>
            <Toggle checked={prefs.paymentAlerts} onChange={() => toggle("paymentAlerts")} />
          </div>

          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex-1">
              <p className="text-sm font-body font-medium">Vendor promotions</p>
              <p className="text-xs text-charcoal/50">
                Deals from vendors advertising on Waka-Waka
              </p>
            </div>
            <Toggle
              checked={prefs.vendorPromotions}
              onChange={() => toggle("vendorPromotions")}
            />
          </div>
        </div>

        <button
          onClick={() => router.push("/profile")}
          className="w-full rounded-full bg-ink text-paper text-sm font-body font-medium py-3.5 hover:bg-teal transition-colors"
        >
          Save preferences
        </button>
      </div>
    </main>
  );
}