import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { OnboardingLayout } from '../../components/OnboardingLayout';
import { Fonts, Spacing } from '../../constants/Theme';

export default function PaywallScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');

  return (
    <OnboardingLayout 
      backgroundImage={require('../../assets/images/sky-bg.png')}
      onBack={() => router.back()}
    >
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>BibleStudy Premium</Text>
        
        <View style={styles.benefitsContainer}>
          <BenefitItem text="Unlock all bible stories" />
          <BenefitItem text="Unlock all bible characters" />
          <BenefitItem text="Talk to BibleStudy" />
          <BenefitItem text="No ads" />
        </View>

        <View style={styles.plansContainer}>
          <Pressable 
            onPress={() => setSelectedPlan('annual')}
            style={[styles.planCard, selectedPlan === 'annual' && styles.selectedPlan]}
          >
            <View style={styles.planInfo}>
              <Text style={styles.planTitle}>Annual</Text>
              <Text style={styles.planPrice}>$59.99/yr ($4.99/mo)</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Best Value</Text>
            </View>
          </Pressable>

          <Pressable 
            onPress={() => setSelectedPlan('monthly')}
            style={[styles.planCard, selectedPlan === 'monthly' && styles.selectedPlan]}
          >
            <View style={styles.planInfo}>
              <Text style={styles.planTitle}>Monthly</Text>
              <Text style={styles.planPrice}>$9.99/mo</Text>
            </View>
          </Pressable>
        </View>

        <Button 
          onPress={() => router.push('/(tabs)')}
          style={styles.trialButton}
        >
          Start 7-day Free Trial
        </Button>

        <View style={styles.footer}>
          <Pressable><Text style={styles.footerLink}>Restore Purchase</Text></Pressable>
          <View style={styles.footerDivider} />
          <Pressable><Text style={styles.footerLink}>Terms of Service</Text></Pressable>
          <View style={styles.footerDivider} />
          <Pressable><Text style={styles.footerLink}>Privacy Policy</Text></Pressable>
        </View>
      </ScrollView>
    </OnboardingLayout>
  );
}

const BenefitItem: React.FC<{ text: string }> = ({ text }) => (
  <View style={styles.benefitItem}>
    <View style={styles.checkCircle}>
      <Check size={16} color="white" />
    </View>
    <Text style={styles.benefitText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    gap: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  benefitsContainer: {
    width: '100%',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitText: {
    color: 'white',
    fontSize: 18,
    fontFamily: Fonts.sans,
  },
  plansContainer: {
    width: '100%',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  planCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    width: '100%',
  },
  selectedPlan: {
    backgroundColor: 'white',
    borderColor: '#fff',
    borderWidth: 2,
  },
  planInfo: {
    gap: 4,
  },
  planTitle: {
    color: '#111',
    fontSize: 20,
    fontWeight: '700',
  },
  planPrice: {
    color: '#333',
    fontSize: 14,
    opacity: 0.9,
  },
  badge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  trialButton: {
    backgroundColor: '#7A3E00',
    height: 60,
    borderRadius: 20,
    width: '90%',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: Spacing.lg,
  },
  footerLink: {
    color: 'white',
    fontSize: 12,
    opacity: 0.6,
  },
  footerDivider: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});
