import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { OnboardingLayout } from '../../components/OnboardingLayout';
import { Spacing } from '../../constants/Theme';

export default function RatingScreen() {
  const router = useRouter();

  return (
    <OnboardingLayout 
      backgroundImage={require('../../assets/images/ancient-city-bg.png')}
      onBack={() => router.back()}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.content}
        >
          <Text style={styles.title}>Rate the app</Text>
          
          <View style={styles.starsContainer}>
            {['⭐', '⭐', '⭐', '⭐', '⭐'].map((star, i) => (
              <Text key={i} style={styles.star}>{star}</Text>
            ))}
          </View>

          <View style={styles.avatarsContainer}>
            <View style={[styles.avatarWrapper, { backgroundColor: '#B3E5FC' }]}>
              <Text style={styles.avatarEmoji}>👱‍♀️</Text>
            </View>
            <View style={[styles.avatarWrapper, { backgroundColor: '#FFF9C4', marginLeft: -20 }]}>
              <Text style={styles.avatarEmoji}>👩‍🌾</Text>
            </View>
          </View>

          <BlurView intensity={30} tint="light" style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>
              "We love BibleStudy! It's like a religious friend who can explain anything about the Bible"
            </Text>
            <Text style={styles.testimonialAuthor}>-Emma & Rose</Text>
          </BlurView>

          <View style={styles.pagination}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
          </View>
        </MotiView>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable 
          style={styles.continueButton}
          onPress={() => router.push('/onboarding/paywall')}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    fontStyle: 'italic',
    color: 'white',
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  star: {
    fontSize: 28,
  },
  avatarsContainer: {
    flexDirection: 'row',
    marginVertical: Spacing.sm,
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarEmoji: {
    fontSize: 50,
  },
  testimonialCard: {
    width: '100%',
    borderRadius: 20,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
  testimonialText: {
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic',
    lineHeight: 28,
    marginBottom: 12,
    textAlign: 'center',
  },
  testimonialAuthor: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    opacity: 0.8,
  },
  pagination: {
    flexDirection: 'row',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  activeDot: {
    backgroundColor: 'white',
  },
  footer: {
    width: '100%',
    paddingVertical: Spacing.md,
  },
  continueButton: {
    backgroundColor: '#7A3E00',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
