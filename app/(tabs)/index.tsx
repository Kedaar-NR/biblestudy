import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ArrowUp, Share2, Sparkles, X } from 'lucide-react-native';
import { MotiView } from 'moti';
import React, { useRef, useState } from 'react';
import { Alert, Animated, Pressable, ScrollView, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../../constants/Theme';
import { BibleApiService } from '../../services/BibleApiService';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [feeling, setFeeling] = useState('');
  const [generatedVerse, setGeneratedVerse] = useState<{ text: string, ref: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!feeling.trim()) return;
    setIsLoading(true);
    try {
      // Simple logic: Pick a random book and chapter for now
      // In a real app, we'd use an AI or keyword search to match the "feeling"
      const books = await BibleApiService.getBooks();
      const randomBook = books[Math.floor(Math.random() * books.length)];
      const randomChapterNum = Math.floor(Math.random() * randomBook.numberOfChapters) + 1;
      const chapterData = await BibleApiService.getChapter(randomBook.id, randomChapterNum);
      
      const verses = Array.isArray(chapterData?.chapter?.content) ? chapterData?.chapter?.content : [];
      if (verses.length > 0) {
        const randomVerseIndex = Math.floor(Math.random() * verses.length);
        const verseText = verses[randomVerseIndex];
        
        setGeneratedVerse({
          text: verseText,
          ref: `${randomBook.name} ${randomChapterNum}:${randomVerseIndex + 1}`
        });
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate verse');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandom = async () => {
    setIsLoading(true);
    try {
      const books = await BibleApiService.getBooks();
      const randomBook = books[Math.floor(Math.random() * books.length)];
      const randomChapterNum = Math.floor(Math.random() * randomBook.numberOfChapters) + 1;
      const chapterData = await BibleApiService.getChapter(randomBook.id, randomChapterNum);
      
      const verses = Array.isArray(chapterData?.chapter?.content) ? chapterData?.chapter?.content : [];
      if (verses.length > 0) {
        const randomVerseIndex = Math.floor(Math.random() * verses.length);
        const verseText = verses[randomVerseIndex];
        
        setGeneratedVerse({
          text: verseText,
          ref: `${randomBook.name} ${randomChapterNum}:${randomVerseIndex + 1}`
        });
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate verse');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!generatedVerse) return;
    try {
      await Share.share({
        message: `"${generatedVerse.text}"\n\n- ${generatedVerse.ref}\n\nShared from BibleStudy app`,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share');
    }
  };

  return (
    <View style={styles.container}>
      <View
        pointerEvents="none"
        style={[
          styles.floatingHeader,
          { paddingTop: insets.top + Spacing.sm },
        ]}
      >
        <View style={styles.headerBar}>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerText}>BibleStudy</Text>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>K</Text>
          </View>
        </View>
      </View>
      <AnimatedScrollView 
        contentContainerStyle={[styles.contentContainer, { paddingTop: insets.top + Spacing.xl }]} 
        showsVerticalScrollIndicator={false}
      >
      {/* Verse Generator Card - No blur */}
      <View style={styles.verseCardContainer}>
        <Image 
          source={require('../../assets/images/ancient-city-bg.png')} 
          style={styles.verseCardBg}
          contentFit="cover"
        />
        <View style={styles.verseOverlay} />
        <View style={styles.verseContent}>
          {generatedVerse ? (
            <MotiView 
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={styles.generatedContent}
            >
              <Text style={styles.generatedText}>"{generatedVerse.text}"</Text>
              <Text style={styles.generatedRef}>{generatedVerse.ref}</Text>
              <View style={styles.generatedActions}>
                <Pressable style={styles.actionButton} onPress={() => setGeneratedVerse(null)}>
                  <X size={16} color="white" />
                  <Text style={styles.actionButtonText}>Clear</Text>
                </Pressable>
                <Pressable style={styles.actionButton} onPress={handleShare}>
                  <Share2 size={16} color="white" />
                  <Text style={styles.actionButtonText}>Share</Text>
                </Pressable>
              </View>
            </MotiView>
          ) : (
            <>
              <Text style={styles.verseTitle}>Find the perfect Bible verse to start your day</Text>
              
              <View style={styles.inputContainer}>
                <TextInput 
                  placeholder="Today I am feeling..."
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  style={styles.input}
                  value={feeling}
                  onChangeText={setFeeling}
                />
                <Pressable 
                  style={[styles.sendButton, !feeling && { opacity: 0.5 }]} 
                  onPress={handleGenerate}
                  disabled={isLoading}
                >
                  <ArrowUp size={20} color="white" />
                </Pressable>
              </View>

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or</Text>
                <View style={styles.dividerLine} />
              </View>

              <Pressable style={styles.randomButton} onPress={handleRandom} disabled={isLoading}>
                <Sparkles size={16} color="#666" />
                <Text style={styles.randomButtonText}>
                  {isLoading ? 'Generating...' : 'Generate a random verse'}
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>

      {/* Story of the Day */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, styles.sectionTitleSpacing]}>Story of The Day</Text>
        <Pressable 
          style={styles.storyOfDayCard}
          onPress={() => router.push('/story/1')}
        >
          <Image 
            source={require('../../assets/images/garden-bg.png')} 
            style={styles.storyImage} 
            contentFit="cover"
          />
          <View style={styles.storyInfo}>
            <Text style={styles.storyTitle}>Jesus Teaches His Disciples to Pray</Text>
            <Text style={styles.storySubtitle} numberOfLines={3}>
              Jesus gives a simple prayer and invites bold trust in a generous Father.
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Major Bible Moments */}
      <View style={[styles.section, styles.sectionSpacing]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Major Bible Moments</Text>
          <Pressable onPress={() => router.push('/stories-list' as any)}><Text style={styles.seeAll}>See All</Text></Pressable>
        </View>
        <Text style={styles.sectionDesc}>Explore a playlist of all the major Bible stories.</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <MomentCard 
            title="The Creation of the World" 
            image={require('../../assets/images/sky-bg.png')} 
            onPress={() => router.push('/story/1')}
          />
          <MomentCard 
            title="Adam and Eve" 
            image={require('../../assets/images/beach-bg.png')} 
            onPress={() => router.push('/story/2')}
          />
          <MomentCard 
            title="Cain and Abel" 
            image={require('../../assets/images/ancient-city-bg.png')} 
            onPress={() => router.push('/story/3')}
          />
        </ScrollView>
      </View>

      {/* Recently Added */}
      <View style={[styles.section, styles.sectionSpacing]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Added</Text>
          <Pressable onPress={() => router.push('/stories-list' as any)}><Text style={styles.seeAll}>See All</Text></Pressable>
        </View>
        <View style={{ height: Spacing.md }} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <MomentCard 
            title="The Sacrifice of Isaac" 
            subtitle="A wild test to see if Abraham trusts G..."
            image={require('../../assets/images/ancient-city-bg.png')} 
            onPress={() => router.push('/story/4')}
          />
          <MomentCard 
            title="Isaac and Rebekah" 
            subtitle="A desert well, some camels, an..."
            image={require('../../assets/images/beach-bg.png')} 
            onPress={() => router.push('/story/5')}
          />
          <MomentCard 
            title="Jacob and Esau" 
            subtitle="Two brothers, major drama, and..."
            image={require('../../assets/images/sky-bg.png')} 
            onPress={() => router.push('/story/6')}
          />
        </ScrollView>
      </View>
      </AnimatedScrollView>
    </View>
  );
}

const MomentCard: React.FC<{ title: string, subtitle?: string, image: any, onPress?: () => void }> = ({ title, subtitle, image, onPress }) => (
  <Pressable style={styles.momentCard} onPress={onPress}>
    <Image source={image} style={styles.momentImage} contentFit="cover" />
    <Text style={styles.momentTitle} numberOfLines={2}>{title}</Text>
    {subtitle && <Text style={styles.momentSubtitle} numberOfLines={2}>{subtitle}</Text>}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    zIndex: 20,
    alignItems: 'center',
    paddingTop: Spacing.xl,
    backgroundColor: 'transparent',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },
  headerSpacer: {
    width: 36,
    height: 36,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: {
    color: 'white',
    fontWeight: '700',
  },
  verseCardContainer: {
    minHeight: 220,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: Spacing.xxl,
  },
  verseCardBg: {
    ...StyleSheet.absoluteFillObject,
  },
  verseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  verseContent: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verseTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 8,
  },
  sendButton: {
    backgroundColor: '#7A3E00',
    borderRadius: 10,
    padding: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: Spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dividerText: {
    color: 'white',
    marginHorizontal: Spacing.sm,
    fontSize: 12,
  },
  randomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 8,
  },
  randomButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 14,
  },
  generatedContent: {
    width: '100%',
    alignItems: 'center',
    gap: Spacing.md,
  },
  generatedText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    fontStyle: 'italic',
  },
  generatedRef: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
    opacity: 0.8,
  },
  generatedActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: Spacing.xxl,
    marginTop: Spacing.xl,
  },
  sectionSpacing: {
    marginTop: Spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  sectionTitleSpacing: {
    marginBottom: Spacing.sm,
  },
  sectionDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: Spacing.md,
  },
  seeAll: {
    fontSize: 14,
    color: '#7A3E00',
    fontWeight: '600',
  },
  storyOfDayCard: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  storyInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  storyTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  storySubtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    lineHeight: 20,
  },
  horizontalScroll: {
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  momentCard: {
    width: 160,
    marginRight: Spacing.md,
  },
  momentImage: {
    width: 160,
    height: 100,
    borderRadius: 16,
    marginBottom: 8,
  },
  momentTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    lineHeight: 18,
  },
  momentSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});
