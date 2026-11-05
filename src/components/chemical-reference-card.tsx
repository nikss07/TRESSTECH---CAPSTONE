import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import {
  BorderRadii,
  FontWeights,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ChemicalReferenceCardProps = {
  strength: string;
  liftLevel: string;
  usage: string;
};

export function ChemicalReferenceCard({
  strength,
  liftLevel,
  usage,
}: ChemicalReferenceCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.card,
          borderColor: theme.borderSubtle,
        },
      ]}>
      {/* Top Header Row */}
      <View style={styles.topRow}>
        <ThemedText style={[styles.strengthText, { color: theme.text }]}>
          {strength}
        </ThemedText>
        <ThemedText
          style={[styles.liftText, { color: theme.primaryDark }]}>
          {liftLevel}
        </ThemedText>
      </View>

      {/* Usage Description */}
      <ThemedText style={[styles.usageText, { color: theme.textMuted }]}>
        {usage}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    padding: Spacing.four,
    borderRadius: BorderRadii.xl,
    borderWidth: 1,
    gap: Spacing.two,
    ...(Shadows.sm as object),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  strengthText: {
    fontSize: Typography.subtitle.fontSize,
    fontWeight: FontWeights.bold,
  },
  liftText: {
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.medium,
    textAlign: 'right',
    maxWidth: 160,
  },
  usageText: {
    fontSize: Typography.small.fontSize,
    lineHeight: 18,
  },
});
