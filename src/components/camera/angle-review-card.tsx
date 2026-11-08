import { SymbolView } from 'expo-symbols';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { type HairAngleKey } from '@/components/camera/capture-angle-indicator';
import { ThemedText } from '@/components/themed-text';
import {
  BorderRadii,
  FontWeights,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AngleReviewCardProps = {
  stepNumber: number;
  angleKey: HairAngleKey;
  angleLabel: string;
  guidance: string;
  photoUri?: string;
  onRecapture: () => void;
};

export function AngleReviewCard({
  stepNumber,
  angleLabel,
  guidance,
  photoUri,
  onRecapture,
}: AngleReviewCardProps) {
  const theme = useTheme();

  // Helper to determine image source
  const renderThumbnail = () => {
    if (photoUri && (photoUri.startsWith('file:') || photoUri.startsWith('http') || photoUri.startsWith('blob:') || photoUri.startsWith('data:'))) {
      return (
        <Image
          source={{ uri: photoUri }}
          style={styles.thumbnailImage}
          resizeMode="cover"
        />
      );
    }

    // Default sample trichology thumbnail
    return (
      <Image
        source={require('@/assets/images/landingpageimage.jpg')}
        style={styles.thumbnailImage}
        resizeMode="cover"
      />
    );
  };

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.card,
          borderColor: theme.borderSubtle,
        },
      ]}>
      {/* Thumbnail with step badge */}
      <View style={styles.thumbnailWrapper}>
        {renderThumbnail()}
        <View style={[styles.stepBadge, { backgroundColor: theme.secondary }]}>
          <ThemedText style={[styles.stepBadgeText, { color: theme.secondaryText }]}>
            {stepNumber}
          </ThemedText>
        </View>
      </View>

      {/* Info Block */}
      <View style={styles.infoBlock}>
        <ThemedText style={[styles.title, { color: theme.text }]}>
          {angleLabel}
        </ThemedText>

        <View style={styles.statusRow}>
          <SymbolView
            name={{
              ios: 'checkmark.circle.fill',
              android: 'check_circle',
              web: 'check_circle',
            }}
            size={14}
            weight="bold"
            tintColor={theme.success}
          />
          <ThemedText style={[styles.statusText, { color: theme.success }]}>
            Sharp & verified
          </ThemedText>
        </View>

        <ThemedText
          style={[styles.guidanceText, { color: theme.textMuted }]}
          numberOfLines={1}>
          {guidance}
        </ThemedText>
      </View>

      {/* Recapture Action Button */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Recapture ${angleLabel}`}
        onPress={onRecapture}
        style={({ pressed }) => [
          styles.recaptureButton,
          {
            borderColor: theme.secondary,
            backgroundColor: pressed ? theme.backgroundElement : 'transparent',
          },
          pressed && styles.pressed,
        ]}>
        <SymbolView
          name={{
            ios: 'camera.fill',
            android: 'photo_camera',
            web: 'photo_camera',
          }}
          size={14}
          tintColor={theme.secondary}
        />
        <ThemedText style={[styles.recaptureText, { color: theme.secondary }]}>
          Retake
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: BorderRadii.xl,
    borderWidth: 1,
    gap: Spacing.three,
    ...(Shadows.sm as object),
  },
  thumbnailWrapper: {
    position: 'relative',
  },
  thumbnailImage: {
    width: 64,
    height: 64,
    borderRadius: BorderRadii.lg,
    backgroundColor: '#EBE2D5',
  },
  stepBadge: {
    position: 'absolute',
    top: -4,
    left: -4,
    width: 20,
    height: 20,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: {
    fontSize: 10,
    fontWeight: FontWeights.bold,
  },
  infoBlock: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.semiBold,
  },
  guidanceText: {
    fontSize: 12,
    lineHeight: 16,
  },
  recaptureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.three,
    paddingVertical: 8,
    borderRadius: BorderRadii.pill,
    borderWidth: 1.5,
  },
  pressed: {
    opacity: 0.8,
  },
  recaptureText: {
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.bold,
  },
});
