import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '../constants/Theme';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  backgroundImage: any;
  onBack?: () => void;
  showBack?: boolean;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ 
  children, 
  backgroundImage, 
  onBack, 
  showBack = true 
}) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {showBack && (
            <View style={styles.header}>
              <Pressable onPress={onBack} style={styles.backButton}>
                <ChevronLeft color="white" size={24} />
              </Pressable>
            </View>
          )}
          
          <View style={styles.content}>
            {children}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  header: {
    height: 50,
    justifyContent: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingTop: Spacing.xxl,
  },
});
