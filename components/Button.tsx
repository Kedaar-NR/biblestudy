import { BlurView } from 'expo-blur';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors, Fonts, Radius, Spacing } from '../constants/Theme';

interface ButtonProps {
  onPress: () => void;
  children: string;
  variant?: 'primary' | 'glass';
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({ onPress, children, variant = 'primary', style }) => {
  if (variant === 'glass') {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.glassContainer, style, pressed && styles.pressed]}>
        <BlurView intensity={20} tint="light" style={styles.glassBlur}>
          <Text style={styles.glassText}>{children}</Text>
        </BlurView>
      </Pressable>
    );
  }

  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }) => [styles.primaryContainer, style, pressed && styles.pressed]}
    >
      <Text style={styles.primaryText}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  primaryContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primaryText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Fonts.sansBold,
  },
  glassContainer: {
    borderRadius: Radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    width: '100%',
  },
  glassBlur: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.sans,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
