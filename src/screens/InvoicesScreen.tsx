// src/screens/InvoicesScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { colors } from '@/theme/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FinanceStackParamList } from '@/navigation';

type Props = NativeStackScreenProps<FinanceStackParamList, 'Invoices'>;

const invoices = [
  { id: 'inv-101', buyer: 'GulfMart', amount: 22000, due: 45 },
  { id: 'inv-102', buyer: 'Noon', amount: 14500, due: 30 },
  { id: 'inv-103', buyer: 'Talabat', amount: 8600, due: 35 },
];

export default function InvoicesScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Finance your invoices</Text>
      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 14 }}
        renderItem={({ item }) => (
          <Card>
            <Text style={styles.buyer}>{item.buyer}</Text>
            <Text>ID: {item.id}</Text>
            <Text>Amount: AED {item.amount.toLocaleString()}</Text>
            <Text>Due: {item.due} days</Text>
            <Text style={styles.meta}>Advance: up to 80%</Text>
            <Text style={styles.meta}>Fee: ~1.5% per month</Text>
            <View style={{ height: 8 }} />
            <Button
              title="Finance this"
              onPress={() => navigation.navigate('InvoiceDetails', { invoice: item })}
            />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 16 },
  h1: { fontSize: 20, fontWeight: '900' },
  buyer: { fontWeight: '800', fontSize: 16, marginBottom: 4 },
  meta: { fontSize: 12, color: colors.subtext },
});
