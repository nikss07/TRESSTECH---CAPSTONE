import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import { StepCard } from '@/components/step-card';
import { ThemedText } from '@/components/themed-text';
import {
  BrandColors,
  FontWeights,
  MaxContentWidth,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type HowItWorksSectionProps = {
  visible?: boolean;
};

export function HowItWorksSection({ visible = true }: HowItWorksSectionProps) {
  const theme = useTheme();

  const [headerAnim] = useState(() => new Animated.Value(0));
  const [step1Anim] = useState(() => new Animated.Value(0));
  const [step2Anim] = useState(() => new Animated.Value(0));
  const [step3Anim] = useState(() => new Animated.Value(0));
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (visible && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      Animated.stagger(120, [
        Animated.timing(headerAnim, {
          toValue: 1,
          duration: 440,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(step1Anim, {
          toValue: 1,
          duration: 440,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(step2Anim, {
          toValue: 1,
          duration: 440,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(step3Anim, {
          toValue: 1,
          duration: 440,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    }
  }, [headerAnim, step1Anim, step2Anim, step3Anim, visible]);

  const steps = [
    {
      stepNumber: 1,
      title: 'Upload Photo',
      description: "Simply snap or upload a close-up photo of your client's hair.",
      anim: step1Anim,
    },
    {
      stepNumber: 2,
      title: 'AI Analysis',
      description: 'Our trained CNN model classifies hair condition, damage, and type.',
      anim: step2Anim,
    },
    {
      stepNumber: 3,
      title: 'Get Recommendations',
      description: 'Receive a report with chemical treatment safety guidance.',
      anim: step3Anim,
    },
  ];

  return (
    <View style={[styles.sectionContainer, { backgroundColor: BrandColors.howItWorksBg }]}>
      <View style={styles.sectionContent}>
        {/* Animated Section Header */}
        <Animated.View
          style={[
            styles.headerBlock,
            {
              opacity: headerAnim,
              transform: [
                {
                  translateY: headerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 0],
                  }),
                },
              ],
            },
          ]}>
          <ThemedText style={[styles.overline, { color: theme.primary }]}>
            HOW IT WORKS
          </ThemedText>
          <ThemedText style={[styles.sectionHeading, { color: BrandColors.solid }]}>
            Understand your hair in three steps
          </ThemedText>
        </Animated.View>

        {/* Animated Step Cards Stack */}
        <View style={styles.cardsStack}>
          {steps.map((step) => (
            <Animated.View
              key={step.stepNumber}
              style={{
                opacity: step.anim,
                transform: [
                  {
                    translateY: step.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [24, 0],
                    }),
                  },
                ],
              }}>
              <StepCard
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
              />
            </Animated.View>
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
    marginTop: -1, // Seamlessly overlaps to eliminate any subpixel gap
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
