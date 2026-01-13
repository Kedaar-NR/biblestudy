import { Book, Cross, Headphones, Search, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Spacing } from '../../constants/Theme';
import { BibleApiService, Book as BookType } from '../../services/BibleApiService';

const { width } = Dimensions.get('window');

export default function StoriesTab() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await BibleApiService.getBooks();
        setBooks(data);
      } catch (e) {
        console.error('Failed to load books', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter(b => b.name.toLowerCase().includes(q) || b.title.toLowerCase().includes(q));
  }, [books, query]);

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer} 
      showsVerticalScrollIndicator={false}
    >
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Search size={20} color="#999" />
        <TextInput
          placeholder="Search stories, topics or characters"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <Text style={styles.title}>Select one to get started</Text>

      <View style={styles.booksContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#7A3E00" />
        ) : filtered.length ? (
          filtered.map(book => (
            <Pressable
              key={book.id}
              style={styles.bookCard}
              onPress={() => router.push(`/bible/${book.id}` as any)}
            >
              <Text style={styles.bookName}>{book.name}</Text>
              <Text style={styles.bookMeta}>{book.numberOfChapters} chapters</Text>
            </Pressable>
          ))
        ) : (
          <Text style={styles.emptyText}>No matches found.</Text>
        )}
      </View>

      {/* Testament Selection */}
      <View style={styles.testamentContainer}>
        <Pressable
          style={styles.testamentCard}
          onPress={() => router.push('/bible/GEN' as any)}
        >
          <View style={[styles.testamentIcon, { backgroundColor: '#FFF4E0' }]}>
            <Star size={18} color="#7A3E00" fill="#7A3E00" />
          </View>
          <Text style={styles.testamentTitle}>Old Testament</Text>
          <Text style={styles.testamentDesc}>A big picture adventure from "Let there be light" to a rebuilt Jerusalem.</Text>
        </Pressable>
        
        <Pressable
          style={styles.testamentCard}
          onPress={() => router.push('/bible/MAT' as any)}
        >
          <View style={[styles.testamentIcon, { backgroundColor: '#F0F4FF' }]}>
            <Cross size={18} color="#7A3E00" />
          </View>
          <Text style={styles.testamentTitle}>New Testament</Text>
          <Text style={styles.testamentDesc}>The promised King arrives and the news races around the world.</Text>
        </Pressable>
      </View>

      {/* Streak Card */}
      <Pressable style={styles.streakCard}>
        <View style={styles.streakIconContainer}>
          <Headphones size={24} color="#7A3E00" />
        </View>
        <View style={styles.streakContent}>
          <Text style={styles.streakTitle}>0 Day Streak! 🔥</Text>
          <Text style={styles.streakSubtitle}>Listen to any story to start your streak</Text>
        </View>
      </Pressable>

      {/* Progress Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progress</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressBadge}>
            <Text style={styles.progressBadgeText}>0%</Text>
          </View>
          
          <View style={styles.arcContainer}>
            <Svg width={width - 100} height={(width - 100) / 2 + 10} viewBox={`0 0 ${width - 100} ${(width - 100) / 2 + 10}`}>
              <Path
                d={`M 30 ${(width - 100) / 2} A ${(width - 100) / 2 - 30} ${(width - 100) / 2 - 30} 0 0 1 ${width - 130} ${(width - 100) / 2}`}
                fill="none"
                stroke="#F5E6D3"
                strokeWidth="25"
                strokeLinecap="round"
              />
            </Svg>
            <View style={styles.arcContent}>
              <View style={styles.crossIcon}>
                <Book size={40} color="#7A3E00" strokeWidth={1.5} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf8f3',
  },
  contentContainer: {
    padding: Spacing.lg,
    paddingTop: 100,
    paddingBottom: 100,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#333',
    marginBottom: Spacing.xl,
  },
  booksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  bookCard: {
    width: '48%',
    backgroundColor: 'white',
    padding: Spacing.md,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  bookName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  bookMeta: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 14,
    color: '#777',
  },
  testamentContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  testamentCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  testamentIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  testamentTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    color: '#7A3E00',
  },
  testamentDesc: {
    fontSize: 12,
    color: '#666',
    lineHeight: 17,
  },
  streakCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: Spacing.xl,
  },
  streakIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FDF8F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakContent: {
    flex: 1,
  },
  streakTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
  },
  streakSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#333',
    marginBottom: Spacing.md,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  progressBadge: {
    backgroundColor: '#FDF8F3',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 16,
  },
  progressBadgeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  arcContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arcContent: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  crossIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FDF8F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
