"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowLeft, Sun, Moon, Laptop, Check } from "lucide-react";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
];

export default function AppearancePage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  // avoids a hydration mismatch — theme is only known client-side
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="min-h-screen bg-white text-charcoal">
      <div className="mx-auto max-w-md px-5 pt-6 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-display font-bold text-xl">Appearance</h1>
        </div>

        <p className="text-charcoal/50 text-sm mb-6 leading-relaxed">
          Choose how Waka-Waka looks on this device. &ldquo;System&rdquo;
          matches your phone or browser&rsquo;s own setting automatically.
        </p>

        <div className="space-y-2">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = mounted && theme === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={`w-full flex items-center gap-3 rounded-2xl p-4 transition-colors ${
                  isSelected ? "bg-teal/10" : "bg-paper"
                }`}
              >
                <Icon size={18} className={isSelected ? "text-teal" : "text-charcoal/60"} />
                <span
                  className={`flex-1 text-left text-sm font-body font-medium ${
                    isSelected ? "text-teal" : "text-charcoal"
                  }`}
                >
                  {opt.label}
                </span>
                {isSelected && <Check size={16} className="text-teal" />}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}