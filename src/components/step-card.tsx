import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadii, FontWeights, Shadows, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type StepCardProps = {
  stepNumber: number | string;
  title: string;
  description: string;
};

export function StepCard({ stepNumber, title, description }: StepCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}>
      {/* Number Badge */}
      <View
        style={[
          styles.badgeContainer,
          { backgroundColor: theme.secondary },
        ]}>
        <ThemedText style={styles.badgeText}>{stepNumber}</ThemedText>
      </View>

      {/* Content */}
      <View style={styles.textContainer}>
        <ThemedText style={styles.cardTitle}>{title}</ThemedText>
        <ThemedText style={styles.cardDescription}>{description}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Spacing.four,
    borderRadius: BorderRadii.lg,
    borderWidth: 1,
    gap: Spacing.three,
    ...(Shadows.sm as object),
  },
  badgeContainer: {
    width: 32,
    height: 32,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  badgeText: {
    color: '#EDE4D6',
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.bold,
  },
  textContainer: {
    flex: 1,
    gap: Spacing.half,
  },
  cardTitle: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  cardDescription: {
    color: '#4A625E',
    fontSize: Typography.small.fontSize,
    lineHeight: 18,
    fontWeight: FontWeights.regular,
  },
});
