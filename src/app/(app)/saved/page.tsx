"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  X,
  Check,
  Star,
  CheckCircle2,
  MessageCircle,
  Megaphone,
  ShoppingBag,
} from "lucide-react";
import { shopperDirectory } from "@/lib/mockShoppers";

type WishlistItem = {
  id: string;
  name: string;
  category: string;
  done: boolean;
};

const WISHLIST_KEY = "waka-wishlist";
const SAVED_SHOPPERS_KEY = "waka-saved-shoppers";

const CATEGORIES = ["Food Market", "Fabric", "Electronics", "Fashion", "Home & Kitchen"];

export default function SavedPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [savedShopperIds, setSavedShopperIds] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const [newCategory, setNewCategory] = useState(CATEGORIES[0]);

  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(WISHLIST_KEY);
      if (savedItems) setItems(JSON.parse(savedItems));
      const savedShoppers = localStorage.getItem(SAVED_SHOPPERS_KEY);
      if (savedShoppers) setSavedShopperIds(JSON.parse(savedShoppers));
    } catch {
      // ignore corrupted storage
    }
  }, []);

  const persist = (next: WishlistItem[]) => {
    setItems(next);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    persist([
      ...items,
      { id: crypto.randomUUID(), name: newItem.trim(), category: newCategory, done: false },
    ]);
    setNewItem("");
  };

  const toggleDone = (id: string) =>
    persist(items.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));

  const removeItem = (id: string) =>
    persist(items.filter((i) => i.id !== id));

  const categorySlug = (cat: string) =>
    cat.toLowerCase().replace(/\s+&?\s*/g, "-").replace(/-$/, "");

  const savedShoppers = savedShopperIds
    .map((id) => shopperDirectory[id])
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-white text-charcoal pb-28">
      <div className="mx-auto max-w-md px-5 pt-6">
        <h1 className="font-display font-bold text-2xl mb-1">Saved</h1>
        <p className="text-charcoal/50 text-sm mb-8">
          Plan ahead, keep favorites close, and never forget what you meant
          to buy.
        </p>

        {/* ===== Your list — weekend wishlist ===== */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-lg">Your list</h2>
          <span className="font-mono text-[10px] text-charcoal/40">
            {items.filter((i) => !i.done).length} pending
          </span>
        </div>

        <form onSubmit={addItem} className="flex items-center gap-2 mb-3">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add something for later..."
            className="flex-1 rounded-2xl bg-paper px-4 py-3 text-sm outline-none placeholder:text-charcoal/40 focus:ring-2 focus:ring-teal/40"
          />
          <button
            type="submit"
            className="w-11 h-11 rounded-full bg-ink text-paper flex items-center justify-center flex-shrink-0 hover:bg-teal transition-colors"
          >
            <Plus size={18} />
          </button>
        </form>

        <div className="flex flex-wrap gap-2 mb-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setNewCategory(cat)}
              className={`rounded-full text-xs font-medium px-3 py-1.5 transition-colors ${
                newCategory === cat
                  ? "bg-teal/15 text-teal"
                  : "bg-paper text-charcoal/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-2 mb-10">
          {items.length === 0 && (
            <p className="text-charcoal/40 text-sm italic">
              Nothing saved yet — add items as you think of them during the
              week, then post them as an errand when you're ready.
            </p>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-2xl bg-paper p-3.5"
            >
              <button
                onClick={() => toggleDone(item.id)}
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border ${
                  item.done
                    ? "bg-teal border-teal text-paper"
                    : "border-ink/20 text-transparent"
                }`}
              >
                <Check size={14} />
              </button>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-body ${
                    item.done ? "line-through text-charcoal/40" : "text-charcoal"
                  }`}
                >
                  {item.name}
                </p>
                <p className="text-[11px] text-charcoal/40">{item.category}</p>
              </div>

              {!item.done && (
                <Link
                  href={`/errand/${categorySlug(item.category)}`}
                  className="rounded-full bg-ink text-paper text-[11px] font-medium px-3 py-1.5 flex-shrink-0 hover:bg-teal transition-colors"
                >
                  Post errand
                </Link>
              )}

              <button
                onClick={() => removeItem(item.id)}
                className="text-charcoal/30 p-1 flex-shrink-0"
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* ===== Saved shoppers ===== */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-lg">Saved shoppers</h2>
        </div>

        {savedShoppers.length === 0 ? (
          <p className="text-charcoal/40 text-sm italic mb-10">
            Favorite a shopper after an errand to book them again quickly.
          </p>
        ) : (
          <div className="space-y-2 mb-10">
            {savedShoppers.map((shopper) => (
              <div
                key={shopper.id}
                className="flex items-center gap-3 rounded-2xl bg-paper p-3.5"
              >
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center font-display font-bold text-teal flex-shrink-0">
                  {shopper.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-body font-semibold text-sm">{shopper.name}</p>
                    {shopper.verified && <CheckCircle2 size={12} className="text-teal" />}
                  </div>
                  <p className="flex items-center gap-1 text-[11px] text-charcoal/50">
                    <Star size={10} className="fill-mint text-mint" />
                    {shopper.rating} · {shopper.market}
                  </p>
                </div>
                <Link
                  href={`/chat/${shopper.id}`}
                  className="w-9 h-9 rounded-full bg-ink text-paper flex items-center justify-center flex-shrink-0 hover:bg-teal transition-colors"
                >
                  <MessageCircle size={15} />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* ===== From vendors — future ad feature ===== */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-lg">From vendors</h2>
        </div>
        <div className="rounded-2xl border border-dashed border-ink/15 p-6 text-center">
          <div className="w-11 h-11 rounded-2xl bg-paper flex items-center justify-center mx-auto mb-3">
            <Megaphone size={18} className="text-charcoal/40" />
          </div>
          <p className="text-charcoal/50 text-sm leading-relaxed">
            When vendors start advertising on Waka-Waka, items you save from
            their posts will show up here.
          </p>
        </div>
      </div>
    </main>
  );
}