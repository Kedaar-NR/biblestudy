import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing } from '../constants/Theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, variant = 'light', style }) => {
  return (
    <View style={[styles.container, style]}>
      <BlurView 
        intensity={variant === 'light' ? 30 : 50} 
        tint={variant === 'light' ? 'light' : 'dark'} 
        style={styles.blur}
      >
        {children}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  blur: {
    padding: Spacing.lg,
  },
});
