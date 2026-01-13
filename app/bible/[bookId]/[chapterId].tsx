import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, Play, Sparkles } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '../../../constants/Theme';
import { BibleApiService, Book, Chapter } from '../../../services/BibleApiService';

// Background images to cycle through
const CHAPTER_IMAGES = [
  require('../../../assets/images/sky-bg.png'),
  require('../../../assets/images/garden-bg.png'),
  require('../../../assets/images/ancient-city-bg.png'),
  require('../../../assets/images/beach-bg.png'),
];

export default function ChapterReadingScreen() {
  const router = useRouter();
  const { bookId, chapterId } = useLocalSearchParams();
  const [chapterData, setChapterData] = useState<Chapter | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadChapter();
  }, [bookId, chapterId]);

  const loadChapter = async () => {
    setLoading(true);
    setError(null);
    try {
      const [data, books] = await Promise.all([
        BibleApiService.getChapter(bookId as string, Number(chapterId)),
        BibleApiService.getBooks(),
      ]);
      if (!data || !data.chapter) {
        setError('Unable to load this chapter right now.');
        setChapterData(null);
      } else {
        setChapterData(data);
      }
      const foundBook = books.find(b => b.id === bookId);
      setBook(foundBook || null);
    } catch (error) {
      console.error(error);
      setError('Unable to load this chapter right now.');
    } finally {
      setLoading(false);
    }
  };

  const navigateChapter = (direction: 'next' | 'prev') => {
    const current = Number(chapterId);
    const next = direction === 'next' ? current + 1 : current - 1;
    if (next > 0 && book && next <= book.numberOfChapters) {
      router.replace(`/bible/${bookId}/${next}` as any);
    }
  };

  // Get a consistent image based on book and chapter
  const getChapterImage = () => {
    const index = (Number(chapterId) - 1) % CHAPTER_IMAGES.length;
    return CHAPTER_IMAGES[index];
  };

  if (loading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color="#7A3E00" />
      </View>
    );
  }

  if (!chapterData || !chapterData.chapter) {
    return (
      <View style={styles.centerContent}>
        <Text>{error || 'Chapter not found'}</Text>
      </View>
    );
  }

  const currentChapter = Number(chapterId);
  const canGoPrev = currentChapter > 1;
  const canGoNext = book ? currentChapter < book.numberOfChapters : true;
  const normalizeVerses = () => {
    if (!chapterData?.chapter) return [];
    const versesFromContent = Array.isArray(chapterData.chapter.content) ? chapterData.chapter.content : [];
    const versesFromVersesField = Array.isArray((chapterData.chapter as any).verses)
      ? (chapterData.chapter as any).verses.map((v: any) => (typeof v === 'string' ? v : v.text))
      : [];
    return versesFromContent.length ? versesFromContent : versesFromVersesField;
  };

  const verses = normalizeVerses();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Top Image */}
        <View style={styles.imageContainer}>
          <Image source={getChapterImage()} style={styles.headerImage} contentFit="cover" />
          <SafeAreaView style={styles.headerOverlay}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft color="white" size={24} />
            </Pressable>
          </SafeAreaView>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{book?.name || bookId}</Text>
          <Text style={styles.reference}>Chapter {chapterId}</Text>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Pressable style={styles.playButton} onPress={() => router.push('/player')}>
              <Play size={18} color="white" fill="white" />
              <Text style={styles.playButtonText}>Listen</Text>
            </Pressable>
            <Pressable style={styles.askButton} onPress={() => router.push('/(tabs)/chat')}>
              <Sparkles size={18} color="#7A3E00" />
              <Text style={styles.askButtonText}>Ask a question</Text>
            </Pressable>
          </View>

          {/* Scripture Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Scripture</Text>
            <View style={styles.verseContainer}>
              {verses.length ? (
                verses.map((verse, index) => (
                  <Text key={index} style={styles.verseText}>
                    <Text style={styles.verseNum}>{index + 1} </Text>
                    {verse}
                    {'\n\n'}
                  </Text>
                ))
              ) : (
                <Text style={styles.verseText}>No verses available for this chapter.</Text>
              )}
            </View>
          </View>

          {/* Navigation */}
          <View style={styles.navigation}>
            <Pressable
              style={[styles.navButton, !canGoPrev && styles.disabledButton]}
              onPress={() => navigateChapter('prev')}
              disabled={!canGoPrev}
            >
              <ChevronLeft size={20} color={canGoPrev ? '#7A3E00' : '#ccc'} />
              <Text style={[styles.navText, !canGoPrev && styles.disabledText]}>Previous</Text>
            </Pressable>

            <Pressable
              style={[styles.navButton, !canGoNext && styles.disabledButton]}
              onPress={() => navigateChapter('next')}
              disabled={!canGoNext}
            >
              <Text style={[styles.navText, !canGoNext && styles.disabledText]}>Next</Text>
              <ChevronRight size={20} color={canGoNext ? '#7A3E00' : '#ccc'} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf8f3',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdf8f3',
  },
  imageContainer: {
    height: 280,
    width: '100%',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    marginBottom: 4,
  },
  reference: {
    fontSize: 16,
    color: '#666',
    marginBottom: Spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  playButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#7A3E00',
    paddingVertical: 14,
    borderRadius: 14,
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  askButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFF4E0',
    paddingVertical: 14,
    borderRadius: 14,
  },
  askButtonText: {
    color: '#7A3E00',
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: Spacing.md,
  },
  verseContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  verseText: {
    fontSize: 17,
    lineHeight: 28,
    color: '#333',
  },
  verseNum: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7A3E00',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFF4E0',
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
  navText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7A3E00',
  },
  disabledText: {
    color: '#ccc',
  },
});
