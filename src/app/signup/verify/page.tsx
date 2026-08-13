"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageSquareText } from "lucide-react";

export default function VerifyPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...code];
    next[index] = value.slice(-1);
    setCode(next);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // supports pasting a full code (e.g. from the iOS/Android
  // "code above keyboard" suggestion, which pastes all 6 digits at once)
  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = pasted.split("");
    while (next.length < 6) next.push("");
    setCode(next);
    const lastFilled = Math.min(pasted.length, 6) - 1;
    inputs.current[lastFilled >= 0 ? lastFilled : 0]?.focus();
  };

  // auto-verify the moment all 6 digits are filled — no button needed
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      const timeout = setTimeout(() => {
        // TODO: confirm OTP against Supabase auth, then move to location permission step
        router.push("/signup/location");
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [code, router]);

  return (
    <main className="min-h-screen bg-white text-charcoal flex flex-col items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-sm text-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-5 sm:mb-6">
          <MessageSquareText size={22} className="text-teal" />
        </div>

        <h1 className="font-display font-bold text-xl sm:text-2xl mb-2">
          Check your phone
        </h1>
        <p className="text-charcoal/60 text-sm mb-7 sm:mb-8 px-2">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-charcoal">
            0801 234 5678
          </span>
          . Enter it below to confirm your number.
        </p>

        <div className="flex justify-center gap-2 sm:gap-2.5 mb-6">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              className="w-10 h-12 sm:w-11 sm:h-13 aspect-square rounded-xl bg-paper text-center text-lg font-mono font-semibold outline-none focus:ring-2 focus:ring-teal/40"
            />
          ))}
        </div>

        <p className="text-sm text-charcoal/50">
          Didn&rsquo;t get a code?{" "}
          <button className="text-teal font-medium">Resend</button>
        </p>
      </div>
    </main>
  );
}