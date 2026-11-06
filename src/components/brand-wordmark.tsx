import { StyleSheet, Text, type StyleProp, type TextStyle } from 'react-native';

import { BrandColors, Fonts, FontWeights, Typography } from '@/constants/theme';

export type BrandWordmarkProps = {
  style?: StyleProp<TextStyle>;
  size?: 'sm' | 'md' | 'lg';
};

export function BrandWordmark({ style, size = 'md' }: BrandWordmarkProps) {
  const fontSize =
    size === 'sm'
      ? Typography.body.fontSize
      : size === 'lg'
      ? Typography.title.fontSize
      : Typography.subtitle.fontSize;

  return (
    <Text style={[styles.base, { fontSize }, style]}>
      <Text style={{ color: BrandColors.tress }}>Tress</Text>
      <Text style={{ color: BrandColors.tech }}>Tech</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: Fonts?.sans,
    fontWeight: FontWeights.bold,
    letterSpacing: -0.2,
  },
});
