import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { DashboardNavBar, type DashboardTab } from '@/components/dashboard-nav-bar';
import { DashboardTopNavbar } from '@/components/dashboard-top-navbar';
import { SettingsRow } from '@/components/settings-row';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import {
  BorderRadii,
  FontWeights,
  MaxContentWidth,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ProfileSettingsScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<DashboardTab>('profile');

  const handleLogout = () => {
    router.push('/signin');
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar style="dark" />

      {/* Top Navbar Header matching Dashboard */}
      <DashboardTopNavbar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          {/* Profile Identity Header */}
          <View style={styles.profileHeader}>
            <View
              style={[
                styles.avatarCircle,
                { backgroundColor: theme.secondary },
              ]}>
              <ThemedText
                style={[styles.avatarText, { color: theme.secondaryText }]}>
                J
              </ThemedText>
            </View>

            <View style={styles.profileInfo}>
              <ThemedText style={[styles.profileOverline, { color: theme.primary }]}>
                PROFILE / SETTINGS
              </ThemedText>
              <ThemedText style={[styles.profileName, { color: theme.text }]}>
                Junaica
              </ThemedText>
              <ThemedText
                style={[styles.profileHandle, { color: theme.textSecondary }]}>
                niksmapagmahal.staff
              </ThemedText>
            </View>
          </View>

          {/* Settings Items Stack */}
          <View style={styles.settingsList}>
            <SettingsRow
              label="Role"
              value="Staff"
              onPress={() => {}}
            />
            <SettingsRow
              label="Salon affiliation"
              value="Downtown Salon · Main branch"
              onPress={() => {}}
            />
            <SettingsRow
              label="Notifications"
              value="On · Follow-up reminders"
              onPress={() => {}}
            />
          </View>

          {/* Log out Button */}
          <Button
            title="Log out"
            variant="outline"
            size="lg"
            fullWidth
            onPress={handleLogout}
            style={[styles.logoutButton, { borderColor: theme.secondary }]}
            textStyle={[styles.logoutText, { color: theme.secondary }]}
          />
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
    gap: Spacing.five,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: FontWeights.bold,
  },
  profileInfo: {
    gap: 3,
  },
  profileOverline: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  profileName: {
    fontSize: 28,
    fontWeight: FontWeights.bold,
  },
  profileHandle: {
    fontSize: Typography.small.fontSize,
  },
  settingsList: {
    width: '100%',
    marginTop: Spacing.two,
  },
  logoutButton: {
    borderRadius: BorderRadii.pill,
    height: 52,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    marginTop: Spacing.four,
  },
  logoutText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.semiBold,
  },
});
