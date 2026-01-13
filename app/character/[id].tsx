import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '../../constants/Theme';

// Character data
const CHARACTERS = {
  'adam': {
    name: 'Adam',
    image: require('../../assets/images/garden-bg.png'),
    overview: "The first human. Walks with God in Eden, names the animals, then fumbles the perfect setup by eating the forbidden fruit and launching humanity's long struggle with sin.",
    stories: [
      { id: '2', title: 'Adam and Eve', subtitle: 'Story of Adam', image: require('../../assets/images/garden-bg.png') },
      { id: '3', title: 'Cain and Abel', subtitle: 'Story of Adam', image: require('../../assets/images/ancient-city-bg.png') },
    ]
  },
  'eve': {
    name: 'Eve',
    image: require('../../assets/images/beach-bg.png'),
    overview: "The first woman, created from Adam's rib. She was deceived by the serpent and ate the forbidden fruit, but she also became the 'mother of all living.'",
    stories: [
      { id: '2', title: 'Adam and Eve', subtitle: 'Story of Eve', image: require('../../assets/images/garden-bg.png') },
    ]
  },
  'cain': {
    name: 'Cain',
    image: require('../../assets/images/ancient-city-bg.png'),
    overview: "The firstborn son of Adam and Eve. A farmer whose offering was rejected by God. In a fit of jealousy, he killed his brother Abel and became a wanderer.",
    stories: [
      { id: '3', title: 'Cain and Abel', subtitle: 'Story of Cain', image: require('../../assets/images/ancient-city-bg.png') },
    ]
  },
};

export default function CharacterDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const character = CHARACTERS[id as keyof typeof CHARACTERS] || CHARACTERS['adam'];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Top Image */}
        <View style={styles.imageContainer}>
          <Image source={character.image} style={styles.headerImage} contentFit="cover" />
          <SafeAreaView style={styles.headerOverlay}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft color="white" size={24} />
            </Pressable>
          </SafeAreaView>
          <View style={styles.nameOverlay}>
            <Text style={styles.characterName}>{character.name}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overviewText}>{character.overview}</Text>
          </View>

          {/* Stories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Stories with {character.name}</Text>
            {character.stories.map((story) => (
              <Pressable 
                key={story.id}
                style={styles.storyCard}
                onPress={() => router.push(`/story/${story.id}` as any)}
              >
                <Image source={story.image} style={styles.storyImage} contentFit="cover" />
                <View style={styles.storyInfo}>
                  <Text style={styles.storyTitle}>{story.title}</Text>
                  <Text style={styles.storySubtitle}>{story.subtitle}</Text>
                </View>
              </Pressable>
            ))}
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
    paddingBottom: 100,
  },
  imageContainer: {
    height: 300,
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
  nameOverlay: {
    position: 'absolute',
    bottom: 20,
    left: Spacing.lg,
  },
  characterName: {
    fontSize: 36,
    fontWeight: '800',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
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
  overviewText: {
    fontSize: 17,
    color: '#333',
    lineHeight: 26,
  },
  storyCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  storyImage: {
    width: 80,
    height: 80,
  },
  storyInfo: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'center',
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  storySubtitle: {
    fontSize: 14,
    color: '#666',
  },
});
