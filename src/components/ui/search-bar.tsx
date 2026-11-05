import { SymbolView } from 'expo-symbols';
import {
  Pressable,
  StyleSheet,
  TextInput,
  type TextInputProps,
  View,
  type ViewStyle,
} from 'react-native';

import {
  BorderRadii,
  Dimensions,
  FontWeights,
  IconSizes,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SearchBarProps = Omit<TextInputProps, 'style'> & {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  style?: ViewStyle;
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search clients',
  onClear,
  style,
  ...inputProps
}: SearchBarProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.searchContainer,
        {
          backgroundColor: theme.surface,
          borderColor: theme.borderSubtle,
        },
        style,
      ]}>
      {/* Search Icon */}
      <SymbolView
        name={{
          ios: 'magnifyingglass',
          android: 'search',
          web: 'search',
        }}
        size={IconSizes.sm}
        weight="medium"
        tintColor={theme.textSecondary}
      />

      {/* Input */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textMuted}
        style={[styles.input, { color: theme.text }]}
        autoCorrect={false}
        autoCapitalize="none"
        {...inputProps}
      />

      {/* Clear Button */}
      {value.length > 0 && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search text"
          onPress={() => {
            onChangeText('');
            onClear?.();
          }}
          style={styles.clearButton}>
          <SymbolView
            name={{
              ios: 'xmark.circle.fill',
              android: 'cancel',
              web: 'cancel',
            }}
            size={IconSizes.xs}
            tintColor={theme.textMuted}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    height: Dimensions.inputHeight,
    borderRadius: BorderRadii.xl,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    borderWidth: 1,
    gap: Spacing.two,
    ...(Shadows.sm as object),
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.regular,
  },
  clearButton: {
    padding: Spacing.half,
  },
});
