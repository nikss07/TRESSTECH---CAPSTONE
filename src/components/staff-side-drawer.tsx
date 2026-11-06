import { usePathname, useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { SideDrawer } from '@/components/ui/side-drawer';
import {
  BorderRadii,
  FontWeights,
  IconSizes,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type StaffSideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  staffName?: string;
  staffRole?: string;
  staffInitial?: string;
};

export function StaffSideDrawer({
  isOpen,
  onClose,
  staffName = 'JUNAICA LAYNO',
  staffRole = 'ADMIN',
  staffInitial = 'J',
}: StaffSideDrawerProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const isItemActive = (id: string) => {
    if (id === 'dashboard') {
      return pathname === '/dashboard' || pathname === '/';
    }
    if (id === 'clients') {
      return (
        pathname === '/client-list' ||
        pathname === '/client-profile' ||
        pathname === '/new-analysis'
      );
    }
    if (id === 'reports') {
      return pathname === '/reports';
    }
    if (id === 'chemical-safety') {
      return pathname === '/chemical-reference';
    }
    if (id === 'profile-settings') {
      return pathname === '/profile-settings';
    }
    return false;
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: { ios: 'house', android: 'home', web: 'home' } as const,
      onPress: () => {
        onClose();
        router.push('/dashboard');
      },
    },
    {
      id: 'clients',
      label: 'Clients',
      icon: { ios: 'person', android: 'person', web: 'person' } as const,
      onPress: () => {
        onClose();
        router.push('/client-list');
      },
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: { ios: 'doc.text', android: 'description', web: 'description' } as const,
      onPress: () => {
        onClose();
        router.push('/reports');
      },
    },
    {
      id: 'chemical-safety',
      label: 'Chemical Safety Reference',
      icon: { ios: 'shield', android: 'shield', web: 'shield' } as const,
      onPress: () => {
        onClose();
        router.push('/chemical-reference');
      },
    },
    {
      id: 'profile-settings',
      label: 'Profile & Settings',
      icon: { ios: 'gearshape', android: 'settings', web: 'settings' } as const,
      onPress: () => {
        onClose();
        router.push('/profile-settings');
      },
    },
  ];

  return (
    <SideDrawer
      isOpen={isOpen}
      onClose={onClose}
      showDefaultHeader
      width={Platform.OS === 'web' ? 340 : '82%'}
      maxWidth={360}>
      <View style={styles.container}>
        {/* Staff Profile Header */}
        <View style={styles.profileSection}>
          <View style={[styles.avatarCircle, { backgroundColor: theme.secondary }]}>
            <ThemedText style={[styles.avatarInitial, { color: theme.secondaryText }]}>
              {staffInitial}
            </ThemedText>
          </View>
          <View style={styles.profileInfo}>
            <ThemedText style={[styles.staffName, { color: theme.text }]}>
              {staffName}
            </ThemedText>
            <ThemedText style={[styles.staffRole, { color: theme.textSecondary }]}>
              {staffRole}
            </ThemedText>
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {/* Navigation Items List */}
        <View style={styles.navLinks}>
          {navItems.map((item) => {
            const active = isItemActive(item.id);
            return (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                accessibilityLabel={`Navigate to ${item.label}`}
                accessibilityState={{ selected: active }}
                onPress={item.onPress}
                style={({ pressed }) => [
                  styles.navItem,
                  pressed && styles.navItemPressed,
                ]}>
                <SymbolView
                  name={item.icon}
                  size={IconSizes.md}
                  tintColor={theme.secondary}
                />
                <ThemedText
                  style={[
                    styles.navLabel,
                    { color: theme.secondary },
                    active && styles.navLabelActive,
                  ]}>
                  {item.label}
                </ThemedText>
                {active && (
                  <View
                    style={[
                      styles.activeDot,
                      { backgroundColor: theme.primary },
                    ]}
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </SideDrawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.four,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
  },
  profileInfo: {
    gap: 2,
  },
  staffName: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
    letterSpacing: 0.5,
  },
  staffRole: {
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.medium,
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    marginHorizontal: Spacing.four,
    marginBottom: Spacing.four,
  },
  navLinks: {
    flex: 1,
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
  },
  activeDot: {
    marginLeft: 'auto',
    width: 6,
    height: 6,
    borderRadius: BorderRadii.full,
  },
  navItemPressed: {
    opacity: 0.65,
  },
  navLabel: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.medium,
  },
  navLabelActive: {
    fontWeight: FontWeights.bold,
  },
});
