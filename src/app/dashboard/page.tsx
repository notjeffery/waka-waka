"use client";

import Link from "next/link";
import {
  ChevronDown,
  Bell,
  Settings,
  Search,
  ScanLine,
  Star,
  Home,
  MessageCircle,
  Heart,
  User,
  Carrot,
  Scissors,
  Plug,
  Shirt,
  UtensilsCrossed,
  Grid3x3,
} from "lucide-react";

const marketCategories = [
  { label: "Food Market", icon: Carrot, bg: "bg-clay/10", iconColor: "text-clay" },
  { label: "Fabric", icon: Scissors, bg: "bg-teal/10", iconColor: "text-teal" },
  { label: "Electronics", icon: Plug, bg: "bg-ink/10", iconColor: "text-ink" },
  { label: "Fashion", icon: Shirt, bg: "bg-clay/10", iconColor: "text-clay" },
  { label: "Home & Kitchen", icon: UtensilsCrossed, bg: "bg-teal/10", iconColor: "text-teal" },
  { label: "More", icon: Grid3x3, bg: "bg-ink/10", iconColor: "text-ink" },
];

const topShoppers = [
  {
    name: "Chidi O.",
    market: "Mile 12 Market",
    rating: 4.8,
    responseTime: "~5 mins",
  },
  {
    name: "Ngozi A.",
    market: "Balogun Market",
    rating: 4.9,
    responseTime: "~8 mins",
  },
  {
    name: "Tunde F.",
    market: "Computer Village",
    rating: 4.7,
    responseTime: "~10 mins",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white text-charcoal pb-32">
      <div className="mx-auto max-w-md px-5 pt-6">
        {/* ===== top bar ===== */}
        <div className="flex items-center justify-between mb-6">
          <button className="flex items-center gap-1.5">
            <div className="text-left">
              <p className="font-mono text-xs text-charcoal/50">Shopping in</p>
              <p className="font-body font-semibold text-sm flex items-center gap-1">
                Lagos, Mile 12 area
                <ChevronDown size={16} className="text-charcoal/50" />
              </p>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-paper flex items-center justify-center">
              <Settings size={18} className="text-ink" />
            </button>
            <button className="w-10 h-10 rounded-full bg-paper flex items-center justify-center">
              <Bell size={18} className="text-ink" />
            </button>
          </div>
        </div>

        {/* ===== heading ===== */}
        <h1 className="font-display font-bold text-3xl leading-tight mb-6">
          Whatever you need,
          <br />
          <span className="text-teal">we&rsquo;ll go get it.</span>
        </h1>

        {/* ===== search ===== */}
        <div className="flex items-center gap-2 rounded-2xl bg-paper px-4 py-3 mb-8">
          <Search size={18} className="text-charcoal/40" />
          <input
            type="text"
            placeholder="Search markets, items, or shoppers..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-charcoal/40"
          />
          <ScanLine size={18} className="text-charcoal/40" />
        </div>

        {/* ===== market category grid ===== */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {marketCategories.map((cat) => {
            const Icon = cat.icon;
            const slug = cat.label.toLowerCase().replace(/\s+&?\s*/g, "-").replace(/-$/, "");
            return (
              <Link
                href={`/errand/${slug}`}
                key={cat.label}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center`}
                >
                  <Icon size={22} strokeWidth={1.75} className={cat.iconColor} />
                </div>
                <span className="font-body text-xs text-center leading-tight">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* ===== banner ===== */}
        <div className="rounded-2xl bg-ink text-paper p-5 mb-8 flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10 max-w-[65%]">
            <p className="font-mono text-xs text-mint mb-1">THIS WEEK</p>
            <p className="font-display font-semibold text-base leading-snug mb-3">
              Verified shoppers are already at Mile 12 Market
            </p>
            <button className="rounded-full bg-mint text-ink text-xs font-medium px-4 py-2">
              Post an errand
            </button>
          </div>
          <span className="absolute right-0 bottom-0 text-7xl opacity-20 translate-x-2 translate-y-2">
            🧺
          </span>
        </div>

        {/* ===== top-rated shoppers ===== */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg">
            Top-rated shoppers near you
          </h2>
          <button className="font-mono text-xs text-teal">See All</button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 -mx-5 px-5">
          {topShoppers.map((shopper) => (
            <div
              key={shopper.name}
              className="min-w-[160px] rounded-2xl bg-paper p-4 flex-shrink-0"
            >
              <div className="w-11 h-11 rounded-full bg-teal/10 flex items-center justify-center font-display font-bold text-teal mb-3">
                {shopper.name.charAt(0)}
              </div>
              <p className="font-body font-semibold text-sm mb-0.5">
                {shopper.name}
              </p>
              <p className="font-mono text-[11px] text-charcoal/50 mb-2">
                {shopper.market}
              </p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs">
                  <Star size={12} className="fill-mint text-mint" />
                  {shopper.rating}
                </span>
                <span className="font-mono text-[10px] text-charcoal/50">
                  {shopper.responseTime}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== floating bottom nav ===== */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md rounded-full shadow-lg shadow-black/10 border border-black/5">
        <div className="flex items-center gap-1 py-1.5 px-1.5">
          <button className="flex items-center gap-1.5 bg-mint/15 text-teal rounded-full px-3.5 py-2">
            <Home size={16} />
            <span className="font-mono text-[9px] font-medium">Home</span>
          </button>
          <button className="p-2.5 text-charcoal/40">
            <MessageCircle size={16} />
          </button>
          <button className="p-2.5 text-charcoal/40">
            <Heart size={16} />
          </button>
          <button className="p-2.5 text-charcoal/40 relative">
            <User size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-clay" />
          </button>
        </div>
      </nav>
    </main>
  );
}