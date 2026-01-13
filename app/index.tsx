import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { ImageBackground, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '../constants/Theme';

export default function SplashScreen() {
  const router = useRouter();
  const [showSignInSheet, setShowSignInSheet] = React.useState(false);

  return (
    <ImageBackground 
      source={require('../assets/images/sky-bg.png')} 
      style={styles.background}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <MotiView 
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 800 }}
            style={styles.logoContainer}
          >
            {/* Book Emoji Logo */}
            <Text style={styles.logoEmoji}>📖</Text>
            
            <Text style={styles.logoText}>BibleStudy</Text>
            
            <Text style={styles.tagline}>
              The easiest and most relatable way to learn about the Bible
            </Text>
          </MotiView>

          <View style={styles.footer}>
            <Pressable 
              style={styles.getStartedButton}
              onPress={() => router.push('/onboarding/intro')}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </Pressable>
            <Pressable 
              style={styles.signInButton}
              onPress={() => setShowSignInSheet(true)}
            >
              <View style={styles.googleBadge}>
                <Text style={styles.googleBadgeText}>G</Text>
              </View>
              <Text style={styles.signInText}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <Modal visible={showSignInSheet} transparent animationType="slide" onRequestClose={() => setShowSignInSheet(false)}>
        <Pressable style={styles.sheetBackdrop} onPress={() => setShowSignInSheet(false)} />
        <View style={styles.sheetContainer}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>Sign in to continue</Text>
          <Pressable style={styles.sheetButton} onPress={() => router.push('/signup')}>
            <View style={styles.googleBadge}>
              <Text style={styles.googleBadgeText}>G</Text>
            </View>
            <Text style={styles.sheetButtonText}>Sign in with Google</Text>
          </Pressable>
          <Pressable style={styles.sheetSecondary} onPress={() => setShowSignInSheet(false)}>
            <Text style={styles.sheetSecondaryText}>Maybe later</Text>
          </Pressable>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  logoEmoji: {
    fontSize: 110,
  },
  logoText: {
    color: 'white',
    fontSize: 50,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 7,
  },
  tagline: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
    lineHeight: 30,
    maxWidth: 320,
    paddingHorizontal: Spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  footer: {
    width: '100%',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  getStartedButton: {
    backgroundColor: '#234274',
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'System',
  },
  signInButton: {
    height: 60,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d3a66',
    flexDirection: 'row',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  googleBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  googleBadgeText: {
    color: '#234274',
    fontWeight: '800',
  },
  signInText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'System',
  },
  sheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#ddd',
    marginBottom: Spacing.sm,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  sheetButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#1d3a66',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  sheetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  sheetSecondary: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  sheetSecondaryText: {
    color: '#555',
    fontSize: 15,
    fontWeight: '600',
  },
});
