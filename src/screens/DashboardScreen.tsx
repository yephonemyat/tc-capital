// src/screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '@/navigation';
import { colors, radii, spacing } from '@/theme/theme';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Stat from '@/components/Stat';
import ScoreDonut from '@/components/ScoreDonut';
import ProgressBar from '@/components/ProgressBar';
import InfoBanner from '@/components/InfoBanner';
import MiniBar from '@/components/MiniBar';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '@/store/useAppStore';
import { computeCVCS } from '@/utils/cvcs';
import { computeEligibility } from '@/utils/eligibility';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<HomeStackParamList, 'Dashboard'>;

export default function DashboardScreen({ navigation }: Props) {
  const me = useAppStore((s) => s.me);
  const score = computeCVCS(me);
  const { width } = useWindowDimensions();
  const twoCols = width >= 380; // stack on small devices
  const elig = computeEligibility(score, me.revenueMonthly);
  const pct = Math.max(0, Math.min(1, elig.eligible / elig.cap));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* HERO */}
      <LinearGradient colors={[colors.primary, '#5B8BFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View>
          <Text style={styles.hello}>Welcome, {me.owner}</Text>
          <Text style={styles.brand}>{me.name}</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 10 }}>
            <View style={styles.heroPill}><Ionicons name="shield-checkmark" size={16} color="#fff" /><Text style={styles.heroPillTxt}>Community Verified</Text></View>
            <View style={styles.heroPill}><Ionicons name="wallet" size={16} color="#fff" /><Text style={styles.heroPillTxt}>Microfinance Ready</Text></View>
          </View>
        </View>

        <Pressable onPress={() => navigation.navigate('CVCSDetails')}>
          <ScoreDonut score={score} />
          <Text style={styles.donutLink}>View details</Text>
        </Pressable>
      </LinearGradient>

      <View style={{ paddingHorizontal: spacing.lg, gap: 14, marginTop: -30 }}>
        {/* KPI strip */}
        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Stat label="Revenue / mo" value={`AED ${me.revenueMonthly.toLocaleString()}`} />
            <Stat label="Tenure" value={`${me.tenureMonths} mo`} />
            <Stat label="Endorsements" value={`${me.endorsements.length}`} />
          </View>
        </Card>

        {/* Pre-approval banner */}
        <InfoBanner
          icon="checkmark-circle"
          text={`Pre-approved up to AED ${formatAED(elig.eligible)} today`}
        />

        {/* Eligibility card */}
        {/* Eligibility card */}
        <Card title="Trust → Capital (real-time)">
          <Text style={styles.bigNumber}>AED {formatAED(elig.eligible)}</Text>
          <Text style={{ color: colors.subtext, marginBottom: 10 }}>
            Based on CVCS {score}. Max cap AED {formatAED(elig.cap)}.
          </Text>
          <ProgressBar value={pct} label="Conversion" />
          {elig.nextUnlockAt != null && (
            <Text style={{ color: colors.subtext, marginTop: 6 }}>
              +{Math.max(0, elig.nextUnlockAt - score)} CVCS unlocks a higher limit.
            </Text>
          )}
          <View style={{ height: 10 }} />

          {/* 👉 Force two rows */}
          <View style={styles.ctaColumn}>
            <Button
              title="Request Financing"
              iconLeft="rocket"
              variant="gradient"
              onPress={() => navigation.getParent()?.navigate('FinanceTab' as never)}
              style={styles.ctaFull}
            />
            <Button
              title="Improve Score"
              iconLeft="people"
              variant="outline"
              onPress={() => navigation.getParent()?.navigate('CommunityTab' as never)}
              style={styles.ctaFull}
            />
          </View>
        </Card>



        {/* Score breakdown */}
        <Card title="Score breakdown">
          <BreakdownRow label="Endorsements" tip="+ crowd trust" value={me.endorsements.length / 5} />
          <BreakdownRow label="Revenue track" tip="last 6 mo" value={Math.min(1, me.revenueMonthly / 50000)} />
          <BreakdownRow label="Tenure" tip="business age" value={Math.min(1, me.tenureMonths / 36)} />
        </Card>

        {/* Explore actions */}
        <Card title="Explore">
          <View style={{ gap: 10 }}>
            <Button title="Browse Lending Pools" iconLeft="layers" onPress={() => navigation.getParent()?.navigate('FinanceTab' as never)} />
            <Button title="Finance Invoices" iconLeft="document-text" variant="ghost" onPress={() => navigation.getParent()?.navigate('FinanceTab' as never)} />
          </View>
        </Card>

        {/* Recent activity (mock) */}
        <Card title="Recent activity">
          <ActivityRow icon="people" text="+1 community endorsement (Dubai Chamber)" time="2h ago" />
          <ActivityRow icon="wallet" text="Wallet connected • Stellar USDC" time="yesterday" />
        </Card>

        <Card>
          <Text style={{ color: colors.subtext, fontSize: 12, textAlign: 'center' }}>
            “We turn real-world business trust into capital.”
          </Text>
        </Card>
      </View >
    </ScrollView >
  );
}

function BreakdownRow({ label, tip, value }: { label: string; tip: string; value: number }) {
  return (
    <View style={{ gap: 6, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: '800' }}>{label}</Text>
        <Text style={{ color: '#8A98B1' }}>{tip}</Text>
      </View>
      <MiniBar value={value} />
    </View>
  );
}

function ActivityRow({ icon, text, time }: { icon: keyof typeof Ionicons.glyphMap; text: string; time: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 }}>
      <Ionicons name={icon} size={18} color="#3B82F6" />
      <Text style={{ flex: 1 }}>{text}</Text>
      <Text style={{ color: colors.subtext, fontSize: 12 }}>{time}</Text>
    </View>
  );
}

function formatAED(n: number) {
  return n.toLocaleString('en-AE', { maximumFractionDigits: 0 });
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: 54,
    paddingHorizontal: spacing.lg,
    paddingBottom: 24,
    borderBottomLeftRadius: radii.xl,
    borderBottomRightRadius: radii.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hello: { color: '#fff', opacity: 0.9 },
  brand: { color: '#fff', fontWeight: '900', fontSize: 22, marginTop: 2 },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  heroPillTxt: { color: '#fff', fontWeight: '700' },
  donutLink: { color: '#fff', textAlign: 'center', marginTop: 6, textDecorationLine: 'underline' },
  bigNumber: { fontSize: 28, fontWeight: '900' },

  ctaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  ctaHalf: {
    width: '48%',
  },
  ctaColumn: { flexDirection: 'column', gap: 10 },
  ctaFull: { width: '100%' },


});


