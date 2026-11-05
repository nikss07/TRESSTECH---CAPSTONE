import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import {
  BorderRadii,
  FontWeights,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type QualityWarningCardProps = {
  title?: string;
  subtitle?: string;
  tips?: string[];
  footerNote?: string;
};

export function QualityWarningCard({
  title = "Image isn't clear enough",
  subtitle = 'Please retake your photo before continuing.',
  tips = [
    'Move closer or use a higher-resolution photo.',
    'The photo is too dark. Try brighter, natural light.',
  ],
  footerNote = 'Try better lighting, fix the angle, and hold your phone steady.',
}: QualityWarningCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.warningCardBg,
          borderColor: theme.warningCardBorder,
        },
      ]}>
      {/* Title with Warning Symbol */}
      <View style={styles.titleRow}>
        <ThemedText style={styles.warningIcon}>⚠️</ThemedText>
        <ThemedText
          style={[styles.titleText, { color: theme.warningCardTitle }]}>
          {title}
        </ThemedText>
      </View>

      {/* Subtitle */}
      {subtitle ? (
        <ThemedText
          style={[styles.subtitleText, { color: theme.warningCardText }]}>
          {subtitle}
        </ThemedText>
      ) : null}

      {/* Bullet Tips */}
      <View style={styles.tipsList}>
        {tips.map((tip, index) => (
          <ThemedText
            key={index}
            style={[styles.tipText, { color: theme.warningCardText }]}>
            • {tip}
          </ThemedText>
        ))}
      </View>

      {/* Footer Callout */}
      {footerNote ? (
        <ThemedText
          style={[styles.footerText, { color: theme.warningCardTitle }]}>
          {footerNote}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    padding: Spacing.four,
    borderRadius: BorderRadii.lg,
    borderWidth: 1,
    gap: Spacing.two,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  warningIcon: {
    fontSize: 16,
  },
  titleText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  subtitleText: {
    fontSize: Typography.small.fontSize,
    lineHeight: 20,
  },
  tipsList: {
    gap: 4,
    marginVertical: 2,
  },
  tipText: {
    fontSize: Typography.small.fontSize,
    lineHeight: 20,
  },
  footerText: {
    fontSize: Typography.small.fontSize,
    lineHeight: 20,
    fontWeight: FontWeights.bold,
    marginTop: Spacing.one,
  },
});
