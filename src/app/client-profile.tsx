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

import { ClientHistoryItem } from '@/components/client-history-item';
import { DashboardNavBar, type DashboardTab } from '@/components/dashboard-nav-bar';
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

export default function ClientProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');

  const historyRecords = [
    {
      id: 'rec-1',
      date: 'Today',
      condition: 'Normal condition',
      porosity: 'Medium porosity',
      score: '84/100',
    },
    {
      id: 'rec-2',
      date: 'Jun 08',
      condition: 'Mild damage',
      porosity: 'Medium porosity',
      score: '84/100',
    },
    {
      id: 'rec-3',
      date: 'May 12',
      condition: 'Colored',
      porosity: 'Medium porosity',
      score: '84/100',
    },
  ];

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar style="dark" />

      {/* Top Navbar Header */}
      <View style={[styles.topNavbar, { borderBottomColor: theme.border }]}>
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
            <ThemedText style={[styles.brandTitle, { color: theme.text }]}>
              TressTech
            </ThemedText>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Navigation Menu"
            onPress={() => router.push('/')}
            style={styles.menuButton}>
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
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          {/* Back Navigation Link */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to clients"
            onPress={() => router.push('/dashboard')}
            style={styles.backRow}>
            <SymbolView
              name={{
                ios: 'arrow.left',
                android: 'arrow_back',
                web: 'arrow_back',
              }}
              size={IconSizes.sm}
              tintColor={theme.text}
            />
            <ThemedText style={[styles.backText, { color: theme.text }]}>
              Clients
            </ThemedText>
          </Pressable>

          {/* Profile Header Row */}
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
                CLIENT PROFILE
              </ThemedText>
              <ThemedText style={[styles.profileName, { color: theme.text }]}>
                Junaica
              </ThemedText>
              <ThemedText
                style={[styles.profileHandle, { color: theme.textSecondary }]}>
                niksmapagmahal
              </ThemedText>
            </View>
          </View>

          {/* Follow-up Flag Callout Box */}
          <View
            style={[
              styles.flagBox,
              {
                backgroundColor: theme.surfaceSecondary,
                borderColor: theme.primary,
              },
            ]}>
            <ThemedText style={[styles.flagOverline, { color: theme.primaryDark }]}>
              FOLLOW-UP FLAG
            </ThemedText>
            <ThemedText style={[styles.flagTitle, { color: theme.text }]}>
              High sensitivity — recurrent exposure
            </ThemedText>
            <ThemedText style={[styles.flagDesc, { color: theme.textSecondary }]}>
              Review chemical history before the next service.
            </ThemedText>
          </View>

          {/* Analysis History Section Header */}
          <View style={styles.historyHeader}>
            <ThemedText style={[styles.historyTitle, { color: theme.text }]}>
              Analysis history
            </ThemedText>
            <View
              style={[
                styles.recordsBadge,
                { borderColor: theme.primary },
              ]}>
              <ThemedText
                style={[styles.recordsBadgeText, { color: theme.primaryDark }]}>
                3 RECORDS
              </ThemedText>
            </View>
          </View>

          {/* History Records Stack */}
          <View style={styles.recordsStack}>
            {historyRecords.map((rec) => (
              <ClientHistoryItem
                key={rec.id}
                date={rec.date}
                condition={rec.condition}
                porosity={rec.porosity}
                score={rec.score}
                onPress={() => router.push('/analysis-results')}
              />
            ))}
          </View>

          {/* Start New Analysis Action Button */}
          <Button
            title="Start new analysis"
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => router.push('/new-analysis')}
            style={styles.actionButton}
            textStyle={styles.actionButtonText}
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
  menuButton: {
    padding: Spacing.one,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Spacing.four,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.medium,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 26,
    fontWeight: FontWeights.bold,
  },
  profileInfo: {
    gap: 2,
  },
  profileOverline: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  profileName: {
    fontSize: 26,
    fontWeight: FontWeights.bold,
  },
  profileHandle: {
    fontSize: Typography.small.fontSize,
  },
  flagBox: {
    width: '100%',
    padding: Spacing.four,
    borderRadius: BorderRadii.xl,
    borderWidth: 1.5,
    gap: Spacing.one,
  },
  flagOverline: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  flagTitle: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  flagDesc: {
    fontSize: Typography.small.fontSize,
    lineHeight: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.one,
  },
  historyTitle: {
    fontSize: Typography.subtitle.fontSize,
    fontWeight: FontWeights.bold,
  },
  recordsBadge: {
    borderWidth: 1,
    borderRadius: BorderRadii.full,
    paddingHorizontal: Spacing.three,
    paddingVertical: 4,
  },
  recordsBadgeText: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 0.8,
  },
  recordsStack: {
    width: '100%',
    gap: Spacing.three,
  },
  actionButton: {
    borderRadius: BorderRadii.pill,
    height: 52,
    marginTop: Spacing.two,
  },
  actionButtonText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.semiBold,
  },
});
