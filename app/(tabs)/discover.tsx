import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacing } from '../../constants/Theme';

// Story data with images
const BIBLE_MOMENTS = [
  { id: '1', title: 'The Creation of the World', subtitle: 'How God created everything from n...', image: require('../../assets/images/sky-bg.png') },
  { id: '2', title: 'Adam and Eve', subtitle: 'The first two humans break th...', image: require('../../assets/images/garden-bg.png') },
  { id: '3', title: 'Cain and Abel', subtitle: 'Two brothers fight for God\'s approv...', image: require('../../assets/images/ancient-city-bg.png') },
];

const BIBLE_CHARACTERS = [
  { id: 'adam', name: 'Adam', subtitle: 'The first', image: require('../../assets/images/garden-bg.png') },
  { id: 'eve', name: 'Eve', subtitle: 'Humanity\'s first', image: require('../../assets/images/beach-bg.png') },
  { id: 'cain', name: 'Cain', subtitle: 'Adam and', image: require('../../assets/images/ancient-city-bg.png') },
];

const RECENTLY_ADDED = [
  { id: '4', title: 'The Sacrifice of Isaac', image: require('../../assets/images/ancient-city-bg.png') },
  { id: '5', title: 'Isaac and Rebekah', image: require('../../assets/images/beach-bg.png') },
  { id: '6', title: 'Jacob and Esau', image: require('../../assets/images/sky-bg.png') },
];

export default function DiscoverTab() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  const filteredMoments = BIBLE_MOMENTS.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCharacters = BIBLE_CHARACTERS.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: Spacing.lg + insets.top },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Text style={styles.headerTitle}>Discover</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Search size={20} color="#999" />
        <TextInput
          placeholder="Search stories, topics or characters"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Major Bible Moments */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Major Bible Moments</Text>
            <Text style={styles.sectionDesc}>Explore a playlist of all the major Bible stories.</Text>
          </View>
          <Pressable><Text style={styles.seeAll}>See all</Text></Pressable>
        </View>
        
        <View style={styles.momentsGrid}>
          {filteredMoments.map((moment) => (
            <Pressable 
              key={moment.id} 
              style={styles.momentCard}
              onPress={() => router.push(`/story/${moment.id}` as any)}
            >
              <Image source={moment.image} style={styles.momentImage} contentFit="cover" />
              <Text style={styles.momentTitle} numberOfLines={2}>{moment.title}</Text>
              <Text style={styles.momentSubtitle} numberOfLines={2}>{moment.subtitle}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Bible Characters */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bible Characters</Text>
          <Pressable><Text style={styles.seeAll}>See all</Text></Pressable>
        </View>
        
        <View style={styles.charactersGrid}>
          {filteredCharacters.map((character) => (
            <Pressable 
              key={character.id} 
              style={styles.characterCard}
              onPress={() => router.push(`/character/${character.id}` as any)}
            >
              <Image source={character.image} style={styles.characterImage} contentFit="cover" />
              <Text style={styles.characterName}>{character.name}</Text>
              <Text style={styles.characterSubtitle}>{character.subtitle}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Recently Added */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Added</Text>
          <Pressable><Text style={styles.seeAll}>See all</Text></Pressable>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {RECENTLY_ADDED.map((item) => (
            <Pressable 
              key={item.id} 
              style={styles.recentCard}
              onPress={() => router.push(`/story/${item.id}` as any)}
            >
              <Image source={item.image} style={styles.recentImage} contentFit="cover" />
            </Pressable>
          ))}
        </ScrollView>
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
    paddingTop: Spacing.md,
    paddingBottom: 100,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#000',
    marginBottom: Spacing.lg,
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
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  sectionDesc: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  seeAll: {
    fontSize: 14,
    color: '#7A3E00',
    fontWeight: '600',
  },
  momentsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  momentCard: {
    flex: 1,
  },
  momentImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 8,
  },
  momentTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    lineHeight: 16,
  },
  momentSubtitle: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
    lineHeight: 14,
  },
  charactersGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  characterCard: {
    flex: 1,
    alignItems: 'center',
  },
  characterImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 8,
  },
  characterName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  characterSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  horizontalScroll: {
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  recentCard: {
    marginRight: Spacing.md,
  },
  recentImage: {
    width: 100,
    height: 120,
    borderRadius: 16,
  },
});
