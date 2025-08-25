// src/screens/EndorseScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useAppStore } from '@/store/useAppStore';
import { addEndorsement } from '@/services/api';
import Card from '@/components/Card';
import { colors } from '@/theme/theme';

export default function EndorseScreen() {
  const me = useAppStore((s) => s.me);
  const setMe = useAppStore((s) => s.setMe);

  const [by, setBy] = React.useState('');
  const [weight, setWeight] = React.useState('0.5');
  const [note, setNote] = React.useState('');

  async function submit() {
    const list = await addEndorsement(me, by || 'Partner', Number(weight) || 0.5, note);
    setMe({ endorsements: list });
    setBy(''); setWeight('0.5'); setNote('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Community Endorsements</Text>
      <Card>
        <FlatList
          data={me.endorsements}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.name}>{item.by}</Text>
              <Text style={{ color: colors.subtext }}>weight {item.weight}</Text>
            </View>
          )}
        />
      </Card>
      <Card title="Add endorsement">
        <Input label="By" value={by} onChangeText={setBy} />
        <Input label="Weight (0–1)" value={weight} onChangeText={setWeight} keyboardType="decimal-pad" />
        <Input label="Note" value={note} onChangeText={setNote} />
        <Button title="Save" onPress={submit} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  h1: { fontSize: 20, fontWeight: '800' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontWeight: '700' },
});
