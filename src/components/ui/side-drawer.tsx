import { SymbolView } from 'expo-symbols';
import { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandWordmark } from '@/components/brand-wordmark';
import {
  BorderRadii,
  BrandColors,
  IconSizes,
  Spacing,
} from '@/constants/theme';

export type SideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number | string;
  maxWidth?: number;
  backgroundColor?: string;
  showDefaultHeader?: boolean;
  headerRight?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function SideDrawer({
  isOpen,
  onClose,
  children,
  width = '80%',
  maxWidth = 320,
  backgroundColor = BrandColors.headerBg,
  showDefaultHeader = true,
  headerRight,
  style,
}: SideDrawerProps) {
  const insets = useSafeAreaInsets();

  // Ensure plenty of top clearance below device camera punch-holes / notches / status bars
  const topInset = Math.max(insets.top, Platform.OS === 'android' ? 38 : 24) + Spacing.two;
  const bottomInset = Math.max(insets.bottom, 16);

  // Use state for Animated.Value to comply with React 19 render conventions
  const [animValue] = useState(() => new Animated.Value(isOpen ? 1 : 0));
  const [isRendered, setIsRendered] = useState(isOpen);

  // Synchronously ensure rendered when isOpen becomes true (React's pattern for derived state)
  if (isOpen && !isRendered) {
    setIsRendered(true);
  }

  useEffect(() => {
    if (isOpen) {
      Animated.timing(animValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.bezier(0.16, 1, 0.3, 1), // Fluid cubic-bezier feel
        useNativeDriver: true,
      }).start();
    } else if (isRendered) {
      Animated.timing(animValue, {
        toValue: 0,
        duration: 240,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setIsRendered(false);
        }
      });
    }
  }, [isOpen, animValue, isRendered]);

  const handleClose = () => {
    Animated.timing(animValue, {
      toValue: 0,
      duration: 240,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setIsRendered(false);
        onClose();
      }
    });
  };

  if (!isRendered) {
    return null;
  }

  // Backdrop fade: opacity from 0 to 1
  const backdropOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Drawer slide from right: translateX from 350 to 0
  const drawerTranslateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [350, 0],
  });

  return (
    <Modal
      transparent
      visible={isRendered}
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent>
      <View style={styles.container}>
        {/* Animated Dim Backdrop */}
        <Animated.View
          style={[
            styles.backdrop,
            { opacity: backdropOpacity },
          ]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            accessibilityRole="button"
            accessibilityLabel="Close Navigation Drawer"
            onPress={handleClose}
          />
        </Animated.View>

        {/* Animated Sliding Drawer Sheet */}
        <Animated.View
          style={[
            styles.drawerSheet,
            {
              width: width as any,
              maxWidth,
              backgroundColor,
              transform: [{ translateX: drawerTranslateX }],
            },
            style,
          ]}>
          <View
            style={[
              styles.drawerContent,
              {
                paddingTop: topInset,
                paddingBottom: bottomInset,
              },
            ]}>
            {/* Optional Default Branded Header */}
            {showDefaultHeader && (
              <View style={styles.header}>
                <View style={styles.brandRow}>
                  <Image
                    source={require('@/assets/images/tresstechlogo.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                  />
                  <BrandWordmark style={styles.brandTitle} />
                </View>

                {headerRight ?? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Close Drawer"
                    onPress={handleClose}
                    hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
                    style={({ pressed }) => [
                      styles.closeButton,
                      pressed && styles.closeButtonPressed,
                    ]}>
                    <SymbolView
                      name={{
                        ios: 'xmark',
                        android: 'close',
                        web: 'close',
                      }}
                      size={IconSizes.md}
                      tintColor={BrandColors.solid}
                    />
                  </Pressable>
                )}
              </View>
            )}

            {/* Custom Drawer Content / Links */}
            <View style={styles.body}>{children}</View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 61, 58, 0.45)', // Semi-transparent spruce overlay
  },
  drawerSheet: {
    height: '100%',
    shadowColor: '#0F3D3A',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 16,
    ...Platform.select({
      web: {
        boxShadow: '-6px 0 24px rgba(15, 61, 58, 0.18)',
      },
      default: {},
    }),
  },
  drawerContent: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D8CAB5',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  logoImage: {
    width: 28,
    height: 28,
    borderRadius: BorderRadii.full,
  },
  brandTitle: {
    fontSize: 18,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadii.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonPressed: {
    backgroundColor: 'rgba(15, 61, 58, 0.12)', // Visual tap feedback indicator
    transform: [{ scale: 0.92 }],
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
