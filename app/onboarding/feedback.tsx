import { useLocalSearchParams, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { OnboardingLayout } from '../../components/OnboardingLayout';

const FEEDBACKS = {
  '1': {
    text: "Amazing, this is the perfect place to start learning about the Bible!",
    next: '/onboarding/question?id=2',
  },
  '2': {
    text: "We're excited to help you with these! Let's take a quick peek at what's inside of BibleStudy.",
    next: '/onboarding/previews',
  }
};

export default function FeedbackScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const currentFeedback = FEEDBACKS[id as keyof typeof FEEDBACKS] || FEEDBACKS['1'];

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(currentFeedback.next as any);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <OnboardingLayout 
      backgroundImage={require('../../assets/images/beach-bg.png')}
      onBack={() => router.back()}
    >
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600 }}
        style={styles.container}
      >
        <Text style={styles.text}>{currentFeedback.text}</Text>
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
