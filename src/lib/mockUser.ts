// Mock — shaped to mirror the real `profiles` table (+ a future
// identity_verifications table for KYC status). Replace with a Supabase
// query once auth is wired up across the app.

export const mockCustomer = {
  fullName: "Amara Chukwu",
  phone: "0801 234 5678",
  email: "amara.c@example.com",
  isVerified: false,
  walletBalance: 12500,
  accountNumber: "8012345600", // unique in-platform transfer ID
};

export function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}