"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function LegalPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-charcoal">
      <div className="mx-auto max-w-md px-5 pt-6 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-display font-bold text-xl">Terms &amp; Privacy</h1>
        </div>

        <div className="rounded-2xl bg-clay/10 p-4 mb-6">
          <p className="text-xs text-charcoal/70 leading-relaxed">
            This page is a placeholder. Real Terms of Service and Privacy
            Policy text should be drafted (or reviewed) by a lawyer before
            launch — especially given the escrow/payment handling and ID
            verification this app does. I&rsquo;m not a lawyer, so I haven&rsquo;t
            filled these sections with actual legal language.
          </p>
        </div>

        <div className="space-y-2">
          {["Terms of Service", "Privacy Policy"].map((doc) => (
            <button
              key={doc}
              className="w-full flex items-center justify-between gap-3 rounded-2xl bg-paper px-4 py-3.5"
            >
              <span className="text-sm font-body font-medium">{doc}</span>
              <ExternalLink size={15} className="text-charcoal/40" />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}