import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FontWeights, IconSizes, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ChecklistItemStatus = 'completed' | 'in_progress' | 'pending';

export type ChecklistStep = {
  id: string;
  label: string;
  status: ChecklistItemStatus;
};

export type AnalysisChecklistProps = {
  steps: ChecklistStep[];
};

export function AnalysisChecklist({ steps }: AnalysisChecklistProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {steps.map((step) => {
        const isCompleted = step.status === 'completed';
        const isInProgress = step.status === 'in_progress';

        const textColor = isCompleted
          ? theme.text
          : isInProgress
          ? theme.text
          : theme.textMuted;

        const iconColor = isCompleted
          ? theme.success
          : isInProgress
          ? theme.primary
          : theme.textMuted;

        return (
          <View key={step.id} style={styles.stepRow}>
            {isCompleted ? (
              <SymbolView
                name={{
                  ios: 'checkmark',
                  android: 'check',
                  web: 'check',
                }}
                size={IconSizes.sm}
                weight="bold"
                tintColor={iconColor}
              />
            ) : isInProgress ? (
              <SymbolView
                name={{
                  ios: 'waveform.path',
                  android: 'graphic_eq',
                  web: 'graphic_eq',
                }}
                size={IconSizes.sm}
                weight="medium"
                tintColor={iconColor}
              />
            ) : (
              <SymbolView
                name={{
                  ios: 'circle',
                  android: 'circle',
                  web: 'circle',
                }}
                size={IconSizes.xs}
                tintColor={theme.textMuted}
              />
            )}

            <ThemedText
              style={[
                styles.stepLabel,
                {
                  color: textColor,
                  fontWeight:
                    isCompleted || isInProgress
                      ? FontWeights.medium
                      : FontWeights.regular,
                },
              ]}>
              {step.label}
            </ThemedText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    width: 200,
    justifyContent: 'flex-start',
  },
  stepLabel: {
    fontSize: Typography.body.fontSize,
  },
});
