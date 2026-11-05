import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import {
  FontWeights,
  IconSizes,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SettingsRowProps = {
  label: string;
  value: string;
  showDivider?: boolean;
  onPress?: () => void;
};

export function SettingsRow({
  label,
  value,
  showDivider = true,
  onPress,
}: SettingsRowProps) {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${value}`}
        onPress={onPress}
        style={({ pressed }) => [
          styles.rowContainer,
          pressed && styles.pressed,
        ]}>
        <ThemedText style={[styles.labelText, { color: theme.text }]}>
          {label}
        </ThemedText>

        <View style={styles.trailingGroup}>
          <ThemedText
            style={[styles.valueText, { color: theme.textSecondary }]}
            numberOfLines={1}>
            {value}
          </ThemedText>

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
        </View>
      </Pressable>

      {showDivider && (
        <View
          style={[styles.divider, { backgroundColor: theme.border }]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.four,
    gap: Spacing.two,
  },
  pressed: {
    opacity: 0.7,
  },
  labelText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  trailingGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: Spacing.two,
  },
  valueText: {
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.regular,
    maxWidth: 200,
    textAlign: 'right',
  },
  divider: {
    width: '100%',
    height: 1,
  },
});
