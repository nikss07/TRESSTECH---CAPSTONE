import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, FontWeights, type ThemeColor, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextType =
  | 'default'
  | 'title'
  | 'subtitle'
  | 'display'
  | 'small'
  | 'smallBold'
  | 'caption'
  | 'bodyLarge'
  | 'link'
  | 'linkPrimary'
  | 'code';

export type ThemedTextProps = TextProps & {
  type?: ThemedTextType;
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  // If linkPrimary is selected without an explicit themeColor, use the brand primary color (#CC9F4D)
  const defaultColor = type === 'linkPrimary' ? theme.primary : theme[themeColor ?? 'text'];

  return <Text style={[{ color: defaultColor }, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
  caption: {
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontWeight: FontWeights.regular,
  },
  small: {
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: FontWeights.medium,
  },
  smallBold: {
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight,
    fontWeight: FontWeights.bold,
  },
  default: {
    fontSize: Typography.body.fontSize,
    lineHeight: Typography.body.lineHeight,
    fontWeight: FontWeights.regular,
  },
  bodyLarge: {
    fontSize: Typography.bodyLarge.fontSize,
    lineHeight: Typography.bodyLarge.lineHeight,
    fontWeight: FontWeights.regular,
  },
  subtitle: {
    fontSize: Typography.subtitle.fontSize,
    lineHeight: Typography.subtitle.lineHeight,
    fontWeight: FontWeights.semiBold,
  },
  title: {
    fontSize: Typography.title.fontSize,
    lineHeight: Typography.title.lineHeight,
    fontWeight: FontWeights.bold,
  },
  display: {
    fontSize: Typography.display.fontSize,
    lineHeight: Typography.display.lineHeight,
    fontWeight: FontWeights.bold,
  },
  link: {
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight * 1.5,
    fontWeight: FontWeights.medium,
  },
  linkPrimary: {
    fontSize: Typography.small.fontSize,
    lineHeight: Typography.small.lineHeight * 1.5,
    fontWeight: FontWeights.semiBold,
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: FontWeights.bold }) ?? FontWeights.medium,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight * 1.3,
  },
});
