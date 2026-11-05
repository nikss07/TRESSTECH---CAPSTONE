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

export type ClientHistoryItemProps = {
  date: string;
  condition: string;
  porosity: string;
  score: string;
  onPress?: () => void;
};

export function ClientHistoryItem({
  date,
  condition,
  porosity,
  score,
  onPress,
}: ClientHistoryItemProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`History record: ${date} ${condition}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.borderSubtle,
        },
        pressed && styles.pressed,
      ]}>
      <View style={styles.textContainer}>
        <ThemedText style={[styles.title, { color: theme.text }]}>
          {date} · {condition}
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: theme.textMuted }]}>
          {porosity} · {score}
        </ThemedText>
      </View>

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
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: BorderRadii.xl,
    borderWidth: 1,
    justifyContent: 'space-between',
    ...(Shadows.sm as object),
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.995 }],
  },
  textContainer: {
    gap: 4,
  },
  title: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  subtitle: {
    fontSize: Typography.small.fontSize,
  },
});
