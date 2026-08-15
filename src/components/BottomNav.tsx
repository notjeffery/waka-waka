"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, MessageCircle, Heart, User } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home, enabled: true },
  { href: "/errands", label: "Chat", icon: MessageCircle, enabled: true },
  { href: "/saved", label: "Saved", icon: Heart, enabled: true },
  { href: "/profile", label: "Profile", icon: User, enabled: true },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md rounded-full shadow-lg shadow-black/10 border border-black/5">
      <div className="flex items-center gap-1 py-1.5 px-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const showAttentionDot = item.href === "/profile";

          const content = (
            <span
              className={`relative z-10 flex items-center gap-1.5 ${
                isActive ? "px-3.5 py-2 text-teal" : "p-2.5 text-charcoal/40"
              }`}
            >
              <Icon size={16} />
              {isActive && (
                <span className="font-mono text-[9px] font-medium">
                  {item.label}
                </span>
              )}
              {showAttentionDot && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-clay" />
              )}
            </span>
          );

          const wrapperClass = "relative inline-block";

          // the sliding pill: a single persistent layoutId shared across
          // whichever tab is currently active — framer-motion animates its
          // position/size automatically whenever "isActive" moves to a
          // different tab, giving the iOS-style morph instead of a hard cut
          const pill = isActive && (
            <motion.div
              layoutId="nav-active-pill"
              className="absolute inset-0 bg-mint/15 rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          );

          if (!item.enabled) {
            return (
              <span key={item.href} className={wrapperClass} title="Coming soon">
                {pill}
                {content}
              </span>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={wrapperClass}>
              {pill}
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}