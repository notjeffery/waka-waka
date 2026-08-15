// Mock shopper directory — replace with a real Supabase query
// (shopper_profiles joined with profiles) once the backend is wired up.
// Centralized here so chat, errands, and saved pages all read the same data.

export type ShopperSummary = {
  id: string;
  name: string;
  rating: number;
  categoryTrips: number;
  market: string;
  verified: boolean;
  accountNumber: string; // unique in-platform transfer ID
};

export const shopperDirectory: Record<string, ShopperSummary> = {
  "1": { id: "1", name: "Chidi O.", rating: 4.8, categoryTrips: 42, market: "Mile 12 Market", verified: true, accountNumber: "8012345601" },
  "2": { id: "2", name: "Ngozi A.", rating: 4.9, categoryTrips: 67, market: "Mile 12 Market", verified: true, accountNumber: "8012345602" },
  "3": { id: "3", name: "Tunde F.", rating: 4.6, categoryTrips: 19, market: "Ketu Market", verified: false, accountNumber: "8012345603" },
};