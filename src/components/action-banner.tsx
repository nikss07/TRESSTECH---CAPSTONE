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

export type ActionBannerProps = {
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export function ActionBanner({
  title,
  subtitle,
  onPress,
}: ActionBannerProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.bannerContainer,
        {
          backgroundColor: theme.secondary,
        },
        pressed && styles.pressed,
      ]}>
      {/* Plus Icon Circle */}
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: theme.primary },
        ]}>
        <SymbolView
          name={{
            ios: 'plus',
            android: 'add',
            web: 'add',
          }}
          size={IconSizes.sm}
          weight="bold"
          tintColor={theme.secondary}
        />
      </View>

      {/* Text Block */}
      <View style={styles.textContainer}>
        <ThemedText style={[styles.titleText, { color: theme.secondaryText }]}>
          {title}
        </ThemedText>
        <ThemedText style={[styles.subtitleText, { color: theme.primaryLight }]}>
          {subtitle}
        </ThemedText>
      </View>

      {/* Right Arrow Icon */}
      <View style={styles.arrowContainer}>
        <SymbolView
          name={{
            ios: 'arrow.right',
            android: 'arrow_forward',
            web: 'arrow_forward',
          }}
          size={IconSizes.sm}
          weight="bold"
          tintColor={theme.secondaryText}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    borderRadius: BorderRadii.xl,
    gap: Spacing.three,
    ...(Shadows.md as object),
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  titleText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  subtitleText: {
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.regular,
  },
  arrowContainer: {
    paddingLeft: Spacing.one,
  },
});
