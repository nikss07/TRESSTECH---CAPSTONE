import { SymbolView } from 'expo-symbols';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import {
  BorderRadii,
  FontWeights,
  IconSizes,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CarouselItem = {
  id: string;
  source: ImageSourcePropType;
  title: string;
  subtitle: string;
  badge: string;
};

export const CLINICAL_SLIDES: CarouselItem[] = [
  {
    id: 'slide-1',
    source: require('@/assets/images/landingpagecarousel1.png'),
    title: 'Trichologist Follicle Analysis',
    subtitle: 'Direct microscopic assessment of scalp and hair shaft density.',
    badge: 'Validated by Experts',
  },
  {
    id: 'slide-2',
    source: require('@/assets/images/landingpagecarousel2.png'),
    title: 'AI Cuticle & Damage Scanning',
    subtitle: 'Neural network diagnostics classify condition and porous cuticle layers.',
    badge: 'AI Diagnostic Model',
  },
  {
    id: 'slide-3',
    source: require('@/assets/images/landingpagecarousel3.png'),
    title: 'Chemical Safety Formulation',
    subtitle: 'Custom treatment thresholds prevent chemical processing damage.',
    badge: 'Safety Certified',
  },
];

export type ClinicalCarouselProps = {
  items?: CarouselItem[];
  intervalMs?: number; // defaults to 10000 (10 seconds)
};

export function ClinicalCarousel({
  items = CLINICAL_SLIDES,
  intervalMs = 10000,
}: ClinicalCarouselProps) {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance every 10 seconds (or custom intervalMs)
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);
  }, [items.length, intervalMs]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [resetTimer]);

  const handleSelectIndex = (index: number) => {
    setActiveIndex(index);
    resetTimer();
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
    resetTimer();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    resetTimer();
  };

  const currentItem = items[activeIndex];

  return (
    <View style={styles.carouselRoot}>
      {/* Visual Image Container */}
      <View style={styles.imageCard}>
        <Image
          source={currentItem.source}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Top-Right Verified Badge */}
        <View
          style={[styles.verifiedBadge, { backgroundColor: theme.secondary }]}>
          <SymbolView
            name={{
              ios: 'checkmark',
              android: 'check',
              web: 'check',
            }}
            size={IconSizes.xs}
            weight="bold"
            tintColor="#EDE4D6"
          />
        </View>

        {/* Floating Slide Badge / Caption Overlay */}
        <View style={styles.captionOverlay}>
          <View style={[styles.badgePill, { backgroundColor: theme.secondary }]}>
            <ThemedText style={styles.badgeText}>{currentItem.badge}</ThemedText>
          </View>
          <ThemedText style={styles.overlayTitle}>{currentItem.title}</ThemedText>
        </View>

        {/* Left Arrow Button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Previous Slide"
          onPress={handlePrev}
          style={[styles.navArrow, styles.leftArrow]}>
          <SymbolView
            name={{
              ios: 'chevron.left',
              android: 'chevron_left',
              web: 'chevron_left',
            }}
            size={IconSizes.sm}
            weight="bold"
            tintColor="#FFFFFF"
          />
        </Pressable>

        {/* Right Arrow Button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Next Slide"
          onPress={handleNext}
          style={[styles.navArrow, styles.rightArrow]}>
          <SymbolView
            name={{
              ios: 'chevron.right',
              android: 'chevron_right',
              web: 'chevron_right',
            }}
            size={IconSizes.sm}
            weight="bold"
            tintColor="#FFFFFF"
          />
        </Pressable>
      </View>

      {/* Pagination Indicators (Changes every 10 seconds) */}
      <View style={styles.paginationRow}>
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={`Go to slide ${index + 1}`}
              onPress={() => handleSelectIndex(index)}
              style={[
                styles.dot,
                isActive
                  ? [styles.activeDot, { backgroundColor: theme.primary }]
                  : [styles.inactiveDot, { backgroundColor: theme.border }],
              ]}
            />
          );
        })}
      </View>

      {/* Contextual Description of Current Slide */}
      <ThemedText style={styles.subtext}>{currentItem.subtitle}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselRoot: {
    width: '100%',
    gap: Spacing.three,
  },
  imageCard: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: BorderRadii.lg,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F3D3A',
    ...(Shadows.md as object),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  verifiedBadge: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.two,
    width: 26,
    height: 26,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    ...(Shadows.sm as object),
  },
  captionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    backgroundColor: 'rgba(15, 61, 58, 0.72)',
    gap: Spacing.half,
  },
  badgePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: BorderRadii.pill,
    borderWidth: 1,
    borderColor: '#CC9F4D',
  },
  badgeText: {
    color: '#CC9F4D',
    fontSize: 10,
    fontWeight: FontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  overlayTitle: {
    color: '#FFFFFF',
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.bold,
  },
  navArrow: {
    position: 'absolute',
    top: '40%',
    width: 32,
    height: 32,
    borderRadius: BorderRadii.full,
    backgroundColor: 'rgba(15, 61, 58, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  leftArrow: {
    left: Spacing.two,
  },
  rightArrow: {
    right: Spacing.two,
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  dot: {
    height: 8,
    borderRadius: BorderRadii.full,
  },
  activeDot: {
    width: 24,
  },
  inactiveDot: {
    width: 8,
  },
  subtext: {
    color: '#4A625E',
    fontSize: Typography.small.fontSize,
    lineHeight: 18,
    textAlign: 'center',
  },
});
