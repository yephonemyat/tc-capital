// src/screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation';
import { colors, radii, spacing } from '@/theme/theme';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Stat from '@/components/Stat';
import ScoreDonut from '@/components/ScoreDonut';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '@/store/useAppStore';
import { computeCVCS } from '@/utils/cvcs';
import { Ionicons } from '@expo/vector-icons';

const DashboardScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Dashboard'>) => {
  const me = useAppStore((s) => s.me);
  const score = computeCVCS(me);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <LinearGradient
        colors={[colors.primary, '#5B8BFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View>
          <Text style={styles.hello}>Welcome, {me.owner}</Text>
          <Text style={styles.brand}>{me.name}</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 10 }}>
            <View style={styles.heroPill}>
              <Ionicons name="shield-checkmark" size={16} color="#fff" />
              <Text style={styles.heroPillTxt}>Community Verified</Text>
            </View>
            <View style={styles.heroPill}>
              <Ionicons name="wallet" size={16} color="#fff" />
              <Text style={styles.heroPillTxt}>Microfinance Ready</Text>
            </View>
          </View>
        </View>
        <ScoreDonut score={score} />
      </LinearGradient>

      <View style={{ paddingHorizontal: spacing.lg, gap: 14, marginTop: -30 }}>
        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Stat label="Revenue / mo" value={`AED ${me.revenueMonthly.toLocaleString()}`} />
            <Stat label="Tenure" value={`${me.tenureMonths} mo`} />
            <Stat label="Endorsements" value={`${me.endorsements.length}`} />
          </View>
        </Card>

        <Card title="Boost your score">
          <Button title="Get Endorsements" onPress={() => navigation.navigate('Endorse')} />
        </Card>

        <Card title="Financing">
          <View style={{ gap: 10 }}>
            <Button title="Browse Lending Pools" onPress={() => navigation.navigate('Pools')} />
            <Button title="Request Financing" variant="secondary" onPress={() => navigation.navigate('RequestLoan')} />
          </View>
        </Card>

        <Card>
          <Text style={{ color: colors.subtext, fontSize: 12, textAlign: 'center' }}>
            “We turn real‑world business trust into capital.”
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
};

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
});

export default DashboardScreen;
