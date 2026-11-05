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

export type ReportCardProps = {
  clientName: string;
  date: string;
  condition: string;
  porosity: string;
  verdict: string;
  thumbnailColor?: string;
  onPress?: () => void;
};

export function ReportCard({
  clientName,
  date,
  condition,
  porosity,
  verdict,
  thumbnailColor = '#D1A563',
  onPress,
}: ReportCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View report for ${clientName}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.cardContainer,
        {
          backgroundColor: theme.card,
          borderColor: theme.borderSubtle,
        },
        pressed && styles.pressed,
      ]}>
      {/* Visual Thumbnail */}
      <View style={[styles.thumbnail, { backgroundColor: thumbnailColor }]} />

      {/* Info Block */}
      <View style={styles.infoBlock}>
        <ThemedText style={[styles.title, { color: theme.text }]}>
          {clientName} · {date}
        </ThemedText>
        <ThemedText style={[styles.details, { color: theme.textSecondary }]}>
          {condition} · {porosity}
        </ThemedText>
        <ThemedText style={[styles.verdict, { color: theme.textSecondary }]}>
          {verdict}
        </ThemedText>
      </View>

      {/* Chevron Right */}
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.four,
    borderRadius: BorderRadii.xl,
    borderWidth: 1,
    gap: Spacing.three,
    ...(Shadows.sm as object),
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.995 }],
  },
  thumbnail: {
    width: 54,
    height: 54,
    borderRadius: BorderRadii.lg,
  },
  infoBlock: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  details: {
    fontSize: Typography.small.fontSize,
    lineHeight: 18,
  },
  verdict: {
    fontSize: Typography.small.fontSize,
    lineHeight: 18,
  },
});
