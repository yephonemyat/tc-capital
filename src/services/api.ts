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

// src/services/api.ts
function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}
function monthlyEMI(principal: number, months: number, apr: number) {
    const r = apr / 12;
    return (principal * r) / (1 - Math.pow(1 + r, -months));
}
