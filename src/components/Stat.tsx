import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@/theme/theme';


export default function Stat({ label, value }: { label: string; value: string }) {
return (
<View style={{ alignItems: 'center' }}>
<Text style={{ fontSize: 18, fontWeight: '800', color: colors.text }}>{value}</Text>
<Text style={{ fontSize: 12, color: colors.subtext }}>{label}</Text>
</View>
);
}