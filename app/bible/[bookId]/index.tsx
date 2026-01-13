import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '../../../constants/Theme';
import { BibleApiService, Book } from '../../../services/BibleApiService';

export default function BookChaptersScreen() {
  const router = useRouter();
  const { bookId } = useLocalSearchParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookDetails();
  }, [bookId]);

  const loadBookDetails = async () => {
    try {
      // In a real app, we might need a specific endpoint for book details or pass it via params.
      // For now, we'll fetch all books and find the one matching the ID to get the name and chapter count.
      // Optimization: Pass book name via params or store in global state/context.
      const books = await BibleApiService.getBooks();
      const foundBook = books.find(b => b.id === bookId);
      setBook(foundBook || null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color="#7A3E00" />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.centerContent}>
        <Text>Book not found</Text>
      </View>
    );
  }

  const chapters = Array.from({ length: book.numberOfChapters }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft color="#333" size={24} />
          </Pressable>
          <Text style={styles.headerTitle}>{book.name}</Text>
          <View style={{ width: 40 }} />
        </View>

        <FlatList
          data={chapters}
          keyExtractor={(item) => item.toString()}
          numColumns={4}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable 
              style={styles.chapterCard}
              onPress={() => router.push(`/bible/${bookId}/${item}` as any)}
            >
              <Text style={styles.chapterNum}>{item}</Text>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  safeArea: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  listContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  chapterCard: {
    flex: 1,
    aspectRatio: 1,
    margin: Spacing.xs,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  chapterNum: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});
