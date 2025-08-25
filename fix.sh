# 0) (optional) remove the stray old entry file if you see two (keep index.tsx)
[ -f index.ts ] && rm -f index.ts

# 1) theme
mkdir -p src/theme
cat > src/theme/theme.ts <<'TS'
export const colors = {
  bg: '#F5F7FB',
  card: '#FFFFFF',
  text: '#0F172A',
  subtext: '#475569',
  primary: '#2D6CDF',
  primaryDark: '#1E4FB1',
  success: '#16a34a',
  warning: '#f59e0b',
  danger: '#ef4444',
  muted: '#E7ECF5',
};
export const radii = { sm: 10, md: 14, lg: 20, xl: 28 } as const;
export const spacing = { xs: 6, sm: 10, md: 14, lg: 18, xl: 24 } as const;
export const shadow = {
  card: { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
};
TS

# 2) store
mkdir -p src/store
cat > src/store/useAppStore.ts <<'TS'
import { create } from 'zustand';

export type SME = {
  id: string;
  name: string;
  owner: string;
  sector: 'Retail' | 'Services' | 'Food' | 'Other';
  revenueMonthly: number; // AED
  tenureMonths: number;   // operating months
  endorsements: { by: string; weight: number; note?: string }[];
};

type AppState = {
  me: SME;
  setMe: (p: Partial<SME>) => void;
};

export const useAppStore = create<AppState>((set) => ({
  me: {
    id: 'sme-001',
    name: 'Al Noor Crafts',
    owner: 'Sara Khan',
    sector: 'Retail',
    revenueMonthly: 38000,
    tenureMonths: 26,
    endorsements: [
      { by: 'Supplier A', weight: 0.8, note: 'Pays net-30 reliably' },
      { by: 'Customer B', weight: 0.6, note: 'Repeat orders 12 months' },
    ],
  },
  setMe: (p) => set((s) => ({ me: { ...s.me, ...p } })),
}));
TS

# 3) utils
mkdir -p src/utils
cat > src/utils/cvcs.ts <<'TS'
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
TS

# 4) services
mkdir -p src/services
cat > src/services/api.ts <<'TS'
import { SME } from '@/store/useAppStore';

export type Pool = { id: string; name: string; apr: number; capacity: number; filled: number; chain: 'Polygon' | 'Stellar' };
export type LoanRequest = { amount: number; tenureMonths: number; purpose: string };

const pools: Pool[] = [
  { id: 'p1', name: 'GCC Supply Chain Pool', apr: 9.5, capacity: 500000, filled: 312000, chain: 'Polygon' },
  { id: 'p2', name: 'Women-led SME Pool', apr: 7.9, capacity: 300000, filled: 120500, chain: 'Stellar' },
];

export async function fetchPools(): Promise<Pool[]> { await sleep(300); return pools; }

export async function submitLoan(sme: SME, req: LoanRequest, cvcsScore: number) {
  await sleep(500);
  const emi = monthlyEMI(req.amount, req.tenureMonths, 0.10);
  const dscr = (sme.revenueMonthly * 0.25) / emi; // assume 25% free cash
  const approved = cvcsScore >= 60 && dscr >= 1.1;
  return { approved, emi: Math.round(emi), dscr: Number(dscr.toFixed(2)) };
}

export async function addEndorsement(sme: SME, by: string, weight: number, note?: string) {
  await sleep(200);
  sme.endorsements.push({ by, weight, note });
  return sme.endorsements;
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }
function monthlyEMI(principal: number, months: number, apr: number) {
  const r = apr / 12;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}
TS

