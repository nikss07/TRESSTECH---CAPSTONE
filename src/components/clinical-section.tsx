import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

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
import { useTheme } from '@/hooks/use-theme';

export function ClinicalSection() {
  const theme = useTheme();

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionContent}>
        {/* 10-Second Auto-Play Clinical Carousel with Indicators & Navigation */}
        <ClinicalCarousel intervalMs={10000} />

        {/* Section Heading */}
        <ThemedText style={styles.headline}>
          Clinical Credibility, Validated by Experts.
        </ThemedText>

        {/* Section Description */}
        <ThemedText style={styles.description}>
          TressTech&apos;s classification criteria and chemical safety thresholds are rigorously
          validated by licensed trichologists, ensuring safer analysis beyond typical apps.
        </ThemedText>

        {/* Trust & Certification Badges Row */}
        <View style={styles.badgesRow}>
          <View
            style={[
              styles.badgeBox,
              { borderColor: theme.border, backgroundColor: theme.surface },
            ]}>
            <SymbolView
              name={{
                ios: 'shield.checkerboard',
                android: 'security',
                web: 'security',
              }}
              size={IconSizes.md}
              tintColor={theme.secondary}
            />
          </View>

          <View
            style={[
              styles.badgeBox,
              { borderColor: theme.border, backgroundColor: theme.surface },
            ]}>
            <SymbolView
              name={{
                ios: 'lock.fill',
                android: 'lock',
                web: 'lock',
              }}
              size={IconSizes.md}
              tintColor={theme.secondary}
            />
          </View>

          <View
            style={[
              styles.badgeBox,
              { borderColor: theme.border, backgroundColor: theme.surface },
            ]}>
            <SymbolView
              name={{
                ios: 'checkmark.seal.fill',
                android: 'verified',
                web: 'verified',
              }}
              size={IconSizes.md}
              tintColor={theme.secondary}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: Spacing.five,
  },
  sectionContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  headline: {
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
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Shadows.sm as object),
  },
});
