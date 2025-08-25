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
