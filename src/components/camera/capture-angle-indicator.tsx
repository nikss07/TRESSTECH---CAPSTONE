import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import {
  BorderRadii,
  FontWeights,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type HairAngleKey = 'side_left' | 'side_right' | 'back' | 'top' | 'front';

export type HairAngleConfig = {
  key: HairAngleKey;
  label: string;
  shortLabel: string;
  guidance: string;
};

export const HAIR_ANGLES: HairAngleConfig[] = [
  {
    key: 'side_left',
    label: 'Side Left',
    shortLabel: 'Left',
    guidance: 'Capture left lateral hair, temple line, and cuticle sheen.',
  },
  {
    key: 'side_right',
    label: 'Side Right',
    shortLabel: 'Right',
    guidance: 'Capture right lateral hair, temple line, and side density.',
  },
  {
    key: 'back',
    label: 'Back',
    shortLabel: 'Back',
    guidance: 'Capture occipital zone, crown vortex, and nape texture.',
  },
  {
    key: 'top',
    label: 'Top',
    shortLabel: 'Top',
    guidance: 'Capture central parting, vertex density, and scalp visibility.',
  },
  {
    key: 'front',
    label: 'Front',
    shortLabel: 'Front',
    guidance: 'Capture anterior hairline, facial framing, and baseline texture.',
  },
];

export type CaptureAngleIndicatorProps = {
  currentAngleIndex: number;
  completedAngles: Record<HairAngleKey, string | undefined>;
};

export function CaptureAngleIndicator({
  currentAngleIndex,
  completedAngles,
}: CaptureAngleIndicatorProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.chipsRow}>
        {HAIR_ANGLES.map((angle, index) => {
          const isCompleted = Boolean(completedAngles[angle.key]);
          const isCurrent = index === currentAngleIndex;

          const chipBg = isCurrent
            ? theme.primary
            : isCompleted
            ? theme.secondary
            : 'rgba(255, 255, 255, 0.2)';

          const chipTextColor = isCurrent
            ? theme.primaryText
            : isCompleted
            ? theme.secondaryText
            : '#FFFFFF';

          return (
            <View
              key={angle.key}
              style={[
                styles.chip,
                {
                  backgroundColor: chipBg,
                  borderColor: isCurrent ? theme.primary : 'transparent',
                },
              ]}>
              {isCompleted && !isCurrent ? (
                <SymbolView
                  name={{
                    ios: 'checkmark',
                    android: 'check',
                    web: 'check',
                  }}
                  size={12}
                  weight="bold"
                  tintColor={chipTextColor}
                />
              ) : (
                <ThemedText
                  style={[
                    styles.chipText,
                    {
                      color: chipTextColor,
                      fontWeight: isCurrent ? FontWeights.bold : FontWeights.medium,
                    },
                  ]}>
                  {index + 1}
                </ThemedText>
              )}
              <ThemedText
                style={[
                  styles.chipLabel,
                  {
                    color: chipTextColor,
                    fontWeight: isCurrent ? FontWeights.bold : FontWeights.medium,
                  },
                ]}>
                {angle.shortLabel}
              </ThemedText>
            </View>
          );
        })}
      </View>

      {/* Active Angle Guide Banner */}
      <View style={styles.guidanceRow}>
        <ThemedText style={[styles.stepCount, { color: theme.primary }]}>
          STEP {currentAngleIndex + 1} OF {HAIR_ANGLES.length}
        </ThemedText>
        <ThemedText style={styles.angleTitle}>
          {HAIR_ANGLES[currentAngleIndex]?.label}
        </ThemedText>
        <ThemedText style={styles.angleGuidance}>
          {HAIR_ANGLES[currentAngleIndex]?.guidance}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
  },
  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  chip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: BorderRadii.full,
    borderWidth: 1.5,
    gap: 4,
  },
  chipText: {
    fontSize: 11,
    lineHeight: 14,
  },
  chipLabel: {
    fontSize: 11,
    lineHeight: 14,
  },
  guidanceRow: {
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  stepCount: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.2,
  },
  angleTitle: {
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
    color: '#FFFFFF',
  },
  angleGuidance: {
    fontSize: Typography.caption.fontSize,
    lineHeight: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    maxWidth: 320,
  },
});
