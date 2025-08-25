import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@/theme/theme';


export default function Pill({ text }: { text: string }) {
return (
<View style={{ backgroundColor: '#EEF4FF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 }}>
<Text style={{ color: colors.primary, fontWeight: '700' }}>{text}</Text>
</View>
);
}