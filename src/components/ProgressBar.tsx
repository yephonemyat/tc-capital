import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@/theme/theme';


type Props = { value: number; label?: string };


export default function ProgressBar({ value, label }: Props) {
const pct = Math.max(0, Math.min(1, value));
return (
<View>
{label ? (
<Text style={{ marginBottom: 6, color: '#64748b', fontWeight: '700' }}>{label}</Text>
) : null}
<View style={{ height: 12, backgroundColor: '#E9EFF8', borderRadius: 999, overflow: 'hidden' }}>
<View style={{ width: `${pct * 100}%`, height: '100%', backgroundColor: colors.primary }} />
</View>
</View>
);
}