import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronDown, ChevronLeft, Pause, Play, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '../../constants/Theme';

const { width } = Dimensions.get('window');

const SPEAKERS = ['Raquel', 'Michael', 'Grace', 'Daniel'];

// Real Bible story content
const STORIES = {
  '1': {
    title: 'The Creation of the World',
    reference: 'Genesis 1',
    length: '4:51 min',
    image: require('../../assets/images/sky-bg.png'),
    context: `Okay, this is where everything starts. There are no people. No light. No Earth. Just a whole lot of nothing.

And then, God speaks. And with every word, something new bursts into existence.

This story is about power, intention, and how we were made on purpose from the very beginning.`,
    story: `So, Genesis kicks off with an iconic line:

"In the beginning, God created the heavens and the earth."

But the earth is formless. It's covered in water and is completely dark.

Then God says the first words ever recorded:

"Let there be light."

And bang, light exists.

Not from the sun or anything, literally just from the power of His voice. Pop off, King.

And then He separates light from darkness and gives them names: Day and Night.

And this all happens on the first day ever.

On Day 2, God speaks again and is like:

"Let there be a sky to separate the waters."

And suddenly there's an atmosphere.

Then Day Three happens, and God says:

"Let the waters gather and let dry land appear."

So land shows up, oceans form, and continents rise, but He's not done.

"Let the land produce vegetation."

And all these trees, plants, fruit, and flowers start bursting out of the ground.`,
  },
  '2': {
    title: 'Adam and Eve',
    reference: 'Genesis 2-3',
    length: '6:23 min',
    image: require('../../assets/images/garden-bg.png'),
    context: `This is the story of the first two humans ever created. It's about love, trust, temptation, and the first big mistake that changed everything.

You'll see how close God was to humanity in the beginning, and why things had to change.`,
    story: `So God has finished creating the world, and on Day 6, He does something different.

Instead of just speaking, He gets His hands dirty:

"Then the Lord God formed a man from the dust of the ground and breathed into his nostrils the breath of life."

This is Adam. The first human being.

God plants a garden in Eden and puts Adam there. It's paradise—beautiful trees, rivers, everything perfect.

But God says there's one rule:

"You may eat from any tree in the garden except the tree of the knowledge of good and evil. If you eat from it, you will surely die."

Then God notices Adam is alone. And He says:

"It is not good for the man to be alone. I will make a helper suitable for him."

So God causes Adam to fall into a deep sleep, takes one of his ribs, and creates Eve.

Adam wakes up and he's like, "Finally! Someone like me!"

They're both naked and feel no shame. Pure innocence.

But then... the serpent shows up.`,
  },
  '3': {
    title: 'Cain and Abel',
    reference: 'Genesis 4',
    length: '5:12 min',
    image: require('../../assets/images/ancient-city-bg.png'),
    context: `After Adam and Eve leave the garden, they have two sons. This is the first sibling rivalry in history, and it doesn't end well.

It's a story about jealousy, anger, and the first murder.`,
    story: `Adam and Eve have two sons: Cain, the firstborn, and Abel.

Cain becomes a farmer. Abel becomes a shepherd.

One day, both brothers bring offerings to God. Abel brings the best portions of his firstborn lambs. Cain brings some of his crops.

God looks with favor on Abel's offering but not on Cain's.

Cain is furious. His face falls.

God sees this and asks him:

"Why are you angry? If you do what is right, won't you be accepted? But if you don't, sin is crouching at your door. It desires to have you, but you must rule over it."

But Cain doesn't listen.

He says to Abel, "Let's go out to the field."

And while they're there, Cain attacks his brother and kills him.

Then God asks:

"Where is your brother Abel?"

And Cain answers with the famous line:

"Am I my brother's keeper?"

But God knows. He always knows.`,
  },
};

