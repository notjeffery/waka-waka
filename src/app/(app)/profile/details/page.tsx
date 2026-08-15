"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Mock — mirrors the `profiles` table shape; replace with a real
// Supabase read/update once auth is wired up
const initialDetails = {
  fullName: "Amara Chukwu",
  phone: "0801 234 5678",
  email: "amara.c@example.com",
};

export default function PersonalDetailsPage() {
  const router = useRouter();
  const [details, setDetails] = useState(initialDetails);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: write to `profiles` via Supabase once auth is wired up
    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-white text-charcoal">
      <div className="mx-auto max-w-md px-5 pt-6 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-display font-bold text-xl">Personal details</h1>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block font-body text-sm font-medium mb-1.5">
              Full name
            </label>
            <input
              type="text"
              value={details.fullName}
              onChange={(e) => setDetails({ ...details, fullName: e.target.value })}
              className="w-full rounded-2xl bg-paper px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal/40"
            />
            <p className="text-charcoal/40 text-xs mt-1.5">
              Should match the name on the card or account funding your wallet.
            </p>
          </div>

          <div>
            <label className="block font-body text-sm font-medium mb-1.5">
              Phone number
            </label>
            <input
              type="tel"
              value={details.phone}
              onChange={(e) => setDetails({ ...details, phone: e.target.value })}
              className="w-full rounded-2xl bg-paper px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal/40"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-medium mb-1.5">
              Email address
            </label>
            <input
              type="email"
              value={details.email}
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
              className="w-full rounded-2xl bg-paper px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal/40"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-ink text-paper text-sm font-body font-medium py-3.5 hover:bg-teal transition-colors mt-2"
          >
            Save changes
          </button>
        </form>
      </div>
    </main>
  );
}