import { SymbolView } from 'expo-symbols';
import { type ReactNode, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  type StyleProp,
  StyleSheet,
  TextInput,
  type TextInputProps,
  useWindowDimensions,
  View,
  type ViewStyle,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
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
  onSubmit?: () => void;
  avoidKeyboard?: boolean;
  cancel?: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
  dropdownLabel?: string;
  isDropdownOpen?: boolean;
  onDropdownOpenChange?: (open: boolean) => void;
  showOverlay?: boolean;
  maxHeight?: number;
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search clients',
  onClear,
  onSubmit,
  avoidKeyboard,
  cancel,
  style,
  containerStyle,
  children,
  dropdownLabel,
  isDropdownOpen: controlledOpen,
  onDropdownOpenChange,
  showOverlay = true,
  maxHeight = 195,
  onFocus,
  ...inputProps
}: SearchBarProps) {
  const theme = useTheme();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen =
    children !== undefined &&
    (controlledOpen !== undefined ? controlledOpen : internalOpen);

  const setOpen = (open: boolean) => {
    setInternalOpen(open);
    onDropdownOpenChange?.(open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // If children are provided, render as a reusable search bar with floating dropdown popup
  // and full-screen spruce green backdrop overlay (rgba(15, 61, 58, 0.55))
  if (children) {
    const computedLabel =
      dropdownLabel ||
      (value.trim().length > 0 ? 'RESULTS' : 'SUGGESTED CLIENTS');

    return (
      <View
        style={[
          styles.dropdownWrapper,
          isOpen && styles.dropdownWrapperOpen,
          { zIndex: isOpen ? 1000 : 1 },
          containerStyle,
        ]}>
        {/* Full-screen spruce green backdrop overlay */}
        {isOpen && showOverlay && (
          <Pressable
            accessibilityLabel="Close suggestions"
            accessibilityRole="button"
            onPress={handleClose}
            style={[
              styles.greenBackdrop,
              {
                top: -windowHeight,
                bottom: -windowHeight,
                left: -windowWidth,
                right: -windowWidth,
              },
            ]}
          />
        )}

        {/* Top Search Input Box (stays bright on top of the green backdrop) */}
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: theme.surface,
              borderColor: isOpen ? theme.primary : theme.borderSubtle,
            },
            style,
          ]}>
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

          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.textMuted}
            style={[styles.input, { color: theme.text }]}
            autoCorrect={false}
            autoCapitalize="none"
            onSubmitEditing={onSubmit}
            onFocus={(e) => {
              setOpen(true);
              onFocus?.(e);
            }}
            {...inputProps}
          />

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

        {/* Floating Suggestion Popup Card (only rendered when open) */}
        {isOpen && (
          <View
            style={[
              styles.floatingCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.borderSubtle,
              },
            ]}>
            <View style={styles.popupHeader}>
              <ThemedText
                style={[styles.popupLabel, { color: theme.primary }]}>
                {computedLabel}
              </ThemedText>
              <Pressable
                accessibilityLabel="Close suggestion dropdown"
                accessibilityRole="button"
                onPress={handleClose}
                hitSlop={8}
                style={styles.popupCloseBtn}>
                <ThemedText
                  style={[
                    styles.popupCloseText,
                    { color: theme.textSecondary },
                  ]}>
                  Close
                </ThemedText>
              </Pressable>
            </View>

            {/* Scrollable Items Container (fits ~3 items, smoothly scrollable for more on mobile) */}
            <ScrollView
              style={[styles.popupScrollView, { maxHeight }]}
              contentContainerStyle={styles.popupScrollContent}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="on-drag"
              showsVerticalScrollIndicator={true}
              bounces={Platform.OS === 'ios'}
              overScrollMode="always"
              scrollEventThrottle={16}>
              {children}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }

  // Standalone search bar (when no children are passed)
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

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textMuted}
        style={[styles.input, { color: theme.text }]}
        autoCorrect={false}
        autoCapitalize="none"
        onSubmitEditing={onSubmit}
        onFocus={onFocus}
        {...inputProps}
      />

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

