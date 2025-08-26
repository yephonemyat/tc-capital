// src/components/Button.tsx
import React from 'react';
import { Pressable, Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '@/theme/theme';

type Props = {
  title: string;
  onPress: () => void;
  iconLeft?: keyof typeof Ionicons.glyphMap;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

export default function Button({
  title,
  onPress,
  iconLeft,
  variant = 'primary',
  style,
  textStyle,
  disabled,
}: Props) {
  const content = (
    <View style={[styles.content, variantStyles.content[variant]]}>
      {iconLeft ? (
        <Ionicons
          name={iconLeft}
          size={18}
          color={variant === 'outline' || variant === 'ghost' ? colors.primary : '#fff'}
          style={{ marginRight: 8 }}
        />
      ) : null}
      <Text style={[styles.text, variantStyles.text[variant], textStyle]} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );

  // Only gradient variant uses LinearGradient wrapper
  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={['#3B82F6', '#5B8BFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.base, style]}
      >
        <Pressable style={styles.press} onPress={onPress} disabled={disabled}>
          {content}
        </Pressable>
      </LinearGradient>
    );
  }

  // Non-gradient variants use a plain View container
  return (
    <View style={[styles.base, variantStyles.container[variant], style]}>
      <Pressable style={styles.press} onPress={onPress} disabled={disabled}>
        {content}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    minHeight: 56,
  },
  press: {
    flex: 1,
  },
  content: {
    flex: 1,
    height: 56,
    paddingHorizontal: 20,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '800',
    fontSize: 16,
  },
});

const variantStyles = {
  container: StyleSheet.create({
    primary: { backgroundColor: colors.primary },
    secondary: { backgroundColor: '#EAF0FF' },
    ghost: { backgroundColor: 'transparent' },
    gradient: {}, // handled above
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.primary,
    },
  }),
  content: StyleSheet.create({
    primary: {},
    secondary: {},
    ghost: {},
    gradient: {},
    outline: {}, // content stays centered; container provides the border
  }),
  text: StyleSheet.create({
    primary: { color: '#fff' },
    secondary: { color: colors.primary },
    ghost: { color: colors.primary },
    gradient: { color: '#fff' },
    outline: { color: colors.primary },
  }),
};
