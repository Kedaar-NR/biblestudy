import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { OnboardingLayout } from '../../components/OnboardingLayout';

export default function IntroScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding/question?id=1');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <OnboardingLayout 
      backgroundImage={require('../../assets/images/beach-bg.png')}
      onBack={() => router.back()}
    >
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 600 }}
        style={styles.container}
      >
        <Text style={styles.text}>
          Just a few quick questions so we can customize your BibleStudy app
        </Text>
      </MotiView>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'white',
    lineHeight: 44,
    maxWidth: 320,
    marginTop: 100,
  },
});
