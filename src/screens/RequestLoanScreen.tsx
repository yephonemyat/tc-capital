// src/screens/RequestLoanScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { z } from 'zod';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useAppStore } from '@/store/useAppStore';
import { computeCVCS } from '@/utils/cvcs';
import { submitLoan } from '@/services/api';

const schema = z.object({
  amount: z.coerce.number().min(5000).max(250000),
  tenureMonths: z.coerce.number().min(3).max(24),
  purpose: z.string().min(5),
});
type Form = z.infer<typeof schema>;

export default function RequestLoanScreen() {
  const me = useAppStore((s) => s.me);
  const score = computeCVCS(me);

  const { register, setValue, handleSubmit, formState: { errors } } =
    useForm<Form>({ resolver: zodResolver(schema) as Resolver<Form> });

  async function onSubmit(values: Form) {
    const res = await submitLoan(me, values, score);
    if (res.approved) {
      Alert.alert('Approved ✅', `EMI ≈ AED ${res.emi}\nDSCR: ${res.dscr}`);
    } else {
      Alert.alert('Pending/Review', `We need more endorsements or lower amount. DSCR: ${res.dscr}`);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Request Financing</Text>
      <Text style={{ color: '#475569' }}>CVCS Score</Text>
      <Text style={styles.score}>{score}</Text>

      <Input
        label="Amount (AED)"
        keyboardType="numeric"
        onChangeText={(t) => setValue('amount', Number(t))}
        {...register('amount')}
        error={errors.amount?.message}
      />
      <Input
        label="Tenure (months)"
        keyboardType="numeric"
        onChangeText={(t) => setValue('tenureMonths', Number(t))}
        {...register('tenureMonths')}
        error={errors.tenureMonths?.message}
      />
      <Input
        label="Purpose"
        placeholder="Inventory, payroll, equipment…"
        onChangeText={(t) => setValue('purpose', t)}
        {...register('purpose')}
        error={errors.purpose?.message}
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  h1: { fontSize: 20, fontWeight: '800' },
  score: { fontSize: 32, fontWeight: '900', marginBottom: 4 },
});
