import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, radii, spacing } from '@/theme/theme';


export default function Input({ label, error, ...props }: TextInputProps & { label?: string; error?: string }) {
return (
<View style={{ gap: 6 }}>
{label ? <Text style={styles.label}>{label}</Text> : null}
<TextInput placeholderTextColor="#98A2B3" style={[styles.input, error && { borderColor: colors.danger }]} {...props} />
{error ? <Text style={styles.err}>{error}</Text> : null}
</View>
);
}


const styles = StyleSheet.create({
label: { color: colors.subtext, fontSize: 12, fontWeight: '600' },
input: { backgroundColor: colors.card, borderRadius: radii.md, borderWidth: 1, borderColor: '#E6E8EE', padding: spacing.md },
err: { color: colors.danger, fontSize: 12 },
});