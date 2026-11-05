import { type ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import {
  BorderRadii,
  Dimensions,
  FontWeights,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<PressableProps, 'style'> & {
  title?: string;
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Button({
  title,
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
  ...pressableProps
}: ButtonProps) {
  const theme = useTheme();

  // Size configurations derived from centralized design tokens
  const sizeStyles: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
    sm: {
      container: {
        height: Dimensions.buttonHeightSm,
        paddingHorizontal: Spacing.three,
        borderRadius: BorderRadii.sm,
      },
      text: {
        fontSize: Typography.small.fontSize,
        lineHeight: Typography.small.lineHeight,
      },
    },
    md: {
      container: {
        height: Dimensions.buttonHeightMd,
        paddingHorizontal: Spacing.four,
        borderRadius: BorderRadii.md,
      },
      text: {
        fontSize: Typography.body.fontSize,
        lineHeight: Typography.body.lineHeight,
      },
    },
    lg: {
      container: {
        height: Dimensions.buttonHeightLg,
        paddingHorizontal: Spacing.five,
        borderRadius: BorderRadii.lg,
      },
      text: {
        fontSize: Typography.bodyLarge.fontSize,
        lineHeight: Typography.bodyLarge.lineHeight,
      },
    },
  };

  // Variant styles mapped directly to centralized brand colors
  // Default primary: background #CC9F4D, text #0F3D3A
  const getVariantStyles = (): { container: ViewStyle; textColor: string } => {
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: theme.buttonBackground,
            borderWidth: 0,
            ...(Shadows.sm as object),
          },
          textColor: theme.buttonText,
        };
      case 'secondary':
        return {
          container: {
            backgroundColor: theme.buttonSecondaryBackground,
            borderWidth: 0,
          },
          textColor: theme.buttonSecondaryText,
        };
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderColor: theme.borderFocus,
          },
          textColor: theme.text,
        };
      case 'ghost':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 0,
          },
          textColor: theme.text,
        };
    }
  };

  const currentVariant = getVariantStyles();
  const currentSize = sizeStyles[size];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        currentSize.container,
        currentVariant.container,
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      {...pressableProps}>
      {loading ? (
        <ActivityIndicator color={currentVariant.textColor} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' ? icon : null}
          {title ? (
            <Text
              style={[
                styles.textBase,
                currentSize.text,
                { color: currentVariant.textColor },
                textStyle,
              ]}>
              {title}
            </Text>
          ) : (
            children
          )}
          {icon && iconPosition === 'right' ? icon : null}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  fullWidth: {
    alignSelf: 'stretch',
    width: '100%',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  disabled: {
    opacity: 0.5,
  },
  textBase: {
    fontWeight: FontWeights.semiBold,
    textAlign: 'center',
  },
});
