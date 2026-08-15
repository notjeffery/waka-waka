"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Search } from "lucide-react";
import { shopperDirectory } from "@/lib/mockShoppers";

export default function TransferFundsPage() {
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [sent, setSent] = useState(false);

  // TODO: replace with a Supabase lookup against profiles/shopper_profiles
  // by account_number once the backend exists
  const recipient = Object.values(shopperDirectory).find(
    (s) => s.accountNumber === accountNumber
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) return;
    // TODO: write a ledger transaction (debit sender, credit recipient)
    // via a Supabase function/edge function once wallets are real
    setSent(true);
  };

  if (sent && recipient) {
    return (
      <main className="min-h-screen bg-white text-charcoal flex flex-col items-center justify-center px-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mb-5">
          <CheckCircle2 size={24} className="text-teal" />
        </div>
        <h1 className="font-display font-bold text-xl mb-2">
          ₦{parseFloat(amount).toLocaleString()} sent
        </h1>
        <p className="text-charcoal/60 text-sm mb-8">
          to {recipient.name} ({recipient.accountNumber})
        </p>
        <button
          onClick={() => router.push("/profile")}
          className="rounded-full bg-ink text-paper text-sm font-medium px-6 py-3 hover:bg-teal transition-colors"
        >
          Done
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-charcoal">
      <div className="mx-auto max-w-md px-5 pt-6 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-display font-bold text-xl">Transfer funds</h1>
        </div>

        <form onSubmit={handleSend}>
          <label className="block font-body text-sm font-medium mb-1.5">
            Recipient account number or UID
          </label>
          <div className="flex items-center rounded-2xl bg-paper px-4 py-3 mb-3">
            <Search size={16} className="text-charcoal/40 mr-2" />
            <input
              type="text"
              inputMode="numeric"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="e.g. 8012345601"
              className="flex-1 bg-transparent outline-none text-sm font-mono placeholder:text-charcoal/40"
            />
          </div>

          {/* auto-populated recipient — appears the moment the number matches */}
          {accountNumber && (
            <div className="mb-6">
              {recipient ? (
                <div className="flex items-center gap-3 rounded-2xl bg-teal/10 p-3.5">
                  <div className="w-10 h-10 rounded-full bg-teal/15 flex items-center justify-center font-display font-bold text-teal flex-shrink-0">
                    {recipient.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm">{recipient.name}</p>
                    <p className="text-[11px] text-charcoal/50">{recipient.market}</p>
                  </div>
                </div>
              ) : (
                <p className="text-clay text-xs">
                  No Waka-Waka account found with that number.
                </p>
              )}
            </div>
          )}

          <label className="block font-body text-sm font-medium mb-1.5">
            Amount
          </label>
          <div className="flex items-center rounded-2xl bg-paper px-4 py-3 mb-8">
            <span className="text-charcoal/50 mr-1">₦</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent outline-none text-sm font-mono font-semibold placeholder:text-charcoal/40"
            />
          </div>

          <button
            type="submit"
            disabled={!recipient || !amount}
            className="w-full rounded-full bg-ink text-paper text-sm font-body font-medium py-3.5 hover:bg-teal transition-colors disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}