import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { OnboardingLayout } from '../../components/OnboardingLayout';
import { Spacing } from '../../constants/Theme';

const QUESTIONS = {
  '1': {
    question: "How much of the Bible have you read?",
    options: ["None of it", "I know some stories", "Most of it", "Every page!"],
    next: '/onboarding/feedback?id=1',
  },
  '2': {
    question: "What brings you to BibleStudy?",
    options: [
      "Learn more about the Bible", 
      "Get inspired again", 
      "Get biblical advice", 
      "Break down scripture", 
      "Understand the Bible in a new lens", 
      "Grow my faith"
    ],
    next: '/onboarding/feedback?id=2',
  }
};

export default function QuestionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  // Changed to array for multiselect
  const [selected, setSelected] = useState<string[]>([]);

  const currentQuestion = QUESTIONS[id as keyof typeof QUESTIONS] || QUESTIONS['1'];

  const toggleSelection = (option: string) => {
    if (selected.includes(option)) {
      setSelected(selected.filter(item => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  return (
    <OnboardingLayout 
      backgroundImage={require('../../assets/images/beach-bg.png')}
      onBack={() => router.back()}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.progressText}>Question {id} of 2</Text>
        
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <Pressable
                key={option}
                onPress={() => toggleSelection(option)}
              >
                <BlurView 
                  intensity={isSelected ? 100 : 30} 
                  tint="light" 
                  style={[
                    styles.optionBlur,
                    isSelected && styles.selectedOption
                  ]}
                >
                  <Text style={[
                    styles.optionText,
                    isSelected && styles.selectedOptionText
                  ]}>
                    {option}
                  </Text>
                </BlurView>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable 
          style={[styles.continueButton, { opacity: selected.length > 0 ? 1 : 0.5 }]}
          onPress={() => selected.length > 0 && router.push(currentQuestion.next as any)}
          disabled={selected.length === 0}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingTop: Spacing.sm,
    gap: Spacing.md,
  },
  progressText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  questionText: {
    fontSize: 30,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'white',
    marginBottom: Spacing.sm,
    lineHeight: 38,
  },
  optionsContainer: {
    gap: Spacing.sm,
  },
  optionBlur: {
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    minHeight: 50,
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedOption: {
    backgroundColor: 'white',
    borderWidth: 0,
  },
  selectedOptionText: {
    color: 'black',
    fontWeight: '700',
  },
  footer: {
    width: '100%',
    paddingVertical: Spacing.md,
  },
  continueButton: {
    backgroundColor: '#7A3E00',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
