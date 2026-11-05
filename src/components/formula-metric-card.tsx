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

export type FormulaMetricCardProps = {
  label: string;
  value: string;
};

export function FormulaMetricCard({ label, value }: FormulaMetricCardProps) {
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
      <ThemedText style={[styles.label, { color: theme.primaryDark }]}>
        {label}
      </ThemedText>
      <ThemedText style={[styles.value, { color: theme.text }]}>
        {value}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    borderRadius: BorderRadii.lg,
    borderWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 4,
    minHeight: 84,
    ...(Shadows.sm as object),
  },
  label: {
    fontSize: 11,
    fontWeight: FontWeights.medium,
    lineHeight: 14,
  },
  value: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
});