export function SearchBarSection({
  label,
  children,
  style,
}: {
  label?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  return (
    <View style={[styles.sectionContainer, style]}>
      {label ? (
        <ThemedText
          style={[styles.sectionLabel, { color: theme.textSecondary }]}>
          {label}
        </ThemedText>
      ) : null}
      <View style={styles.sectionItems}>{children}</View>
    </View>
  );
}

export type SearchBarItemProps = {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  initial?: string;
  badgeText?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function SearchBarItem({
  children,
  title,
  subtitle,
  initial,
  badgeText,
  onPress,
  style,
}: SearchBarItemProps) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.itemRow,
        pressed && styles.itemPressed,
        style,
      ]}>
      {initial ? (
        <View style={[styles.itemAvatar, { backgroundColor: theme.secondary }]}>
          <ThemedText
            style={[styles.itemAvatarInitial, { color: theme.secondaryText }]}>
            {initial}
          </ThemedText>
        </View>
      ) : null}

      <View style={styles.itemInfo}>
        {title ? (
          <ThemedText
            numberOfLines={1}
            style={[styles.itemTitle, { color: theme.text }]}>
            {title}
          </ThemedText>
        ) : null}
        {subtitle ? (
          <ThemedText
            numberOfLines={1}
            style={[styles.itemSubtitle, { color: theme.textSecondary }]}>
            {subtitle}
          </ThemedText>
        ) : null}
        {children ? (
          typeof children === 'string' ? (
            <ThemedText
              numberOfLines={1}
              style={[styles.itemTitle, { color: theme.text }]}>
              {children}
            </ThemedText>
          ) : (
            children
          )
        ) : null}
      </View>

      {badgeText ? (
        <ThemedText style={[styles.badgeText, { color: theme.primary }]}>
          {badgeText}
        </ThemedText>
      ) : null}

      {/* Trailing Plus Icon (+) matching PanelUI design */}
      <View style={styles.plusIconBox}>
        <SymbolView
          name={{
            ios: 'plus',
            android: 'add',
            web: 'add',
          }}
          size={16}
          weight="medium"
          tintColor={theme.textSecondary}
        />
      </View>
    </Pressable>
  );
}

SearchBar.Section = SearchBarSection;
SearchBar.Item = SearchBarItem;

const styles = StyleSheet.create({
  dropdownWrapper: {
    width: '100%',
    position: 'relative',
    elevation: Platform.select({ android: 10, default: undefined }),
  },
  dropdownWrapperOpen: {
    height: Dimensions.inputHeight + Spacing.two + 280,
    marginBottom: -(Spacing.two + 280),
  },
  greenBackdrop: {
    position: 'absolute',
    backgroundColor: 'rgba(15, 61, 58, 0.55)',
    zIndex: 90,
    elevation: 2,
  },
  floatingCard: {
    position: 'absolute',
    top: Dimensions.inputHeight + Spacing.two,
    left: 0,
    right: 0,
    zIndex: 150,
    elevation: 20,
    borderRadius: BorderRadii.xl,
    borderWidth: 1,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    overflow: 'hidden',
    ...(Shadows.md as object),
  },
  popupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.one,
    paddingTop: Spacing.one,
    paddingBottom: Spacing.two,
  },
  popupLabel: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  popupCloseBtn: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
  },
  popupCloseText: {
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.semiBold,
  },
  popupScrollView: {
    width: '100%',
  },
  popupScrollContent: {
    paddingBottom: Spacing.one,
  },
  searchContainer: {
    width: '100%',
    height: Dimensions.inputHeight,
    borderRadius: BorderRadii.xl,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    borderWidth: 1,
    gap: Spacing.two,
    zIndex: 100,
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
  sectionContainer: {
    width: '100%',
    gap: Spacing.two,
  },
  sectionLabel: {
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.semiBold,
    letterSpacing: 0.5,
  },
  sectionItems: {
    width: '100%',
    gap: Spacing.one,
  },
  itemRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    gap: Spacing.three,
    borderRadius: BorderRadii.md,
  },
  itemPressed: {
    opacity: 0.65,
  },
  itemAvatar: {
    width: 36,
    height: 36,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemAvatarInitial: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  itemInfo: {
    flex: 1,
    gap: 1,
  },
  itemTitle: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.semiBold,
  },
  itemSubtitle: {
    fontSize: Typography.small.fontSize,
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: FontWeights.bold,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  plusIconBox: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
