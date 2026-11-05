import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import {
  BorderRadii,
  FontWeights,
  IconSizes,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ClassificationCardProps = {
  category: string;
  value: string;
  description: string;
  iconType: 'letter' | 'porosity' | 'damage';
  iconLetter?: string;
  iconBgColor?: string;
};

export function ClassificationCard({
  category,
  value,
  description,
  iconType,
  iconLetter = 'W',
  iconBgColor,
}: ClassificationCardProps) {
  const theme = useTheme();

  const renderIcon = () => {
    const defaultBg = iconBgColor ?? theme.backgroundElement;

    switch (iconType) {
      case 'porosity':
        return (
          <View style={[styles.iconBox, { backgroundColor: iconBgColor ?? '#DFC085' }]}>
            <SymbolView
              name={{
                ios: 'circle.slash',
                android: 'radio_button_checked',
                web: 'radio_button_checked',
              }}
              size={IconSizes.sm}
              weight="bold"
              tintColor={theme.secondary}
            />
          </View>
        );
      case 'damage':
        return (
          <View style={[styles.iconBox, { backgroundColor: iconBgColor ?? '#C3CEBE' }]}>
            <SymbolView
              name={{
                ios: 'waveform.path',
                android: 'graphic_eq',
                web: 'graphic_eq',
              }}
              size={IconSizes.sm}
              weight="bold"
              tintColor={theme.secondary}
            />
          </View>
        );
      case 'letter':
      default:
        return (
          <View style={[styles.iconBox, { backgroundColor: defaultBg }]}>
            <ThemedText style={[styles.letterText, { color: theme.secondary }]}>
              {iconLetter}
            </ThemedText>
          </View>
        );
    }
  };

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.card,
          borderColor: theme.borderSubtle,
        },
      ]}>
      {renderIcon()}

      <View style={styles.textContainer}>
        <ThemedText style={[styles.categoryLabel, { color: theme.textSecondary }]}>
          {category}
        </ThemedText>
        <ThemedText style={[styles.valueText, { color: theme.text }]}>
          {value}
        </ThemedText>
        <ThemedText style={[styles.descText, { color: theme.textMuted }]}>
          {description}
        </ThemedText>
      </View>

      <SymbolView
        name={{
          ios: 'checkmark',
          android: 'check',
          web: 'check',
        }}
        size={IconSizes.md}
        weight="bold"
        tintColor={theme.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.four,
    borderRadius: BorderRadii.xl,
    borderWidth: 1,
    gap: Spacing.three,
    ...(Shadows.sm as object),
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: BorderRadii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: {
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  categoryLabel: {
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.medium,
  },
  valueText: {
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
  },
  descText: {
    fontSize: Typography.small.fontSize,
    lineHeight: 18,
  },
});
