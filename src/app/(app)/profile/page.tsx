"use client";

import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  UserCircle,
  Bell,
  Palette,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Wifi,
} from "lucide-react";
import { mockCustomer as mockProfile } from "@/lib/mockUser";

const menuGroups = [
  {
    title: "Account",
    items: [
      { label: "Personal details", icon: UserCircle, href: "/profile/details" },
      { label: "Notifications", icon: Bell, href: "/profile/notifications" },
    ],
  },
  {
    title: "Preferences",
    items: [{ label: "Appearance", icon: Palette, href: "/profile/appearance" }],
  },
  {
    title: "Support",
    items: [
      { label: "Help & Support", icon: HelpCircle, href: "/support" },
      { label: "Terms & Privacy", icon: FileText, href: "/legal" },
    ],
  },
];

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-white text-charcoal pb-28">
      <div className="mx-auto max-w-md px-5 pt-6">
        {/* ===== header ===== */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center font-display font-bold text-2xl text-teal flex-shrink-0">
            {mockProfile.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="font-display font-bold text-xl">{mockProfile.fullName}</h1>
            <p className="text-charcoal/50 text-sm">{mockProfile.phone}</p>
          </div>
        </div>

        {/* ===== verification banner ===== */}
        {!mockProfile.isVerified ? (
          <Link
            href="/profile/verify-identity"
            className="flex items-center gap-3 rounded-2xl bg-clay/10 p-4 mb-4"
          >
            <ShieldAlert size={20} className="text-clay flex-shrink-0" />
            <div className="flex-1">
              <p className="font-body font-semibold text-sm text-charcoal">
                Complete your verification
              </p>
              <p className="text-charcoal/50 text-xs">
                Required before funding your wallet
              </p>
            </div>
            <ChevronRight size={16} className="text-charcoal/30" />
          </Link>
        ) : (
          <div className="flex items-center gap-2 rounded-2xl bg-teal/10 p-3.5 mb-4">
            <ShieldCheck size={18} className="text-teal" />
            <p className="font-body font-medium text-sm text-teal">Verified account</p>
          </div>
        )}

        {/* ===== wallet — debit card in a holder ===== */}
        <div className="rounded-3xl bg-paper p-3 mb-8">
          <div className="rounded-2xl bg-ink text-paper p-5 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <span className="font-display font-bold text-sm tracking-wide">
                WAKA-WAKA
              </span>
              <Wifi size={18} className="text-mint rotate-90" />
            </div>

            <p className="font-mono text-xs text-mint mb-1">BALANCE</p>
            <p className="font-display font-bold text-3xl mb-4">
              ₦{mockProfile.walletBalance.toLocaleString()}
            </p>

            <p className="font-mono text-sm tracking-widest text-paper/70 mb-4">
              •••• •••• •••• {mockProfile.accountNumber.slice(-4)}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] text-paper/40 mb-0.5">
                  CARDHOLDER
                </p>
                <p className="text-xs font-medium">{mockProfile.fullName.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[9px] text-paper/40 mb-0.5">
                  ACCOUNT NO.
                </p>
                <p className="text-xs font-mono">{mockProfile.accountNumber}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-3">
            <Link
              href="/wallet/add"
              className="flex-1 text-center rounded-full bg-ink text-paper text-sm font-medium py-3 hover:bg-teal transition-colors"
            >
              Add funds
            </Link>
            <Link
              href="/wallet/transfer"
              className="flex-1 text-center rounded-full border border-ink/15 text-ink text-sm font-medium py-3 hover:border-teal hover:text-teal transition-colors"
            >
              Transfer funds
            </Link>
          </div>
        </div>

        {/* ===== menu groups ===== */}
        {menuGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <p className="font-mono text-xs text-charcoal/40 mb-2 px-1">
              {group.title.toUpperCase()}
            </p>
            <div className="rounded-2xl bg-paper overflow-hidden">
              {group.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3.5 ${
                      i !== group.items.length - 1 ? "border-b border-ink/5" : ""
                    }`}
                  >
                    <Icon size={17} className="text-charcoal/60" />
                    <span className="flex-1 text-sm font-body">{item.label}</span>
                    <ChevronRight size={15} className="text-charcoal/30" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <button className="flex items-center gap-2 text-clay text-sm font-medium px-1">
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </main>
  );
}