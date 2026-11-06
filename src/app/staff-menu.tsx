import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { DashboardNavBar, type DashboardTab } from '@/components/dashboard-nav-bar';
import { BrandWordmark } from '@/components/brand-wordmark';
import { ThemedText } from '@/components/themed-text';
import {
  BorderRadii,
  FontWeights,
  IconSizes,
  MaxContentWidth,
  Spacing,
  Typography,
  BrandColors,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function StaffMenuScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: { ios: 'house', android: 'home', web: 'home' } as const,
      route: '/dashboard' as const,
    },
    {
      id: 'clients',
      label: 'Clients',
      icon: { ios: 'person', android: 'person', web: 'person' } as const,
      route: '/new-analysis' as const,
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: { ios: 'doc.text', android: 'description', web: 'description' } as const,
      route: '/reports' as const,
    },
    {
      id: 'chemical-safety',
      label: 'Chemical Safety Reference',
      icon: { ios: 'shield', android: 'shield', web: 'shield' } as const,
      route: '/chemical-reference' as const,
    },
    {
      id: 'profile-settings',
      label: 'Profile & settings',
      icon: null,
      route: '/profile-settings' as const,
    },
  ];

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar style="dark" />

      {/* Top Navbar Header with Close Button */}
      <View style={[styles.topNavbar, { backgroundColor: BrandColors.headerBg, borderBottomColor: theme.border }]}>
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

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close navigation menu"
            onPress={() => router.back()}
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
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          {/* Staff Identity Block */}
          <View style={styles.staffBlock}>
            <View
              style={[
                styles.avatarCircle,
                { backgroundColor: theme.secondary },
              ]}>
              <ThemedText
                style={[styles.avatarLetter, { color: theme.secondaryText }]}>
                J
              </ThemedText>
            </View>

            <View style={styles.staffInfo}>
              <ThemedText style={[styles.staffName, { color: theme.text }]}>
                JUNAICA LAYNO
              </ThemedText>
              <ThemedText style={[styles.staffRole, { color: theme.textMuted }]}>
                ADMIN
              </ThemedText>
            </View>
          </View>

          {/* Thin Divider Line */}
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          {/* Navigation Items List */}
          <View style={styles.menuList}>
            {menuItems.map((item) => (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                accessibilityLabel={`Navigate to ${item.label}`}
                onPress={() => router.push(item.route)}
                style={({ pressed }) => [
                  styles.menuRow,
                  pressed && styles.pressed,
                ]}>
                {item.icon ? (
                  <View style={styles.iconBox}>
                    <SymbolView
                      name={item.icon}
                      size={IconSizes.md}
                      tintColor={theme.secondary}
                    />
                  </View>
                ) : (
                  <View style={styles.iconBox} />
                )}

                <ThemedText style={[styles.menuLabel, { color: theme.text }]}>
                  {item.label}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Staff Navigation Bar */}
      <DashboardNavBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'home') {
            router.push('/dashboard');
          } else if (tab === 'reports') {
            router.push('/reports');
          } else if (tab === 'profile') {
            router.push('/profile-settings');
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topNavbar: {
    width: '100%',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Platform.select({ ios: Spacing.two, default: Spacing.two }),
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
  closeButton: {
    padding: Spacing.one,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.six,
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Spacing.four,
  },
  staffBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
    paddingVertical: Spacing.two,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontSize: 24,
    fontWeight: FontWeights.bold,
  },
  staffInfo: {
    gap: 3,
  },
  staffName: {
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
    letterSpacing: 0.5,
  },
  staffRole: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.1,
  },
  divider: {
    width: '100%',
    height: 1,
  },
  menuList: {
    width: '100%',
    gap: Spacing.three,
    marginTop: Spacing.one,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
  },
  pressed: {
    opacity: 0.6,
  },
  iconBox: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.medium,
  },
});
