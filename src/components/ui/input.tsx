import { SymbolView } from 'expo-symbols';
import { type ReactNode, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

import {
  BorderRadii,
  Dimensions,
  FontWeights,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isPassword?: boolean;
};

export function Input({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  leftIcon,
  rightIcon,
  isPassword,
  secureTextEntry,
  onFocus,
  onBlur,
  ...textInputProps
}: InputProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const effectiveSecureTextEntry = isPassword
    ? !showPassword
    : secureTextEntry;

  const passwordToggle = isPassword ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
      onPress={() => setShowPassword((prev) => !prev)}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      style={styles.eyeButton}>
      <SymbolView
        name={{
          ios: showPassword ? 'eye.slash.fill' : 'eye.fill',
          android: showPassword ? 'visibility_off' : 'visibility',
          web: showPassword ? 'visibility_off' : 'visibility',
        }}
        size={20}
        tintColor={isFocused ? '#0F3D3A' : '#6A7D79'}
      />
    </Pressable>
  ) : null;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: '#FFFFFF',
            borderColor: error
              ? theme.error
              : isFocused
              ? theme.borderFocus
              : '#D8CAB5',
          },
        ]}>
        {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}

        <TextInput
          placeholderTextColor="#7E918E"
          style={[styles.input, inputStyle]}
          secureTextEntry={effectiveSecureTextEntry}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...textInputProps}
        />

        {passwordToggle ? (
          <View style={styles.iconRight}>{passwordToggle}</View>
        ) : rightIcon ? (
          <View style={styles.iconRight}>{rightIcon}</View>
        ) : null}
      </View>

      {error ? (
        <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: Spacing.one,
  },
  label: {
    color: '#0F3D3A', // High contrast brand spruce green
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.semiBold,
    marginBottom: Spacing.half,
  },
  inputWrapper: {
    width: '100%',
    height: Dimensions.inputHeight,
    borderRadius: BorderRadii.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#0F3D3A', // High contrast dark text on white input background
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.medium,
  },
  iconLeft: {
    marginRight: Spacing.two,
  },
  iconRight: {
    marginLeft: Spacing.two,
  },
  eyeButton: {
    padding: Spacing.half,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: Typography.caption.fontSize,
    marginTop: Spacing.half,
  },
});
