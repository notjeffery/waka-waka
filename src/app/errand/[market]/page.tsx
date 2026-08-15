"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  MapPin,
  CheckCircle2,
  Plus,
  X,
  AlertTriangle,
  Users,
  ArrowLeftRight,
  Heart,
} from "lucide-react";

type ItemMode = "quantity" | "budget";
type Item = { id: string; name: string; mode: ItemMode; value: string };
type Offer = {
  id: string;
  name: string;
  rating: number;
  categoryTrips: number;
  market: string;
  distanceKm: number;
  proposedFee: number;
  matchesBudget: boolean;
};

// ── pricing constants — placeholders to tune once real errand data exists ──
const FLAT_BASE_FEE = 800;
const PCT_BASE_FEE = 500;
const RATE_PER_KM = 100;
const RATE_PER_MIN_SINGLE_VENDOR = 15;
const RATE_PER_MIN_MULTI_VENDOR = 30;
const ESTIMATED_MINUTES_SINGLE = 25;
const ESTIMATED_MINUTES_MULTI = 55;
const GOODS_VALUE_HANDLING_PCT = 0.03; // 3%, well below GIG's shipment-value model
const MULTI_VENDOR_FLAT_BONUS = 300;
const MOCK_DISTANCE_KM = 2.4; // TODO: replace with real distance once location data flows in

// mock shopper offers — replace with a live query against errand_offers
const mockOffers: Offer[] = [
  { id: "1", name: "Chidi O.", rating: 4.8, categoryTrips: 42, market: "Mile 12 Market", distanceKm: 1.2, proposedFee: 1500, matchesBudget: true },
  { id: "2", name: "Ngozi A.", rating: 4.9, categoryTrips: 67, market: "Mile 12 Market", distanceKm: 2.4, proposedFee: 1800, matchesBudget: false },
  { id: "3", name: "Tunde F.", rating: 4.6, categoryTrips: 19, market: "Ketu Market", distanceKm: 4.1, proposedFee: 1500, matchesBudget: true },
];

const HELPER_EXAMPLES: Record<string, string> = {
  "food-market": "₦5,000 worth of yam",
  fabric: "₦8,000 worth of ankara fabric",
  electronics: "₦15,000 worth of phone accessories",
  fashion: "₦10,000 worth of shoes",
  "home-kitchen": "₦6,000 worth of kitchenware",
};
const DEFAULT_HELPER_EXAMPLE = "₦5,000 worth of items";

type Step = "items" | "fee" | "waiting" | "offers";

