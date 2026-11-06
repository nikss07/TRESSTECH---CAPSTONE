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
import { ReportCard } from '@/components/report-card';
import { BrandWordmark } from '@/components/brand-wordmark';
import { ThemedText } from '@/components/themed-text';
import { SearchBar } from '@/components/ui/search-bar';
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

export default function ReportsScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<DashboardTab>('reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'damage' | 'flagged'>('all');

  const reports = [
    {
      id: 'rep-1',
      clientName: 'Maya Chen',
      date: 'Today',
      condition: 'Normal',
      porosity: 'Medium porosity',
      verdict: 'Proceed with caution',
      thumbnailColor: '#D1A563',
    },
    {
      id: 'rep-2',
      clientName: 'Jordan Lee',
      date: 'Jun 08',
      condition: 'Normal',
      porosity: 'Medium porosity',
      verdict: 'Proceed with caution',
      thumbnailColor: '#D1A563',
    },
    {
      id: 'rep-3',
      clientName: 'Priya Shah',
      date: 'May 24',
      condition: 'Normal',
      porosity: 'Medium porosity',
      verdict: 'Proceed with caution',
      thumbnailColor: '#D1A563',
    },
  ];

  const filteredReports = reports.filter((r) =>
    r.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            accessibilityLabel="Close analysis library"
            onPress={() => router.push('/dashboard')}
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
          {/* Header Block */}
          <View style={styles.headerBlock}>
            <ThemedText style={[styles.overline, { color: theme.primary }]}>
              REPORTS / HISTORY
            </ThemedText>

            <ThemedText style={[styles.heading, { color: theme.text }]}>
              Analysis library.
            </ThemedText>
          </View>

          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by client"
          />

          {/* Filter Pills */}
          <View style={styles.filterRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Show all dates"
              onPress={() => setFilter('all')}
              style={[
                styles.filterPill,
                filter === 'all'
                  ? { backgroundColor: theme.secondary }
                  : { borderColor: theme.border, borderWidth: 1 },
              ]}>
              <ThemedText
                style={[
                  styles.filterText,
                  {
                    color:
                      filter === 'all'
                        ? theme.secondaryText
                        : theme.textSecondary,
                  },
                ]}>
                All dates
              </ThemedText>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Filter by damage level"
              onPress={() => setFilter('damage')}
              style={[
                styles.filterPill,
                filter === 'damage'
                  ? { backgroundColor: theme.secondary }
                  : { borderColor: theme.border, borderWidth: 1 },
              ]}>
              <ThemedText
                style={[
                  styles.filterText,
                  {
                    color:
                      filter === 'damage'
                        ? theme.secondaryText
                        : theme.textSecondary,
                  },
                ]}>
                Damage level
              </ThemedText>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Filter by flagged"
              onPress={() => setFilter('flagged')}
              style={[
                styles.filterPill,
                filter === 'flagged'
                  ? { backgroundColor: theme.secondary }
                  : { borderColor: theme.border, borderWidth: 1 },
              ]}>
              <ThemedText
                style={[
                  styles.filterText,
                  {
                    color:
                      filter === 'flagged'
                        ? theme.secondaryText
                        : theme.textSecondary,
                  },
                ]}>
                Flagged
              </ThemedText>
            </Pressable>
          </View>

          {/* Reports List */}
          <View style={styles.reportsStack}>
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                clientName={report.clientName}
                date={report.date}
                condition={report.condition}
                porosity={report.porosity}
                verdict={report.verdict}
                thumbnailColor={report.thumbnailColor}
                onPress={() => router.push('/suggested-formula')}
              />
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
  headerBlock: {
    gap: Spacing.one,
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
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  filterPill: {
    paddingHorizontal: Spacing.four,
    paddingVertical: 8,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.medium,
  },
  reportsStack: {
    width: '100%',
    gap: Spacing.three,
    marginTop: Spacing.one,
  },
});
