import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadii, FontWeights, Shadows, Spacing, Typography } from '@/constants/theme';

export type StepCardProps = {
  stepNumber: number | string;
  title: string;
  description: string;
};

export function StepCard({ stepNumber, title, description }: StepCardProps) {
  return (
    <View style={styles.cardContainer}>
      {/* Number Badge */}
      <View style={styles.badgeContainer}>
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6DCCA',
    gap: Spacing.three,
    ...(Shadows.sm as object),
  },
  badgeContainer: {
    width: 32,
    height: 32,
    borderRadius: BorderRadii.full,
    backgroundColor: '#0F3D3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  badgeText: {
    color: '#FFFFFF',
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
    color: '#0F3D3A',
  },
  cardDescription: {
    color: '#4A625E',
    fontSize: Typography.small.fontSize,
    lineHeight: 18,
    fontWeight: FontWeights.regular,
  },
});
