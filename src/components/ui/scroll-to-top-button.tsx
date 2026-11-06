import { SymbolView } from 'expo-symbols';
import { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  BrandColors,
  IconSizes,
  Shadows,
  Spacing,
} from '@/constants/theme';

export type ScrollToTopButtonProps = {
  visible: boolean;
  onPress: () => void;
  bottomOffset?: number;
  rightOffset?: number;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function ScrollToTopButton({
  visible,
  onPress,
  bottomOffset = Spacing.four,
  rightOffset = Spacing.four,
  size = 46,
  backgroundColor = BrandColors.solid,
  iconColor = '#FFFFFF',
  accessibilityLabel = 'Scroll to top',
  style,
}: ScrollToTopButtonProps) {
  const insets = useSafeAreaInsets();

  // State-initialized Animated.Value compliant with React 19 rules
  const [animValue] = useState(() => new Animated.Value(visible ? 1 : 0));
  const [isRendered, setIsRendered] = useState(visible);

  // Synchronously update rendered state when visible turns true
  if (visible && !isRendered) {
    setIsRendered(true);
  }

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(animValue, {
          toValue: 1,
          duration: 260,
          easing: Easing.bezier(0.16, 1, 0.3, 1), // Fluid ease-out
          useNativeDriver: true,
        }),
      ]).start();
    } else if (isRendered) {
      Animated.timing(animValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setIsRendered(false);
        }
      });
    }
  }, [visible, animValue, isRendered]);

  if (!isRendered) {
    return null;
  }

  // Calculate dynamic bottom position ensuring safe area insets on mobile
  const calculatedBottom = Math.max(insets.bottom, 12) + bottomOffset;

  const opacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 0],
  });

  const scale = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        styles.container,
        {
          bottom: calculatedBottom,
          right: rightOffset,
          opacity,
          transform: [{ translateY }, { scale }],
        },
        style,
      ]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={({ pressed }) => [
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
          },
          pressed && styles.buttonPressed,
        ]}>
        <SymbolView
          name={{
            ios: 'chevron.up',
            android: 'keyboard_arrow_up',
            web: 'keyboard_arrow_up',
          }}
          size={IconSizes.sm}
          weight="bold"
          tintColor={iconColor}
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 999,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(229, 189, 120, 0.45)', // Subtle gold luxury border
    ...(Shadows.md as object),
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(15, 61, 58, 0.28)',
      },
      default: {},
    }),
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.92 }],
  },
});
