import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandWordmark } from '@/components/brand-wordmark';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { SideDrawer } from '@/components/ui/side-drawer';
import {
  BorderRadii,
  BrandColors,
  FontWeights,
  IconSizes,
  MaxContentWidth,
  Spacing,
  Typography,
} from '@/constants/theme';

export type LandingHeaderProps = {
  onGetStartedPress?: () => void;
  onFeaturesPress?: () => void;
  onHowItWorksPress?: () => void;
  onClinicalPress?: () => void;
};

export function LandingHeader({
  onGetStartedPress,
  onFeaturesPress,
  onHowItWorksPress,
  onClinicalPress,
}: LandingHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);

  // Moves the header comfortably down below camera punch-holes, notches, and status bars
  const topPadding = Math.max(insets.top, Platform.OS === 'android' ? 36 : 18) + Spacing.two;

  const handleNav = (action?: () => void) => {
    setMenuOpen(false);
    action?.();
  };

  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: BrandColors.headerBg,
          paddingTop: topPadding,
        },
      ]}>
      <View style={styles.headerContent}>
        {/* Brand Logo & Name */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="TressTech Home"
          style={styles.brandRow}>
          <Image
            source={require('@/assets/images/tresstechlogo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <BrandWordmark style={styles.brandTitle} />
        </Pressable>

        {/* Hamburger Menu Toggle with large hit target & visual press feedback */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Toggle Navigation Menu"
          onPress={() => setMenuOpen(true)}
          hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
          style={({ pressed }) => [
            styles.menuButton,
            pressed && styles.menuButtonPressed,
          ]}>
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
      </View>

      {/* Smooth Animated Reusable Side Drawer */}
      <SideDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
        <View style={styles.menuLinks}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Features"
            style={({ pressed }) => [
              styles.menuLinkItem,
              pressed && styles.menuLinkItemPressed,
            ]}
            onPress={() => handleNav(onFeaturesPress)}>
            <ThemedText
              type="bodyLarge"
              style={[styles.menuLinkText, { color: BrandColors.solid }]}>
              Features
            </ThemedText>
            <SymbolView
              name={{
                ios: 'chevron.right',
                android: 'chevron_right',
                web: 'chevron_right',
              }}
              size={IconSizes.xs}
              tintColor="rgba(15, 61, 58, 0.4)"
            />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="How It Works"
            style={({ pressed }) => [
              styles.menuLinkItem,
              pressed && styles.menuLinkItemPressed,
            ]}
            onPress={() => handleNav(onHowItWorksPress)}>
            <ThemedText
              type="bodyLarge"
              style={[styles.menuLinkText, { color: BrandColors.solid }]}>
              How It Works
            </ThemedText>
            <SymbolView
              name={{
                ios: 'chevron.right',
                android: 'chevron_right',
                web: 'chevron_right',
              }}
              size={IconSizes.xs}
              tintColor="rgba(15, 61, 58, 0.4)"
            />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clinical Credibility"
            style={({ pressed }) => [
              styles.menuLinkItem,
              pressed && styles.menuLinkItemPressed,
            ]}
            onPress={() => handleNav(onClinicalPress)}>
            <ThemedText
              type="bodyLarge"
              style={[styles.menuLinkText, { color: BrandColors.solid }]}>
              Clinical Credibility
            </ThemedText>
            <SymbolView
              name={{
                ios: 'chevron.right',
                android: 'chevron_right',
                web: 'chevron_right',
              }}
              size={IconSizes.xs}
              tintColor="rgba(15, 61, 58, 0.4)"
            />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Staff Dashboard"
            style={({ pressed }) => [
              styles.menuLinkItem,
              pressed && styles.menuLinkItemPressed,
            ]}
            onPress={() => {
              setMenuOpen(false);
              router.push('/dashboard');
            }}>
            <ThemedText
              type="bodyLarge"
              style={[styles.menuLinkText, { color: '#AF8436' }]}>
              Staff Dashboard
            </ThemedText>
            <SymbolView
              name={{
                ios: 'chevron.right',
                android: 'chevron_right',
                web: 'chevron_right',
              }}
              size={IconSizes.xs}
              tintColor="#AF8436"
            />
          </Pressable>
        </View>

        <View style={styles.menuFooter}>
          <Button
            title="Get Started"
            fullWidth
            onPress={() => handleNav(onGetStartedPress)}
          />
        </View>
      </SideDrawer>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.two,
    alignItems: 'center',
    zIndex: 10,
  },
  headerContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
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
    fontSize: Typography.subtitle.fontSize,
    fontWeight: FontWeights.bold,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadii.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonPressed: {
    backgroundColor: 'rgba(15, 61, 58, 0.12)', // Visual tap feedback indicator
    transform: [{ scale: 0.92 }],
  },
  menuLinks: {
    flex: 1,
    paddingTop: Spacing.four,
    gap: Spacing.two,
  },
  menuLinkItem: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    borderRadius: BorderRadii.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuLinkItemPressed: {
    backgroundColor: 'rgba(15, 61, 58, 0.12)', // Visual tap feedback indicator
    transform: [{ scale: 0.98 }],
  },
  menuLinkText: {
    fontWeight: FontWeights.semiBold,
  },
  menuFooter: {
    paddingTop: Spacing.three,
  },
});
