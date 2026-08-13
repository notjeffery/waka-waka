"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Info } from "lucide-react";

export default function CustomerSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up Supabase auth signup + trigger OTP send here
    router.push("/signup/verify");
  };

  return (
    <main className="min-h-screen bg-white text-charcoal">
      <div className="mx-auto max-w-md px-6 pt-10 pb-16">
        <p className="font-mono text-xs text-teal mb-2">CUSTOMER ACCOUNT</p>
        <h1 className="font-display font-bold text-3xl mb-2">
          Create your account
        </h1>
        <p className="text-charcoal/60 text-sm mb-8">
          Already have one?{" "}
          <a href="/login" className="text-teal font-medium">
            Log in
          </a>
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-body text-sm font-medium mb-1.5">
              Full name
            </label>
            <input
              type="text"
              placeholder="As it appears on your card or bank account"
              className="w-full rounded-2xl bg-paper px-4 py-3 text-sm outline-none placeholder:text-charcoal/40 focus:ring-2 focus:ring-teal/40"
            />
            <p className="flex items-start gap-1.5 mt-2 text-xs text-charcoal/50">
              <Info size={13} className="mt-0.5 flex-shrink-0" />
              This should match the name on whatever card or account you'll
              use to fund your wallet — it helps us verify payments faster.
            </p>
          </div>

          <div>
            <label className="block font-body text-sm font-medium mb-1.5">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl bg-paper px-4 py-3 text-sm outline-none placeholder:text-charcoal/40 focus:ring-2 focus:ring-teal/40"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-medium mb-1.5">
              Phone number
            </label>
            <input
              type="tel"
              placeholder="080X XXX XXXX"
              className="w-full rounded-2xl bg-paper px-4 py-3 text-sm outline-none placeholder:text-charcoal/40 focus:ring-2 focus:ring-teal/40"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-medium mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                className="w-full rounded-2xl bg-paper px-4 py-3 pr-11 text-sm outline-none placeholder:text-charcoal/40 focus:ring-2 focus:ring-teal/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-transparent text-ink text-sm font-body font-medium px-8 py-2.5 mt-2
                         transition-all duration-300 ease-out
                         hover:bg-mint hover:text-ink hover:border-mint hover:shadow-lg hover:shadow-mint/20
                         active:scale-95 active:duration-150"
            >
              Create account
            </button>
          </div>

          <p className="text-center text-xs text-charcoal/40 leading-relaxed">
            By continuing, you agree to Waka-Waka's Terms of Service and
            Privacy Policy.
          </p>
        </form>
      </div>
    </main>
  );
}