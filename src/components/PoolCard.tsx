import React from 'react';
import { View, Text } from 'react-native';
import { colors, radii, spacing, shadow } from '@/theme/theme';


export default function PoolCard({ name, apr, capacity, filled, chain }: { name: string; apr: number; capacity: number; filled: number; chain: string; }) {
const pct = Math.round((filled / capacity) * 100);
return (
<View style={{ backgroundColor: '#fff', borderRadius: radii.lg, padding: spacing.lg, marginBottom: 12, ...shadow.card }}>
<Text style={{ fontWeight: '800', fontSize: 16 }}>{name}</Text>
<Text style={{ color: colors.subtext, marginTop: 2 }}>APR ~ {apr}% • Chain: {chain}</Text>
<Text style={{ marginTop: 8 }}>Capacity AED {capacity.toLocaleString()}</Text>
<View style={{ height: 10, backgroundColor: '#EEF2FF', borderRadius: 999, marginTop: 8 }}>
<View style={{ width: `${pct}%`, height: '100%', backgroundColor: colors.primary, borderRadius: 999 }} />
</View>
<Text style={{ color: colors.subtext, marginTop: 4 }}>{pct}% funded</Text>
</View>
);
}