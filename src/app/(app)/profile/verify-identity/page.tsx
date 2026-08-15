"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, ShieldCheck } from "lucide-react";

const ID_TYPES = ["National ID (NIN)", "Driver's License", "International Passport", "Voter's Card"];

export default function VerifyIdentityPage() {
  const router = useRouter();
  const [idType, setIdType] = useState(ID_TYPES[0]);
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: upload frontFile/backFile to Supabase storage, create a row in
    // an `identity_verifications` table with status 'pending', and route
    // into a manual or third-party (e.g. Smile Identity, Youverify)
    // verification pipeline — Nigerian ID verification typically needs a
    // provider integration here, not just file storage
    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-white text-charcoal">
      <div className="mx-auto max-w-md px-5 pt-6 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-display font-bold text-xl">Verify identity</h1>
        </div>

        <div className="flex items-start gap-2 rounded-2xl bg-teal/10 p-3.5 mb-6">
          <ShieldCheck size={16} className="text-teal mt-0.5 flex-shrink-0" />
          <p className="text-xs text-charcoal/70 leading-relaxed">
            Required before funding your wallet above a certain amount —
            this protects your money and keeps the platform safe for everyone.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-body text-sm font-medium mb-1.5">
              ID type
            </label>
            <div className="flex flex-wrap gap-2">
              {ID_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setIdType(type)}
                  className={`rounded-full text-xs font-medium px-3.5 py-2 transition-colors ${
                    idType === type ? "bg-teal/15 text-teal" : "bg-paper text-charcoal/50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-body text-sm font-medium mb-1.5">
              Front of ID
            </label>
            <label className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/20 bg-paper py-8 cursor-pointer">
              <Upload size={20} className="text-charcoal/40" />
              <span className="text-xs text-charcoal/50">
                {frontFile ? frontFile.name : "Tap to upload"}
              </span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => setFrontFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          <div>
            <label className="block font-body text-sm font-medium mb-1.5">
              Back of ID
            </label>
            <label className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/20 bg-paper py-8 cursor-pointer">
              <Upload size={20} className="text-charcoal/40" />
              <span className="text-xs text-charcoal/50">
                {backFile ? backFile.name : "Tap to upload"}
              </span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => setBackFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={!frontFile || !backFile}
            className="w-full rounded-full bg-ink text-paper text-sm font-body font-medium py-3.5 hover:bg-teal transition-colors disabled:opacity-40 mt-2"
          >
            Submit for verification
          </button>
        </form>
      </div>
    </main>
  );
}