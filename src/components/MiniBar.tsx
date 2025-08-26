import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function MiniBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(1, value));
  return (
    <View style={styles.base}>
      <View style={[styles.fill, { width: `${v * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 8,
    backgroundColor: '#e9eff8',
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: { height: '100%', backgroundColor: '#3b82f6' },
});