export default function ErrandMarketPage() {
  const params = useParams();
  const router = useRouter();
  const marketSlug = (params?.market as string) ?? "market";
  const marketLabel = marketSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const isFoodMarket = marketSlug === "food-market";
  const helperExample = HELPER_EXAMPLES[marketSlug] ?? DEFAULT_HELPER_EXAMPLE;

  const [step, setStep] = useState<Step>("items");
  const [items, setItems] = useState<Item[]>([
    { id: crypto.randomUUID(), name: "", mode: "quantity", value: "" },
  ]);
  const [goodsWorth, setGoodsWorth] = useState("");
  const [multiVendor, setMultiVendor] = useState<boolean | null>(null);
  const [suggestedFee, setSuggestedFee] = useState(0);
  const [editedFee, setEditedFee] = useState("");
  const [shoppersNotified, setShoppersNotified] = useState(0);
  const [shoppersConsidering, setShoppersConsidering] = useState(0);
  const [savedShopperIds, setSavedShopperIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("waka-saved-shoppers");
      if (saved) setSavedShopperIds(JSON.parse(saved));
    } catch {
      // ignore corrupted storage
    }
  }, []);

  const toggleSavedShopper = (id: string) => {
    setSavedShopperIds((prev) => {
      const next = prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id];
      localStorage.setItem("waka-saved-shoppers", JSON.stringify(next));
      return next;
    });
  };

  // reactive — updates live as items are added/removed, so the goods-worth
  // field appears/disappears without needing a step transition
  const isFlatTier = isFoodMarket || items.filter((i) => i.name.trim()).length === 1;

  const addItem = () =>
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", mode: "quantity", value: "" },
    ]);
  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));
  const updateItem = (id: string, field: "name" | "value", value: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  const toggleItemMode = (id: string) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, mode: i.mode === "quantity" ? "budget" : "quantity", value: "" }
          : i
      )
    );

  const calculateFee = (e: React.FormEvent) => {
    e.preventDefault();
    let fee: number;

    if (isFlatTier) {
      fee =
        FLAT_BASE_FEE +
        MOCK_DISTANCE_KM * RATE_PER_KM +
        (multiVendor ? MULTI_VENDOR_FLAT_BONUS : 0);
    } else {
      const worth = parseFloat(goodsWorth) || 0;
      const minutes = multiVendor ? ESTIMATED_MINUTES_MULTI : ESTIMATED_MINUTES_SINGLE;
      const minRate = multiVendor ? RATE_PER_MIN_MULTI_VENDOR : RATE_PER_MIN_SINGLE_VENDOR;
      fee =
        PCT_BASE_FEE +
        MOCK_DISTANCE_KM * RATE_PER_KM +
        minutes * minRate +
        worth * GOODS_VALUE_HANDLING_PCT;
    }

    fee = Math.round(fee / 50) * 50; // round to nearest ₦50
    setSuggestedFee(fee);
    setEditedFee(String(fee));
    setStep("fee");
  };

  const postErrand = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: create errand row (target_fee = editedFee, category, items, goods_worth,
    // is_multi_vendor) then notify nearby shoppers in this category/market
    setStep("waiting");
    setShoppersNotified(0);
    setShoppersConsidering(0);
    const notifyTimer = setInterval(() => {
      setShoppersNotified((n) => (n < 8 ? n + 2 : n));
    }, 400);
    setTimeout(() => clearInterval(notifyTimer), 2000);
    setTimeout(() => setShoppersConsidering(3), 1800);
    setTimeout(() => setStep("offers"), 3200);
  };

  const fee = parseFloat(editedFee) || 0;
  const fairnessRatio = suggestedFee > 0 ? fee / suggestedFee : 1;
  const fairness = fairnessRatio < 0.85 ? "low" : fairnessRatio > 1.2 ? "generous" : "fair";

  return (
    <main className="min-h-screen bg-white text-charcoal pb-10">
      <div className="mx-auto max-w-md px-5 pt-6">
        {/* header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => (step === "items" ? router.back() : setStep("items"))}
            className="p-1 -ml-1"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-display font-bold text-xl">{marketLabel}</h1>
        </div>

        {/* ===== STEP 1: items + goods worth + vendor toggle, merged ===== */}
        {step === "items" && (
          <form onSubmit={calculateFee}>
            <p className="text-charcoal/60 text-sm mb-5">
              What do you need from {marketLabel}?
            </p>

            <div className="space-y-3 mb-4">
              {items.map((item, i) => (
                <div key={item.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, "name", e.target.value)}
                    placeholder={`Item ${i + 1}`}
                    className="flex-1 rounded-2xl bg-paper px-4 py-3 text-sm outline-none placeholder:text-charcoal/40 focus:ring-2 focus:ring-teal/40"
                  />

                  <div className="flex items-center w-28 rounded-2xl bg-paper px-3 py-3">
                    {item.mode === "budget" && (
                      <span className="text-charcoal/50 text-sm mr-1">₦</span>
                    )}
                    <input
                      type={item.mode === "budget" ? "number" : "text"}
                      value={item.value}
                      onChange={(e) => updateItem(item.id, "value", e.target.value)}
                      placeholder={item.mode === "quantity" ? "Qty" : "Amount"}
                      className="w-full bg-transparent text-sm outline-none placeholder:text-charcoal/40"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleItemMode(item.id)}
                    title={
                      item.mode === "quantity"
                        ? "No exact quantity? Switch to amount"
                        : "Switch back to quantity"
                    }
                    className="text-charcoal/30 hover:text-teal p-1 flex-shrink-0"
                  >
                    <ArrowLeftRight size={15} />
                  </button>

                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-charcoal/30 p-1 flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-1.5 text-teal text-sm font-medium mb-2"
            >
              <Plus size={16} />
              Add another item
            </button>
            <p className="text-charcoal/40 text-xs mb-8">
              Not sure of the exact quantity? Tap{" "}
              <ArrowLeftRight size={11} className="inline -mt-0.5" /> to enter a
              budget for that item instead — e.g. &ldquo;{helperExample}.&rdquo;
            </p>

            {!isFlatTier && (
              <div className="mb-6">
                <label className="block font-body text-sm font-medium mb-1.5">
                  Estimated worth of these items
                </label>
                <div className="flex items-center rounded-2xl bg-paper px-4 py-3">
                  <span className="text-charcoal/50 mr-1">₦</span>
                  <input
                    type="number"
                    value={goodsWorth}
                    onChange={(e) => setGoodsWorth(e.target.value)}
                    placeholder="e.g. 25,000"
                    required
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-charcoal/40"
                  />
                </div>
              </div>
            )}

            <label className="block font-body text-sm font-medium mb-2">
              Will this all come from one vendor?
            </label>
            <div className="grid grid-cols-2 gap-3 mb-8">
              <button
                type="button"
                onClick={() => setMultiVendor(false)}
                className={`rounded-2xl border py-3.5 text-sm font-medium transition-colors ${
                  multiVendor === false
                    ? "border-teal bg-teal/10 text-teal"
                    : "border-ink/10 text-charcoal/60"
                }`}
              >
                One vendor
              </button>
              <button
                type="button"
                onClick={() => setMultiVendor(true)}
                className={`rounded-2xl border py-3.5 text-sm font-medium transition-colors ${
                  multiVendor === true
                    ? "border-teal bg-teal/10 text-teal"
                    : "border-ink/10 text-charcoal/60"
                }`}
              >
                Shop around for best price
              </button>
            </div>

            <button
              type="submit"
              disabled={multiVendor === null}
              className="w-full rounded-full bg-ink text-paper text-sm font-body font-medium py-3.5 hover:bg-teal transition-colors disabled:opacity-40"
            >
              Get suggested fee
            </button>
          </form>
        )}

        {/* ===== STEP 2: suggested fee, editable ===== */}
        {step === "fee" && (
          <form onSubmit={postErrand}>
            <div className="rounded-2xl bg-paper p-5 mb-4 text-center">
              <p className="font-mono text-xs text-charcoal/50 mb-1">SUGGESTED FEE</p>
              <p className="font-display font-bold text-3xl text-ink">
                ₦{suggestedFee.toLocaleString()}
              </p>
            </div>

            <label className="block font-body text-sm font-medium mb-1.5">
              Your offer
            </label>
            <div className="flex items-center rounded-2xl bg-paper px-4 py-3 mb-3">
              <span className="text-charcoal/50 mr-1">₦</span>
              <input
                type="number"
                value={editedFee}
                onChange={(e) => setEditedFee(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm font-mono font-semibold"
              />
            </div>

            {fairness === "low" && (
              <p className="flex items-start gap-1.5 text-xs text-clay mb-6">
                <AlertTriangle size={13} className="mt-0.5 flex-shrink-0" />
                This is below the suggested fee — shoppers may be slower to
                respond, or you may need to wait for a counter-offer.
              </p>
            )}
            {fairness === "fair" && (
              <p className="flex items-start gap-1.5 text-xs text-teal mb-6">
                <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" />
                Fair price — shoppers nearby are likely to respond quickly.
              </p>
            )}
            {fairness === "generous" && (
              <p className="flex items-start gap-1.5 text-xs text-teal mb-6">
                <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" />
                Generous offer — expect fast responses.
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-ink text-paper text-sm font-body font-medium py-3.5 hover:bg-teal transition-colors"
            >
              Post errand
            </button>
          </form>
        )}

        {/* ===== STEP 3: waiting / notifying shoppers ===== */}
        {step === "waiting" && (
          <div className="flex flex-col items-center text-center pt-10">
            <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mb-6">
              <Users size={24} className="text-teal" />
            </div>
            <h2 className="font-display font-bold text-xl mb-2">
              Notifying shoppers near you
            </h2>
            <p className="text-charcoal/60 text-sm mb-6">
              Your errand at ₦{fee.toLocaleString()} is going out to shoppers
              in {marketLabel}.
            </p>

            <div className="w-full rounded-2xl bg-paper p-4 flex items-center justify-around">
              <div>
                <p className="font-display font-bold text-2xl text-ink">
                  {shoppersNotified}
                </p>
                <p className="font-mono text-[10px] text-charcoal/50">NOTIFIED</p>
              </div>
              <div className="w-px h-8 bg-ink/10" />
              <div>
                <p className="font-display font-bold text-2xl text-teal">
                  {shoppersConsidering}
                </p>
                <p className="font-mono text-[10px] text-charcoal/50">CONSIDERING</p>
              </div>
            </div>
          </div>
        )}

        {/* ===== STEP 4: offers list ===== */}
        {step === "offers" && (
          <>
            <div className="flex items-center justify-between mb-1">
              <p className="text-charcoal/60 text-sm">
                Your offer: <span className="font-medium text-ink">₦{fee.toLocaleString()}</span>
              </p>
              <button onClick={() => setStep("fee")} className="text-teal text-xs font-medium">
                Edit
              </button>
            </div>
            <p className="text-charcoal/40 text-xs mb-6">
              {mockOffers.length} shoppers responded
            </p>

            <div className="space-y-3">
              {mockOffers.map((offer) => {
                const isSaved = savedShopperIds.includes(offer.id);
                return (
                  <div key={offer.id} className="rounded-2xl bg-paper p-4 flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full bg-teal/10 flex items-center justify-center font-display font-bold text-teal flex-shrink-0">
                      {offer.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-body font-semibold text-sm">{offer.name}</p>
                        <div className="flex items-center gap-2">
                          {offer.matchesBudget && (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-teal">
                              <CheckCircle2 size={12} />
                              Matches offer
                            </span>
                          )}
                          <button
                            onClick={() => toggleSavedShopper(offer.id)}
                            className={isSaved ? "text-clay" : "text-charcoal/30"}
                            title={isSaved ? "Remove from saved shoppers" : "Save this shopper"}
                          >
                            <Heart size={15} className={isSaved ? "fill-clay" : ""} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-charcoal/50">
                        <span className="flex items-center gap-1">
                          <Star size={11} className="fill-mint text-mint" />
                          {offer.rating}
                        </span>
                        <span>{offer.categoryTrips} {marketLabel} trips</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-charcoal/50">
                        <MapPin size={11} />
                        {offer.market} · {offer.distanceKm}km away
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-mono font-semibold text-sm">
                          ₦{offer.proposedFee.toLocaleString()}
                        </span>
                        <Link
                          href={`/chat/${offer.id}`}
                          className="rounded-full bg-ink text-paper text-xs font-medium px-4 py-2 hover:bg-teal transition-colors"
                        >
                          Select
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}