export default function StoryDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const story = STORIES[id as keyof typeof STORIES] || STORIES['1'];
  const numericId = Number(id || '1');
  const defaultSpeaker = story.speaker ?? SPEAKERS[(numericId - 1 + SPEAKERS.length) % SPEAKERS.length];
  const [selectedSpeaker, setSelectedSpeaker] = useState(defaultSpeaker);
  const [showSpeakerMenu, setShowSpeakerMenu] = useState(false);

  const handlePlaySession = () => {
    setIsPlaying(true);
    setShowMiniPlayer(true);
    router.push({
      pathname: '/player',
      params: { story: story.title, speaker: selectedSpeaker },
    } as any);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Top Image */}
        <View style={styles.imageContainer}>
          <Image source={story.image} style={styles.headerImage} contentFit="cover" />
          <SafeAreaView style={styles.headerOverlay}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft color="white" size={24} />
            </Pressable>
          </SafeAreaView>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{story.title}</Text>
          <Text style={styles.reference}>{story.reference}</Text>

          {/* Speaker and Length */}
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Speaker</Text>
              <Pressable style={styles.metaValue} onPress={() => setShowSpeakerMenu(prev => !prev)}>
                <Text style={styles.metaValueText}>{selectedSpeaker}</Text>
                <ChevronDown size={16} color="#333" />
              </Pressable>
              {showSpeakerMenu && (
                <View style={styles.dropdown}>
                  {SPEAKERS.map(name => (
                    <Pressable
                      key={name}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedSpeaker(name);
                        setShowSpeakerMenu(false);
                      }}
                    >
                      <Text style={[styles.metaValueText, name === selectedSpeaker && styles.dropdownActive]}>
                        {name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Length</Text>
              <Text style={styles.metaValueText}>{story.length}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Pressable style={styles.playButton} onPress={handlePlaySession}>
              <Play size={18} color="white" fill="white" />
              <Text style={styles.playButtonText}>Play Session</Text>
            </Pressable>
            <Pressable style={styles.askButton} onPress={() => router.push('/(tabs)/chat')}>
              <Sparkles size={18} color="#7A3E00" />
              <Text style={styles.askButtonText}>Ask a question</Text>
            </Pressable>
          </View>

          {/* Context Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Context</Text>
            <Text style={styles.sectionText}>{story.context}</Text>
          </View>

          {/* Story Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Story</Text>
            <Text style={styles.sectionText}>{story.story}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Mini Player */}
      {showMiniPlayer && (
        <View style={styles.playerContainer}>
          <BlurView intensity={80} tint="light" style={styles.miniPlayer}>
            <Pressable onPress={() => router.push('/player')} style={styles.miniPlayerContent}>
              <Image source={story.image} style={styles.miniPlayerImage} contentFit="cover" />
              <View style={styles.miniPlayerInfo}>
                <Text style={styles.miniPlayerTitle}>{story.title}</Text>
              </View>
              <View style={styles.miniPlayerControls}>
                <Pressable 
                  style={styles.miniPlayButton}
                  onPress={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause size={18} color="white" fill="white" />
                  ) : (
                    <Play size={18} color="white" fill="white" />
                  )}
                </Pressable>
                <Pressable onPress={() => setShowMiniPlayer(false)}>
                  <Text style={styles.closeButton}>×</Text>
                </Pressable>
              </View>
            </Pressable>
          </BlurView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf8f3',
  },
  scrollContent: {
    paddingBottom: 120,
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
  metaContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  metaItem: {
    flex: 1,
    position: 'relative',
  },
  metaLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  metaValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaValueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownActive: {
    color: '#7A3E00',
    fontWeight: '700',
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
  sectionText: {
    fontSize: 17,
    color: '#333',
    lineHeight: 26,
  },
  playerContainer: {
    position: 'absolute',
    bottom: 30,
    left: Spacing.lg,
    right: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  miniPlayer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  miniPlayerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  miniPlayerImage: {
    width: 45,
    height: 45,
    borderRadius: 10,
  },
  miniPlayerInfo: {
    flex: 1,
  },
  miniPlayerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  miniPlayerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  miniPlayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#7A3E00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
    marginLeft: 4,
  },
});
