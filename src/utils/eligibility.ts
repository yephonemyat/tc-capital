export type Eligibility = {
    eligible: number;
    cap: number;
    factor: number;
    nextUnlockAt?: number;
};


/**
* Simple ladder: higher CVCS → higher multiple of monthly revenue.
* Cap the demo at AED 250k for clean UI.
*/
export function computeEligibility(score: number, revenueMonthly: number): Eligibility {
    const cap = 250_000;
    const ladder = [
        { at: 0, factor: 0 },
        { at: 60, factor: 1.0 },
        { at: 70, factor: 1.25 },
        { at: 80, factor: 1.75 },
        { at: 90, factor: 2.5 },
    ];
    const current = [...ladder].reverse().find((l) => score >= l.at) ?? ladder[0];
    const next = ladder.find((l) => l.at > current.at);
    const eligibleRaw = revenueMonthly * current.factor;
    const eligible = Math.min(cap, Math.round(eligibleRaw / 100) * 100);
    return { eligible, cap, factor: current.factor, nextUnlockAt: next?.at };
}