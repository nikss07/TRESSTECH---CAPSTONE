import { Image, ImageBackground, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import {
  BorderRadii,
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

  return (
    <ImageBackground
      source={require('@/assets/images/landingpage.png')}
      style={styles.heroBackground}
      resizeMode="cover">
      <View style={styles.heroContent}>
        {/* Overline Badge */}
        <ThemedText style={styles.overline}>
          AI-POWERED HAIR ANALYSIS
        </ThemedText>

        {/* Hero Visual Card: 4 Hair Types */}
        <View style={styles.imageCardContainer}>
          <Image
            source={require('@/assets/images/hero-hair-types.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Hero Headline */}
        <ThemedText style={styles.heroTitle}>
          Hair Analysis for{'\n'}Safer Salon{'\n'}Treatments.
        </ThemedText>

        {/* Hero Body Text */}
        <ThemedText style={styles.heroDescription}>
          Upload a photo and get AI-powered safety recommendations based on
          trichologist-validated chemical treatment insights.
        </ThemedText>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
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
            textStyle={{ color: theme.textSecondary }}
            onPress={onFeaturesPress}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  heroBackground: {
    width: '100%',
    alignItems: 'center',
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
  },
  heroContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  overline: {
    color: '#E5BD78', // Warm gold tone from theme.primaryLight for high contrast on green
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  imageCardContainer: {
    width: '100%',
    borderRadius: BorderRadii.lg,
    overflow: 'hidden',
    backgroundColor: '#0F3D3A',
    ...(Shadows.md as object),
  },
  heroImage: {
    width: '100%',
    aspectRatio: 678 / 424,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 38,
    fontWeight: FontWeights.bold,
    marginTop: Spacing.two,
  },
  heroDescription: {
    color: 'rgba(237, 228, 214, 0.9)', // Soft linen ivory
    fontSize: Typography.body.fontSize,
    lineHeight: 22,
    fontWeight: FontWeights.regular,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  primaryCta: {
    flex: 1.3,
    borderRadius: BorderRadii.pill,
    height: 48,
  },
  primaryCtaText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  secondaryCta: {
    flex: 1,
    borderRadius: BorderRadii.pill,
    height: 48,
    backgroundColor: 'rgba(237, 228, 214, 0.35)',
  },
});
