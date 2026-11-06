import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { DashboardNavBar, type DashboardTab } from '@/components/dashboard-nav-bar';
import { DashboardTopNavbar } from '@/components/dashboard-top-navbar';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import {
  BorderRadii,
  FontWeights,
  MaxContentWidth,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function AnalysisCompleteScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar style="dark" />

      {/* Top Navbar Header without hamburger menu during active analysis process */}
      <DashboardTopNavbar showMenu={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          {/* Success Check Circle */}
          <View
            style={[
              styles.checkCircle,
              { backgroundColor: theme.secondary },
            ]}>
            <SymbolView
              name={{
                ios: 'checkmark',
                android: 'check',
                web: 'check',
              }}
              size={36}
              weight="bold"
              tintColor={theme.primary}
            />
          </View>

          {/* Header Block */}
          <View style={styles.headerBlock}>
            <ThemedText style={[styles.overline, { color: theme.primary }]}>
              SAVED TO CLIENT RECORD
            </ThemedText>

            <ThemedText style={[styles.heading, { color: theme.text }]}>
              Analysis complete.
            </ThemedText>

            <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
              {"The analysis and chemical safety recommendation are now part of Junaica's history."}
            </ThemedText>
          </View>

          {/* Summary Card */}
          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.borderSubtle,
              },
            ]}>
            <View style={styles.summaryItem}>
              <ThemedText
                style={[styles.itemLabel, { color: theme.textMuted }]}>
                CLIENT
              </ThemedText>
              <ThemedText style={[styles.itemValue, { color: theme.text }]}>
                Junaica
              </ThemedText>
            </View>

            <View style={styles.summaryItem}>
              <ThemedText
                style={[styles.itemLabel, { color: theme.textMuted }]}>
                FOLLOW-UP FLAG
              </ThemedText>
              <ThemedText
                style={[styles.flagValue, { color: theme.primaryDark }]}>
                Recheck after next chemical service
              </ThemedText>
            </View>

            <View style={styles.summaryItem}>
              <ThemedText
                style={[styles.itemLabel, { color: theme.textMuted }]}>
                RECOMMENDATION
              </ThemedText>
              <ThemedText style={[styles.itemValue, { color: theme.text }]}>
                Proceed with caution · 6% / 20 vol
              </ThemedText>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonStack}>
            <Button
              title="View client profile"
              variant="primary"
              size="lg"
              fullWidth
              onPress={() => router.push('/client-profile')}
              style={styles.profileButton}
              textStyle={styles.profileButtonText}
            />

            <Button
              title="Back to dashboard"
              variant="outline"
              size="lg"
              fullWidth
              onPress={() => router.push('/dashboard')}
              style={[
                styles.dashboardButton,
                { borderColor: theme.secondary },
              ]}
              textStyle={[
                styles.dashboardButtonText,
                { color: theme.secondary },
              ]}
            />
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
          } else if (tab === 'profile') {
            router.push('/signin');
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
    alignItems: 'center',
    gap: Spacing.four,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.one,
  },
  headerBlock: {
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
  },
  overline: {
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  heading: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.body.fontSize,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 320,
  },
  summaryCard: {
    width: '100%',
    padding: Spacing.four,
    borderRadius: BorderRadii.xl,
    borderWidth: 1,
    gap: Spacing.three,
    ...(Shadows.sm as object),
  },
  summaryItem: {
    gap: 3,
  },
  itemLabel: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 0.8,
  },
  itemValue: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  flagValue: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  buttonStack: {
    width: '100%',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  profileButton: {
    borderRadius: BorderRadii.pill,
    height: 52,
  },
  profileButtonText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.semiBold,
  },
  dashboardButton: {
    borderRadius: BorderRadii.pill,
    height: 52,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },
  dashboardButtonText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.semiBold,
  },
});
