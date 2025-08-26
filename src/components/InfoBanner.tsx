import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = { icon?: keyof typeof Ionicons.glyphMap; text: string };

export default function InfoBanner({ icon = 'information-circle', text }: Props) {
  return (
    <View style={styles.wrap}>
      <Ionicons name={icon} size={16} color="#1f4fff" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(59,130,246,0.08)',
    borderColor: 'rgba(59,130,246,0.18)',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
  },
  text: { color: '#1f4fff', fontWeight: '700' },
});
