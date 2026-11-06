import { SymbolView } from 'expo-symbols';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import { ClinicalCarousel } from '@/components/clinical-carousel';
import { ThemedText } from '@/components/themed-text';
import {
  BorderRadii,
  FontWeights,
  IconSizes,
  MaxContentWidth,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';

export type ClinicalSectionProps = {
  visible?: boolean;
};

export function ClinicalSection({ visible = true }: ClinicalSectionProps) {
  const [carouselAnim] = useState(() => new Animated.Value(0));
  const [textAnim] = useState(() => new Animated.Value(0));
  const [badgesAnim] = useState(() => new Animated.Value(0));
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (visible && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      Animated.stagger(130, [
        Animated.timing(carouselAnim, {
          toValue: 1,
          duration: 480,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(textAnim, {
          toValue: 1,
          duration: 440,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(badgesAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    }
  }, [badgesAnim, carouselAnim, textAnim, visible]);

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionContent}>
        {/* Animated Clinical Carousel */}
        <Animated.View
          style={{
            opacity: carouselAnim,
            transform: [
              {
                scale: carouselAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.96, 1],
                }),
              },
              {
                translateY: carouselAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          }}>
          <ClinicalCarousel intervalMs={10000} />
        </Animated.View>

        {/* Animated Headline & Description */}
        <Animated.View
          style={{
            opacity: textAnim,
            transform: [
              {
                translateY: textAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [16, 0],
                }),
              },
            ],
          }}>
          <ThemedText style={styles.headline}>
            Clinical Credibility, Validated by Experts.
          </ThemedText>
          <ThemedText style={styles.description}>
            TressTech&apos;s classification criteria and chemical safety thresholds are rigorously
            validated by licensed trichologists, ensuring safer analysis beyond typical apps.
          </ThemedText>
        </Animated.View>

        {/* Animated Badges Row */}
        <Animated.View
          style={[
            styles.badgesRow,
            {
              opacity: badgesAnim,
              transform: [
                {
                  scale: badgesAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
            },
          ]}>
          <View style={styles.badgeBox}>
            <SymbolView
              name={{
                ios: 'shield.checkerboard',
                android: 'security',
                web: 'security',
              }}
              size={IconSizes.md}
              tintColor="#0F3D3A"
            />
          </View>

          <View style={styles.badgeBox}>
            <SymbolView
              name={{
                ios: 'lock.fill',
                android: 'lock',
                web: 'lock',
              }}
              size={IconSizes.md}
              tintColor="#0F3D3A"
            />
          </View>

          <View style={styles.badgeBox}>
            <SymbolView
              name={{
                ios: 'checkmark.seal.fill',
                android: 'verified',
                web: 'verified',
              }}
              size={IconSizes.md}
              tintColor="#0F3D3A"
            />
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Pure white background matching the storyboard prototype
    paddingVertical: Spacing.five,
  },
  sectionContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  headline: {
    color: '#0F3D3A',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: FontWeights.bold,
    marginTop: Spacing.two,
  },
  description: {
    color: '#4A625E',
    fontSize: Typography.small.fontSize,
    lineHeight: 20,
    fontWeight: FontWeights.regular,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  badgeBox: {
    width: 42,
    height: 42,
    borderRadius: BorderRadii.md,
    backgroundColor: '#FAF5EE',
    borderWidth: 1,
    borderColor: '#E6DCCA',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Shadows.sm as object),
  },
});
