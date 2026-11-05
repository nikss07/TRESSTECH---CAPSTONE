import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import {
  BorderRadii,
  FontWeights,
  IconSizes,
  MaxContentWidth,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

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
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (action?: () => void) => {
    setMenuOpen(false);
    action?.();
  };

  return (
    <View style={[styles.headerContainer, { backgroundColor: theme.background }]}>
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
          <ThemedText style={styles.brandTitle}>TressTech</ThemedText>
        </Pressable>

        {/* Hamburger Menu Toggle */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Toggle Navigation Menu"
          onPress={() => setMenuOpen(true)}
          style={({ pressed }) => [styles.menuButton, pressed && styles.pressed]}>
          <SymbolView
            name={{
              ios: 'line.3.horizontal',
              android: 'menu',
              web: 'menu',
            }}
            size={IconSizes.md}
            tintColor={theme.secondary}
          />
        </Pressable>
      </View>

      {/* Slide-in Mobile / Web Navigation Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={menuOpen}
        onRequestClose={() => setMenuOpen(false)}>
        <View style={styles.modalOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setMenuOpen(false)}
          />

          <SafeAreaView
            style={[styles.menuSheet, { backgroundColor: theme.surface }]}>
            <View style={styles.menuHeader}>
              <View style={styles.brandRow}>
                <Image
                  source={require('@/assets/images/tresstechlogo.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
                <ThemedText style={styles.brandTitle}>TressTech</ThemedText>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close Menu"
                onPress={() => setMenuOpen(false)}
                style={styles.closeButton}>
                <SymbolView
                  name={{
                    ios: 'xmark',
                    android: 'close',
                    web: 'close',
                  }}
                  size={IconSizes.md}
                  tintColor={theme.secondary}
                />
              </Pressable>
            </View>

            <View style={styles.menuLinks}>
              <Pressable
                style={styles.menuLinkItem}
                onPress={() => handleNav(onFeaturesPress)}>
                <ThemedText type="bodyLarge" style={styles.menuLinkText}>
                  Features
                </ThemedText>
              </Pressable>
              <Pressable
                style={styles.menuLinkItem}
                onPress={() => handleNav(onHowItWorksPress)}>
                <ThemedText type="bodyLarge" style={styles.menuLinkText}>
                  How It Works
                </ThemedText>
              </Pressable>
              <Pressable
                style={styles.menuLinkItem}
                onPress={() => handleNav(onClinicalPress)}>
                <ThemedText type="bodyLarge" style={styles.menuLinkText}>
                  Clinical Credibility
                </ThemedText>
              </Pressable>
            </View>

            <View style={styles.menuFooter}>
              <Button
                title="Get Started"
                fullWidth
                onPress={() => handleNav(onGetStartedPress)}
              />
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingHorizontal: Spacing.four,
    paddingTop: Platform.select({ ios: Spacing.two, default: Spacing.three }),
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
    padding: Spacing.one,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 61, 58, 0.45)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuSheet: {
    width: '80%',
    maxWidth: 320,
    height: '100%',
    padding: Spacing.four,
    justifyContent: 'space-between',
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D8CAB5',
  },
  closeButton: {
    padding: Spacing.one,
  },
  menuLinks: {
    flex: 1,
    paddingTop: Spacing.five,
    gap: Spacing.four,
  },
  menuLinkItem: {
    paddingVertical: Spacing.two,
  },
  menuLinkText: {
    fontWeight: FontWeights.semiBold,
  },
  menuFooter: {
    paddingTop: Spacing.three,
  },
});
