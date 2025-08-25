import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii, spacing } from '@/theme/theme';


export type ButtonProps = {
title: string;
onPress?: () => void;
variant?: 'primary' | 'secondary' | 'ghost';
loading?: boolean;
style?: ViewStyle;
};


export default function Button({ title, onPress, variant = 'primary', loading, style }: ButtonProps) {
const styles = getStyles(variant);
return (
<Pressable disabled={loading} onPress={onPress} style={({ pressed }) => [styles.btn, style, pressed && { opacity: 0.85 }]}>
{loading ? <ActivityIndicator /> : <Text style={styles.txt}>{title}</Text>}
</Pressable>
);
}


const getStyles = (variant: ButtonProps['variant']) =>
StyleSheet.create({
btn: {
paddingVertical: spacing.md,
borderRadius: radii.lg,
alignItems: 'center',
backgroundColor: variant === 'primary' ? colors.primary : variant === 'secondary' ? '#E6EEFF' : 'transparent',
borderWidth: variant === 'ghost' ? 1 : 0,
borderColor: variant === 'ghost' ? colors.muted : 'transparent',
},
txt: {
color: variant === 'primary' ? 'white' : colors.primary,
fontWeight: '700',
fontSize: 16,
},
});