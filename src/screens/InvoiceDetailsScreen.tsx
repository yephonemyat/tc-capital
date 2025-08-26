// src/screens/InvoiceDetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FinanceStackParamList } from '@/navigation';
import { colors } from '@/theme/theme';
import Button from '@/components/Button';

type Props = NativeStackScreenProps<FinanceStackParamList, 'InvoiceDetails'>;

export default function InvoiceDetailsScreen({ route }: Props) {
  const { invoice } = route.params as any;
  const advanceRate = 0.8;
  const upfront = Math.round(invoice.amount * advanceRate);
  const fee = Math.round(invoice.amount * 0.015); // 1.5% monthly
  const net = upfront - fee;

  function confirm() {
    Alert.alert('Success 🎉', `AED ${net.toLocaleString()} will be disbursed to your wallet.`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Invoice Financing</Text>
      <Text style={styles.buyer}>{invoice.buyer}</Text>
      <Text>ID: {invoice.id}</Text>
      <Text>Amount: AED {invoice.amount.toLocaleString()}</Text>
      <Text>Due: {invoice.due} days</Text>

      <View style={{ height: 14 }} />

      <Text>Advance rate: {advanceRate * 100}%</Text>
      <Text>Upfront: AED {upfront.toLocaleString()}</Text>
      <Text>Fee: AED {fee.toLocaleString()}</Text>
      <Text style={{ fontWeight: '700' }}>Net payout: AED {net.toLocaleString()}</Text>

      <View style={{ height: 24 }} />
      <Button title="Confirm Financing" onPress={confirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.bg, gap: 6 },
  h1: { fontSize: 20, fontWeight: '900', marginBottom: 10 },
  buyer: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
});
