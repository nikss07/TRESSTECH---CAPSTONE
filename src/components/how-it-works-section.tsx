import { StyleSheet, View } from 'react-native';

import { StepCard } from '@/components/step-card';
import { ThemedText } from '@/components/themed-text';
import {
  FontWeights,
  MaxContentWidth,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function HowItWorksSection() {
  const theme = useTheme();

  const steps = [
    {
      stepNumber: 1,
      title: 'Upload Photo',
      description: "Simply snap or upload a close-up photo of your client's hair.",
    },
    {
      stepNumber: 2,
      title: 'AI Analysis',
      description: 'Our trained CNN model classifies hair condition, damage, and type.',
    },
    {
      stepNumber: 3,
      title: 'Get Recommendations',
      description: 'Receive a report with chemical treatment safety guidance.',
    },
  ];

  return (
    <View style={[styles.sectionContainer, { backgroundColor: theme.howItWorksBackground }]}>
      <View style={styles.sectionContent}>
        {/* Section Header */}
        <View style={styles.headerBlock}>
          <ThemedText style={[styles.overline, { color: theme.primary }]}>
            HOW IT WORKS
          </ThemedText>
          <ThemedText style={styles.sectionHeading}>
            Understand your hair in three steps
          </ThemedText>
        </View>

        {/* Step Cards Stack */}
        <View style={styles.cardsStack}>
          {steps.map((step) => (
            <StepCard
              key={step.stepNumber}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: Spacing.five,
    paddingBottom: Spacing.four,
  },
  sectionContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  headerBlock: {
    gap: Spacing.one,
  },
  overline: {
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  sectionHeading: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: FontWeights.bold,
  },
  cardsStack: {
    width: '100%',
    gap: Spacing.three,
  },
});
