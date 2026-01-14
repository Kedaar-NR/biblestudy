import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pause, Play, RotateCcw, RotateCw, X } from 'lucide-react-native';
import { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '../constants/Theme';

const { width } = Dimensions.get('window');

export default function PlayerScreen() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0.3);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = 291; // 4:51 in seconds
  const currentTime = progress * totalDuration;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.handle} />
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <X size={24} color="#333" />
        </Pressable>
      </View>

      {/* Album Art */}
      <View style={styles.artContainer}>
        <Image 
          source={require('../assets/images/sky-bg.png')} 
          style={styles.albumArt}
          contentFit="cover"
        />
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>The Creation of the World</Text>
        <Text style={styles.subtitle}>Bible bff</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          <View style={[styles.progressThumb, { left: `${progress * 100}%` }]} />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>-{formatTime(totalDuration - currentTime)}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <Pressable style={styles.skipButton}>
          <RotateCcw size={32} color="#333" />
          <Text style={styles.skipText}>10</Text>
        </Pressable>
        
        <Pressable 
          style={styles.playPauseButton}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause size={40} color="#333" fill="#333" />
          ) : (
            <Play size={40} color="#333" fill="#333" />
          )}
        </Pressable>
        
        <Pressable style={styles.skipButton}>
          <RotateCw size={32} color="#333" />
          <Text style={styles.skipText}>10</Text>
        </Pressable>
      </View>

      {/* Speed Control */}
      <View style={styles.speedContainer}>
        <Pressable 
          style={styles.speedButton}
          onPress={() => {
            const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
            const currentIndex = speeds.indexOf(playbackSpeed);
            const nextIndex = (currentIndex + 1) % speeds.length;
            setPlaybackSpeed(speeds[nextIndex]);
          }}
        >
          <Text style={styles.speedText}>{playbackSpeed}x</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf8f3',
    paddingHorizontal: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    position: 'relative',
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#DDD',
    borderRadius: 3,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  artContainer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  albumArt: {
    width: width - 80,
    height: width - 80,
    borderRadius: 16,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
  },
  progressContainer: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7A3E00',
    borderRadius: 3,
  },
  progressThumb: {
    position: 'absolute',
    top: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#333',
    marginLeft: -7,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    marginBottom: Spacing.xxl,
  },
  skipButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  skipText: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: '700',
    color: '#333',
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedContainer: {
    alignItems: 'center',
  },
  speedButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  speedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
