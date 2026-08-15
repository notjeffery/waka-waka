"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const QUICK_AMOUNTS = [1000, 5000, 10000, 20000];

export default function AddFundsPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");

  const handleAddFunds = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hand off to a real payment provider (Paystack/Flutterwave)
    // then credit the wallet ledger once the payment confirms
    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-white text-charcoal">
      <div className="mx-auto max-w-md px-5 pt-6 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-display font-bold text-xl">Add funds</h1>
        </div>

        <form onSubmit={handleAddFunds}>
          <label className="block font-body text-sm font-medium mb-1.5">
            Amount
          </label>
          <div className="flex items-center rounded-2xl bg-paper px-4 py-3 mb-4">
            <span className="text-charcoal/50 mr-1">₦</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent outline-none text-sm font-mono font-semibold placeholder:text-charcoal/40"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmount(String(amt))}
                className="rounded-full bg-paper text-charcoal/60 text-xs font-medium px-3.5 py-2"
              >
                ₦{amt.toLocaleString()}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={!amount}
            className="w-full rounded-full bg-ink text-paper text-sm font-body font-medium py-3.5 hover:bg-teal transition-colors disabled:opacity-40"
          >
            Continue to payment
          </button>
        </form>
      </div>
    </main>
  );
}