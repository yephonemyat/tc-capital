import type { SME } from '@/store/useAppStore';

/** Returns a 0–100 score from endorsements + business durability */
export function computeCVCS(sme: SME) {
  const base = 40; // trust baseline
  const endurance = Math.min(30, sme.tenureMonths * 0.8); // up to +30
  const revBoost = Math.min(15, Math.log10(Math.max(1, sme.revenueMonthly)) * 5); // up to +15
  const crowd = Math.min(25, sme.endorsements.reduce((a: number, e) => a + e.weight * 10, 0)); // up to +25
  const raw = base + endurance + revBoost + crowd;
  return Math.max(0, Math.min(100, Math.round(raw)));
}
