import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import {
  BorderRadii,
  FontWeights,
  IconSizes,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type VerdictCardProps = {
  verdictTitle?: string;
  verdictSubtitle?: string;
};

export function VerdictCard({
  verdictTitle = 'Proceed with Caution',
  verdictSubtitle = 'Use a gentle formula and complete a strand test before service.',
}: VerdictCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.backgroundElement },
      ]}>
      {/* Shield Icon Badge */}
      <View style={[styles.iconCircle, { backgroundColor: theme.card }]}>
        <SymbolView
          name={{
            ios: 'shield.lefthalf.filled',
            android: 'shield',
            web: 'shield',
          }}
          size={IconSizes.sm}
          weight="bold"
          tintColor={theme.primary}
        />
      </View>

      <View style={styles.textContainer}>
        <ThemedText style={[styles.overline, { color: theme.primaryDark }]}>
          CHEMICAL SAFETY VERDICT
        </ThemedText>
        <ThemedText style={[styles.title, { color: theme.text }]}>
          {verdictTitle}
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
          {verdictSubtitle}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Spacing.four,
    borderRadius: BorderRadii.xl,
    gap: Spacing.three,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    gap: 3,
  },
  overline: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
  },
  subtitle: {
    fontSize: Typography.small.fontSize,
    lineHeight: 20,
  },
});
