import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type Props = { uri?: string; name?: string; size?: number };

export default function Avatar({ uri, name = '', size = 64 }: Props) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (uri) {
    return <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />;
  }
  return (
    <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={styles.initials}>{initials || '👤'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: { backgroundColor: '#E8EEFA', alignItems: 'center', justifyContent: 'center' },
  initials: { fontSize: 20, fontWeight: '800', color: '#3B4A6B' },
});
