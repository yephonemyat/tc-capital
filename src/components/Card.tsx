import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { colors, radii, spacing, shadow } from '@/theme/theme';


export default function Card({ title, children, style }: ViewProps & { title?: string; children?: React.ReactNode }) {
return (
<View style={[styles.card, shadow.card, style]}>
{title ? <Text style={styles.title}>{title}</Text> : null}
<View style={{ gap: 8 }}>{children}</View>
</View>
);
}


const styles = StyleSheet.create({
card: { backgroundColor: colors.card, borderRadius: radii.lg, padding: spacing.lg },
title: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 6 },
});