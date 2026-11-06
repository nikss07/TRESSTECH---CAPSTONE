import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';

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

export type ClientListItemProps = {
  name: string;
  hairDetails?: string;
  details?: string;
  initial?: string;
  hasStatusDot?: boolean;
  badgeText?: string;
  onPress?: () => void;
};

export function ClientListItem({
  name,
  hairDetails,
  details,
  initial,
  hasStatusDot = false,
  badgeText,
  onPress,
}: ClientListItemProps) {
  const theme = useTheme();

  const displayInitial = initial ?? name.charAt(0).toUpperCase();
  const subline = details ?? hairDetails ?? '';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View client profile for ${name}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.itemContainer,
        {
          backgroundColor: theme.surface,
          borderColor: theme.borderSubtle,
        },
        pressed && styles.pressed,
      ]}>
      {/* Avatar Circle with Initial */}
      <View
        style={[
          styles.avatarCircle,
          { backgroundColor: theme.secondary },
        ]}>
        <ThemedText
          style={[styles.avatarInitial, { color: theme.secondaryText }]}>
          {displayInitial}
        </ThemedText>
      </View>

      {/* Client Information */}
      <View style={styles.infoContainer}>
        <ThemedText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.nameText, { color: theme.text }]}>
          {name}
        </ThemedText>
        {subline ? (
          <ThemedText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.detailsText, { color: theme.textSecondary }]}>
            {subline}
          </ThemedText>
        ) : null}
      </View>

      {/* Trailing Indicators */}
      <View style={styles.trailingContainer}>
        {badgeText ? (
          <ThemedText style={[styles.badgeText, { color: theme.primary }]}>
            {badgeText}
          </ThemedText>
        ) : null}

        {hasStatusDot && (
          <View
            style={[styles.statusDot, { backgroundColor: theme.primary }]}
          />
        )}

        <SymbolView
          name={{
            ios: 'chevron.right',
            android: 'chevron_right',
            web: 'chevron_right',
          }}
          size={IconSizes.sm}
          weight="bold"
          tintColor={theme.textMuted}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: BorderRadii.xl,
    borderWidth: 1,
    gap: Spacing.three,
    ...(Shadows.sm as object),
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.995 }],
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
  },
  infoContainer: {
    flex: 1,
    gap: 2,
  },
  nameText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  detailsText: {
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.regular,
  },
  trailingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexShrink: 0,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadii.full,
  },
});
