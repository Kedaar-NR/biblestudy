import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { AnimatePresence, MotiView } from 'moti';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { OnboardingLayout } from '../../components/OnboardingLayout';
import { Spacing } from '../../constants/Theme';

const { width } = Dimensions.get('window');

// Styles defined first to avoid "used before declaration" error
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  slideContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'white',
    paddingHorizontal: Spacing.md,
    lineHeight: 36,
    marginBottom: Spacing.lg,
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneMockup: {
    width: width * 0.6,
    height: width * 1.1,
    backgroundColor: '#fdf8f3',
    borderRadius: 32,
    borderWidth: 8,
    borderColor: '#1a1a1a',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  mockupImage: {
    width: '100%',
    height: 120,
  },
  mockupContent: {
    padding: 12,
    flex: 1,
  },
  mockupTitle: {
    color: '#333',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  mockupSubtitle: {
    color: '#666',
    fontSize: 10,
    marginBottom: 8,
  },
  mockupButton: {
    backgroundColor: '#7A3E00',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  mockupButtonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
  mockupTextContent: {
    gap: 4,
  },
  mockupSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#333',
  },
  mockupBodyText: {
    fontSize: 9,
    color: '#666',
    lineHeight: 13,
  },
  testimonials: {
    width: '100%',
    gap: Spacing.md,
  },
  testimonialCard: {
    borderRadius: 20,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
  testimonialText: {
    color: 'white',
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 26,
    marginBottom: 10,
    textAlign: 'center',
  },
  testimonialAuthor: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
    opacity: 0.8,
  },
  mockupChatHeader: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mockupChatTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
  },
  mockupChatContent: {
    padding: 10,
    gap: 10,
  },
  mockupUserBubble: {
    backgroundColor: '#F5E6D3',
    padding: 8,
    borderRadius: 10,
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  mockupChatText: {
    fontSize: 10,
    color: '#333',
  },
  mockupAiName: {
    fontSize: 9,
    fontWeight: '700',
    color: '#999',
  },
  mockupAiText: {
    fontSize: 10,
    color: '#333',
    lineHeight: 14,
  },
  mockupHomeHeader: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mockupHomeLogo: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'italic',
    color: '#333',
  },
  mockupVerseCard: {
    margin: 10,
    padding: 10,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    gap: 8,
  },
  mockupVerseTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  mockupInput: {
    backgroundColor: 'white',
    width: '100%',
    padding: 6,
    borderRadius: 8,
  },
  mockupInputText: {
    fontSize: 9,
    color: '#999',
  },
  mockupDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: '100%',
  },
  mockupRandomButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 6,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  mockupRandomText: {
    fontSize: 9,
    color: 'white',
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  activeDot: {
    backgroundColor: 'white',
    width: 20,
  },
  footer: {
    width: '100%',
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  nextButton: {
    backgroundColor: '#7A3E00',
    height: 56,
    borderRadius: 16,
  },
});

// Now PREVIEWS can safely use styles
const PREVIEWS = [
  {
    title: "Listen to bible stories & character breakdowns",
    content: (
      <View style={styles.phoneMockup}>
        <Image 
          source={require('../../assets/images/ancient-city-bg.png')} 
          style={styles.mockupImage} 
          contentFit="cover"
        />
        <View style={styles.mockupContent}>
          <Text style={styles.mockupTitle}>Angel announces Jesus' birth to Mary</Text>
          <Text style={styles.mockupSubtitle}>Luke 1:26-38</Text>
          <View style={styles.mockupButton}>
            <Text style={styles.mockupButtonText}>Play Session</Text>
          </View>
          <View style={styles.mockupTextContent}>
            <Text style={styles.mockupSectionTitle}>Context</Text>
            <Text style={styles.mockupBodyText} numberOfLines={4}>
              Before we jump into the birth story, here's what you need to know:
              • Mary is a young Jewish woman living in Nazareth.
            </Text>
          </View>
        </View>
      </View>
    )
  },
  {
    title: "Told in a modern and relatable way",
    content: (
      <View style={styles.testimonials}>
        <BlurView intensity={30} tint="light" style={styles.testimonialCard}>
          <Text style={styles.testimonialText}>"I feel like I'm listening to a weekend debrief from a friend!"</Text>
          <Text style={styles.testimonialAuthor}>- Amelia Carns</Text>
        </BlurView>
        <BlurView intensity={30} tint="light" style={styles.testimonialCard}>
          <Text style={styles.testimonialText}>"This is the best low pressure way to get into the Bible!"</Text>
          <Text style={styles.testimonialAuthor}>- Tarren Gozzi</Text>
        </BlurView>
      </View>
    )
  },
  {
    title: "Talk to BibleStudy for biblical advice",
    content: (
      <View style={styles.phoneMockup}>
        <View style={styles.mockupChatHeader}>
          <Text style={styles.mockupChatTitle}>new chat</Text>
        </View>
        <View style={styles.mockupChatContent}>
          <View style={styles.mockupUserBubble}>
            <Text style={styles.mockupChatText}>I'm tied between my friends and my faith, I'm not sure how to balance it all.</Text>
          </View>
          <Text style={styles.mockupAiName}>BibleStudy</Text>
          <Text style={styles.mockupAiText} numberOfLines={5}>
            Totally get that. Jesus hung out with all kinds of people—tax collectors, outsiders, even folks who didn't share His values.
          </Text>
        </View>
      </View>
    )
  },
  {
    title: "Find the perfect verse for how you're feeling",
    content: (
      <View style={styles.phoneMockup}>
        <View style={styles.mockupHomeHeader}>
          <Text style={styles.mockupHomeLogo}>BibleStudy</Text>
        </View>
        <BlurView intensity={40} tint="light" style={styles.mockupVerseCard}>
          <Text style={styles.mockupVerseTitle}>Find the perfect Bible verse to start your day</Text>
          <View style={styles.mockupInput}>
            <Text style={styles.mockupInputText}>Today I am feeling...</Text>
          </View>
          <View style={styles.mockupDivider} />
          <View style={styles.mockupRandomButton}>
            <Text style={styles.mockupRandomText}>Generate a random verse</Text>
          </View>
        </BlurView>
      </View>
    )
  }
];

export default function FeaturePreviewScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < PREVIEWS.length - 1) {
      setIndex(index + 1);
    } else {
      router.push('/onboarding/rating');
    }
  };

  return (
    <OnboardingLayout 
      backgroundImage={require('../../assets/images/ancient-city-bg.png')}
      onBack={() => router.back()}
    >
      <View style={styles.container}>
        <AnimatePresence exitBeforeEnter>
          <MotiView
            key={index}
            from={{ opacity: 0, translateX: 50 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -50 }}
            transition={{ type: 'timing', duration: 400 }}
            style={styles.slideContent}
          >
            <Text style={styles.title}>{PREVIEWS[index].title}</Text>
            <View style={styles.content}>
              {PREVIEWS[index].content}
            </View>
          </MotiView>
        </AnimatePresence>

        <View style={styles.pagination}>
          {PREVIEWS.map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.dot, 
                i === index && styles.activeDot
              ]} 
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button onPress={handleNext} style={styles.nextButton}>Next</Button>
      </View>
    </OnboardingLayout>
  );
}
