// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Avatar from '@/components/Avatar';
import { useAppStore } from '@/store/useAppStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '@/navigation';
import { colors } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const me = useAppStore((s) => s.me);
  const setMe = useAppStore((s) => s.setMe);

  const [name, setName] = React.useState(me.name);
  const [revenue, setRevenue] = React.useState(String(me.revenueMonthly));
  const [tenure, setTenure] = React.useState(String(me.tenureMonths));

  // ✅ use require() so TS is happy, then turn into a URI
  const logoUri = Image.resolveAssetSource(require('../../images/al-noor.png')).uri;

  function save() {
    setMe({
      name,
      revenueMonthly: Number(revenue) || me.revenueMonthly,
      tenureMonths: Number(tenure) || me.tenureMonths,
    });
    Alert.alert('Saved', 'Your profile has been updated.');
  }

  return (
    <View style={styles.container}>
      {/* Header card */}
      <View style={styles.headerCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <Avatar uri={logoUri} name={me.name} size={64} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{me.name}</Text>
            <Text style={styles.subtitle}>{me.owner}</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <Badge icon="shield-checkmark" label="Verified" />
              <Badge icon="wallet" label="Wallet Ready" />
            </View>
          </View>
        </View>
      </View>

      {/* Editable fields */}
      <Text style={styles.sectionTitle}>SME Profile</Text>
      <Input label="Business name" value={name} onChangeText={setName} />
      <Input
        label="Monthly revenue (AED)"
        value={revenue}
        onChangeText={setRevenue}
        keyboardType="numeric"
      />
      <Input
        label="Tenure (months)"
        value={tenure}
        onChangeText={setTenure}
        keyboardType="numeric"
      />
      <Button title="Save" onPress={save} style={{ marginTop: 4 }} />

      {/* Actions */}
      <View style={{ height: 16 }} />
      <ActionRow icon="id-card" label="KYC" onPress={() => navigation.navigate('KYC')} />
      <ActionRow icon="wallet" label="Wallet" onPress={() => navigation.navigate('Wallet')} />
      <ActionRow icon="settings" label="Settings" onPress={() => navigation.navigate('Settings')} />
      <ActionRow icon="people" label="Partners" onPress={() => navigation.navigate('Partners')} />
    </View>
  );
}

function Badge({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.badge}>
      <Ionicons name={icon} size={14} color="#fff" />
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

function ActionRow({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Button
      title={label}
      onPress={onPress}
      variant="ghost"
      iconLeft={icon}
      style={styles.row}
      textStyle={{ fontWeight: '700' }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#F6F9FF' },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: '900', color: '#111827' },
  subtitle: { color: colors.subtext },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginTop: 8, color: '#111827' },
  row: { height: 56, borderRadius: 20, justifyContent: 'center' },
});
