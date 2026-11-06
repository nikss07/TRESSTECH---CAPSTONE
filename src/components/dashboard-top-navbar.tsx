import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandWordmark } from '@/components/brand-wordmark';
import { StaffSideDrawer } from '@/components/staff-side-drawer';
import {
  BorderRadii,
  BrandColors,
  FontWeights,
  IconSizes,
  MaxContentWidth,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type DashboardTopNavbarProps = {
  onMenuPress?: () => void;
  showBorderBottom?: boolean;
  showMenu?: boolean;
};

/**
 * Standardized top navigation bar matching the Staff Dashboard.
 * Includes safe area insets for Android/iOS, TressTech brand logo,
 * hamburger menu button with generous touch target, and the slide-out StaffSideDrawer.
 */
export function DashboardTopNavbar({
  onMenuPress,
  showBorderBottom = true,
  showMenu = true,
}: DashboardTopNavbarProps) {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Comfortable top clearance below camera punch-holes, notches, and status bars
  const topPadding = Math.max(insets.top, Platform.OS === 'android' ? 38 : 20) + Spacing.two;

  const handleMenu = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      setDrawerOpen(true);
    }
  };

  return (
    <>
      <View
        style={[
          styles.topNavbar,
          {
            paddingTop: topPadding,
            backgroundColor: BrandColors.headerBg,
            borderBottomColor: theme.border,
            borderBottomWidth: showBorderBottom ? 1 : 0,
          },
        ]}>
        <View style={styles.topNavbarContent}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="TressTech Home"
            onPress={() => router.push('/dashboard')}
            style={styles.brandRow}>
            <Image
              source={require('@/assets/images/tresstechlogo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <BrandWordmark style={styles.brandTitle} />
          </Pressable>

          {showMenu ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Toggle Navigation Menu"
              onPress={handleMenu}
              hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
              style={({ pressed }) => [styles.menuButton, pressed && styles.pressed]}>
              <SymbolView
                name={{
                  ios: 'line.3.horizontal',
                  android: 'menu',
                  web: 'menu',
                }}
                size={IconSizes.md}
                tintColor={BrandColors.solid}
              />
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* Slide-out Staff Sidebar Drawer */}
      {showMenu ? (
        <StaffSideDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  topNavbar: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.two,
  },
  topNavbarContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  logoImage: {
    width: 32,
    height: 32,
    borderRadius: BorderRadii.full,
  },
  brandTitle: {
    fontSize: Typography.subtitle.fontSize,
    fontWeight: FontWeights.bold,
  },
  menuButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadii.sm,
  },
  pressed: {
    opacity: 0.65,
  },
});
