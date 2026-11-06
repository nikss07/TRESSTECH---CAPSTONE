import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import {
  BorderRadii,
  BrandColors,
  FontWeights,
  MaxContentWidth,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type HeroSectionProps = {
  onGetStartedPress?: () => void;
  onFeaturesPress?: () => void;
};

export function HeroSection({
  onGetStartedPress,
  onFeaturesPress,
}: HeroSectionProps) {
  const theme = useTheme();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const isWeb = Platform.OS === 'web';
  const headerHeight = Platform.select({ ios: 70, android: 68, default: 64 });
  const heroMinHeight = isWeb
    ? undefined
    : Math.min(Math.max(windowHeight - headerHeight, 580), 840);

  const isCompactPhone = !isWeb && (windowWidth < 380 || windowHeight < 700);

  // Smooth cascading load animations on landing page load
  const [overlineAnim] = useState(() => new Animated.Value(0));
  const [imageAnim] = useState(() => new Animated.Value(0));
  const [titleAnim] = useState(() => new Animated.Value(0));
  const [descAnim] = useState(() => new Animated.Value(0));
  const [buttonsAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.stagger(90, [
      Animated.timing(overlineAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(imageAnim, {
        toValue: 1,
        duration: 520,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 440,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(descAnim, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(buttonsAnim, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  }, [buttonsAnim, descAnim, imageAnim, overlineAnim, titleAnim]);

  const heroContent = (
    <View style={styles.heroContent}>
      {/* Main Content Group */}
      <View style={styles.mainGroup}>
        <Animated.View
          style={{
            opacity: overlineAnim,
            transform: [
              {
                translateY: overlineAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-8, 0],
                }),
              },
            ],
          }}>
          <ThemedText style={styles.overline}>
            AI-POWERED HAIR ANALYSIS
          </ThemedText>
        </Animated.View>

        {/* 4-Hair-Types Banner: 100% full width matching Clinical Credibility */}
        <Animated.View
          style={[
            styles.imageCardContainer,
            {
              opacity: imageAnim,
              transform: [
                {
                  scale: imageAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  }),
                },
                {
                  translateY: imageAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [14, 0],
                  }),
                },
              ],
            },
          ]}>
          <Image
            source={require('@/assets/images/hero-hair-types.png')}
            style={styles.heroImage}
            contentFit="cover"
            contentPosition="center"
            transition={200}
          />
        </Animated.View>

        {/* Headline - Right below the image */}
        <Animated.View
          style={{
            opacity: titleAnim,
            transform: [
              {
                translateY: titleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [14, 0],
                }),
              },
            ],
          }}>
          <ThemedText
            style={[
              styles.heroTitle,
              isCompactPhone && styles.heroTitleCompact,
            ]}>
            Hair Analysis for{'\n'}Safer Salon{'\n'}Treatments.
          </ThemedText>
        </Animated.View>

        {/* Subtitle Description */}
        <Animated.View
          style={{
            opacity: descAnim,
            transform: [
              {
                translateY: descAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0],
                }),
              },
            ],
          }}>
          <ThemedText
            style={[
              styles.heroDescription,
              isCompactPhone && styles.heroDescriptionCompact,
            ]}>
            Upload a photo and get AI-powered safety recommendations based on
            trichologist-validated chemical treatment insights.
          </ThemedText>
        </Animated.View>
      </View>

      {/* Bottom Group: CTA Buttons */}
      <Animated.View
        style={[
          styles.buttonRow,
          {
            opacity: buttonsAnim,
            transform: [
              {
                translateY: buttonsAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 0],
                }),
              },
            ],
          },
        ]}>
        <Button
          title="Get Started"
          size="lg"
          variant="primary"
          style={styles.primaryCta}
          textStyle={styles.primaryCtaText}
          onPress={onGetStartedPress}
        />
        <Button
          title="Features"
          size="lg"
          variant="outline"
          style={[styles.secondaryCta, { borderColor: theme.borderFocus }]}
          textStyle={styles.secondaryCtaText}
          onPress={onFeaturesPress}
        />
      </Animated.View>
    </View>
  );

  if (isWeb) {
    return (
      <View style={[styles.heroBackground, styles.heroBackgroundWeb]}>
        {heroContent}
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('@/assets/images/landingpage.png')}
      style={[
        styles.heroBackground,
        heroMinHeight !== undefined && { minHeight: heroMinHeight },
      ]}
      resizeMode="cover">
      {heroContent}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  heroBackground: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: BrandColors.howItWorksBg,
    paddingTop: Platform.select({ ios: Spacing.four, default: Spacing.four }),
    paddingBottom: Platform.select({
      ios: Spacing.seven,
      android: Spacing.six,
      default: Spacing.five,
    }),
  },
  heroBackgroundWeb: {
    minHeight: 'calc(100vh - 64px)',
    justifyContent: 'center', // Centered vertically in viewport on web
    backgroundImage:
      'linear-gradient(180deg, #154744 0%, #103e3b 35%, #235551 50%, #466c66 65%, #768f88 78%, #abbbb4 88%, #d9ded9 95%, #f2ece1 100%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    paddingTop: Spacing.five,
    paddingBottom: Spacing.six,
  },
  heroContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    ...Platform.select({
      web: {
        justifyContent: 'flex-start',
      },
      default: {
        flex: 1,
        justifyContent: 'space-between',
      },
    }),
  },
  mainGroup: {
    width: '100%',
    ...Platform.select({
      web: {
        justifyContent: 'flex-start',
      },
      default: {
        flex: 1,
        justifyContent: 'center',
      },
    }),
  },
  overline: {
    color: '#E5BD78', // Warm gold tone from theme.primaryLight for high contrast on green
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: Spacing.two,
  },
  imageCardContainer: {
    width: '100%',
    aspectRatio: 16 / 9, // Same width and 16:9 ratio as Clinical Carousel image card
    borderRadius: BorderRadii.lg,
    overflow: 'hidden',
    backgroundColor: '#0F3D3A',
    marginBottom: Spacing.three,
    ...(Shadows.md as object),
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.two,
    ...Platform.select({
      web: {
        fontSize: 38,
        lineHeight: 46,
        letterSpacing: -0.5,
      },
      default: {
        fontSize: 29,
        lineHeight: 36,
      },
    }),
  },
  heroTitleCompact: {
    fontSize: 25,
    lineHeight: 32,
  },
  heroDescription: {
    color: 'rgba(237, 228, 214, 0.95)', // Crisp soft linen ivory
    fontWeight: FontWeights.regular,
    ...Platform.select({
      web: {
        fontSize: 17.5,
        lineHeight: 25,
      },
      default: {
        fontSize: 16,
        lineHeight: 22,
      },
    }),
  },
  heroDescriptionCompact: {
    fontSize: 14.5,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    ...Platform.select({
      web: {
        marginTop: Spacing.four,
      },
      default: {
        marginTop: Spacing.three,
        marginBottom: Spacing.three, // Moves buttons comfortably up from screen bottom on mobile
      },
    }),
  },
  primaryCta: {
    flex: 2, // ~2x wider than Features button matching prototype measurements
    borderRadius: BorderRadii.pill,
    height: 50,
  },
  primaryCtaText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  secondaryCta: {
    flex: 1,
    borderRadius: BorderRadii.pill,
    height: 50,
    backgroundColor: 'rgba(237, 228, 214, 0.35)',
  },
  secondaryCtaText: {
    color: '#0F3D3A',
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
});
