import { StyleSheet, View, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import {
  BorderRadii,
  FontWeights,
  Shadows,
  Spacing,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type StatCardVariant = 'default' | 'highlight';

export type StatCardProps = {
  value: string | number;
  label: string;
  variant?: StatCardVariant;
  style?: ViewStyle;
};

export function StatCard({
  value,
  label,
  variant = 'default',
  style,
}: StatCardProps) {
  const theme = useTheme();

  const valueColor = variant === 'highlight' ? theme.primary : theme.text;

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.surface,
          borderColor: theme.borderSubtle,
        },
        style,
      ]}>
      <ThemedText style={[styles.valueText, { color: valueColor }]}>
        {value}
      </ThemedText>
      <ThemedText
        style={[styles.labelText, { color: theme.textSecondary }]}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    minHeight: 96,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: BorderRadii.xl,
    borderWidth: 1,
    gap: Spacing.half,
    ...(Shadows.sm as object),
  },
  valueText: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: FontWeights.bold,
  },
  labelText: {
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: FontWeights.medium,
  },
});
