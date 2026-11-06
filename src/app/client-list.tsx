import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ClientListItem } from '@/components/client-list-item';
import { DashboardNavBar, type DashboardTab } from '@/components/dashboard-nav-bar';
import { DashboardTopNavbar } from '@/components/dashboard-top-navbar';
import { ThemedText } from '@/components/themed-text';
import { AnimatedEntrance } from '@/components/ui/animated-entrance';
import { SearchBar } from '@/components/ui/search-bar';
import {
  BorderRadii,
  FontWeights,
  IconSizes,
  MaxContentWidth,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ClientListScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'followup' | 'normal'>('all');

  const allClients = [
    {
      id: 'c-1',
      name: 'Maya Chen',
      hairDetails: 'Wavy hair, medium porosity',
      initial: 'M',
      hasStatusDot: true,
      needsFollowup: true,
      email: 'maya@example.com',
    },
    {
      id: 'c-2',
      name: 'Jordan Lee',
      hairDetails: 'Virgin hair, low porosity',
      initial: 'J',
      hasStatusDot: false,
      needsFollowup: false,
      email: 'jordan@example.com',
    },
    {
      id: 'c-3',
      name: 'Priya Shah',
      hairDetails: 'Color-treated, needs moisture',
      initial: 'P',
      hasStatusDot: true,
      needsFollowup: true,
      email: 'priya@example.com',
    },
    {
      id: 'c-4',
      name: 'Elena Rostova',
      hairDetails: 'Fine hair, high porosity',
      initial: 'E',
      hasStatusDot: false,
      needsFollowup: false,
      email: 'elena.r@example.com',
    },
    {
      id: 'c-5',
      name: 'Marcus Vance',
      hairDetails: 'Coarse texture, low porosity',
      initial: 'M',
      hasStatusDot: false,
      needsFollowup: false,
      email: 'marcus.v@example.com',
    },
    {
      id: 'c-6',
      name: 'Sophia Williams',
      hairDetails: 'Bleached blonde, fragile elasticity',
      initial: 'S',
      hasStatusDot: true,
      needsFollowup: true,
      email: 'sophia.w@example.com',
    },
    {
      id: 'c-7',
      name: 'David Kim',
      hairDetails: 'Straight virgin hair, medium porosity',
      initial: 'D',
      hasStatusDot: false,
      needsFollowup: false,
      email: 'david.kim@example.com',
    },
    {
      id: 'c-8',
      name: 'Aaliyah Jackson',
      hairDetails: 'Type 4C tight curls, dry scalp',
      initial: 'A',
      hasStatusDot: false,
      needsFollowup: false,
      email: 'aaliyah.j@example.com',
    },
  ];

  const filteredClients = allClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.hairDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'followup') return client.needsFollowup;
    if (filter === 'normal') return !client.needsFollowup;
    return true;
  });

  const handleClientPress = (client: (typeof allClients)[0]) => {
    router.push({
      pathname: '/client-profile',
      params: { name: client.name, email: client.email },
    });
  };

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      router.push('/dashboard');
    } else if (tab === 'reports') {
      router.push('/reports');
    } else if (tab === 'profile') {
      router.push('/profile-settings');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar style="dark" />

      {/* 1. Top Navbar Header matching Dashboard */}
      <DashboardTopNavbar />

      {/* 2. Scrollable Client List Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          {/* Back to Dashboard Return Row (Matches /new-analysis) */}
          <AnimatedEntrance delay={0} duration={320} slideDistance={10}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Return to Dashboard"
              onPress={() => router.push('/dashboard')}
              style={({ pressed }) => [styles.backRow, pressed && styles.pressed]}>
              <SymbolView
                name={{
                  ios: 'arrow.left',
                  android: 'arrow_back',
                  web: 'arrow_back',
                }}
                size={IconSizes.sm}
                tintColor={theme.secondary}
              />
              <ThemedText style={[styles.backText, { color: theme.secondary }]}>
                Dashboard
              </ThemedText>
            </Pressable>
          </AnimatedEntrance>

          {/* Page Heading Block */}
          <AnimatedEntrance delay={80} duration={360} slideDistance={14}>
            <View style={styles.headerBlock}>
              <ThemedText style={[styles.overline, { color: theme.primary }]}>
                CLIENT DIRECTORY
              </ThemedText>
              <ThemedText style={[styles.heading, { color: theme.text }]}>
                Client list.
              </ThemedText>
              <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
                All 24 registered clients and their chemical treatment histories.
              </ThemedText>
            </View>
          </AnimatedEntrance>

          {/* Search Bar */}
          <AnimatedEntrance delay={140} duration={380} slideDistance={16}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search clients by name, email, or hair type"
            />
          </AnimatedEntrance>

          {/* Filter Pills Row (Single Row 3-Segment Layout) */}
          <AnimatedEntrance delay={200} duration={400} slideDistance={16}>
            <View style={styles.filterRow}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Show all clients"
                onPress={() => setFilter('all')}
                style={[
                  styles.filterPill,
                  filter === 'all'
                    ? { backgroundColor: theme.secondary }
                    : { borderColor: theme.border, borderWidth: 1, backgroundColor: '#FFFFFF' },
                ]}>
                <ThemedText
                  numberOfLines={1}
                  style={[
                    styles.filterText,
                    {
                      color: filter === 'all' ? theme.secondaryText : theme.textSecondary,
                      fontWeight: filter === 'all' ? FontWeights.bold : FontWeights.medium,
                    },
                  ]}>
                  All (8)
                </ThemedText>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Filter by to follow up"
                onPress={() => setFilter('followup')}
                style={[
                  styles.filterPill,
                  filter === 'followup'
                    ? { backgroundColor: theme.secondary }
                    : { borderColor: theme.border, borderWidth: 1, backgroundColor: '#FFFFFF' },
                ]}>
                <ThemedText
                  numberOfLines={1}
                  style={[
                    styles.filterText,
                    {
                      color: filter === 'followup' ? theme.secondaryText : theme.textSecondary,
                      fontWeight: filter === 'followup' ? FontWeights.bold : FontWeights.medium,
                    },
                  ]}>
                  To Follow Up (3)
                </ThemedText>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Filter by regular status"
                onPress={() => setFilter('normal')}
                style={[
                  styles.filterPill,
                  filter === 'normal'
                    ? { backgroundColor: theme.secondary }
                    : { borderColor: theme.border, borderWidth: 1, backgroundColor: '#FFFFFF' },
                ]}>
                <ThemedText
                  numberOfLines={1}
                  style={[
                    styles.filterText,
                    {
                      color: filter === 'normal' ? theme.secondaryText : theme.textSecondary,
                      fontWeight: filter === 'normal' ? FontWeights.bold : FontWeights.medium,
                    },
                  ]}>
                  Regular (5)
                </ThemedText>
              </Pressable>
            </View>
          </AnimatedEntrance>

          {/* Clients List Cards */}
          <AnimatedEntrance delay={260} duration={420} slideDistance={16}>
            <View style={styles.clientList}>
              {filteredClients.map((client) => (
                <ClientListItem
                  key={client.id}
                  name={client.name}
                  hairDetails={client.hairDetails}
                  initial={client.initial}
                  hasStatusDot={client.hasStatusDot}
                  onPress={() => handleClientPress(client)}
                />
              ))}

              {filteredClients.length === 0 && (
                <View style={[styles.emptyContainer, { borderColor: theme.borderSubtle }]}>
                  <ThemedText style={[styles.emptyTitle, { color: theme.text }]}>
                    No clients found
                  </ThemedText>
                  <ThemedText style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
                    Try searching with another keyword or adjust the filter.
                  </ThemedText>
                </View>
              )}
            </View>
          </AnimatedEntrance>
        </View>
      </ScrollView>

      {/* 3. Fixed Bottom Navigation Bar with Active Tab Indicator */}
      <DashboardNavBar activeTab={activeTab} onTabChange={handleTabChange} />
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
    gap: Spacing.four,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    alignSelf: 'flex-start',
    paddingVertical: Spacing.one,
  },
  pressed: {
    opacity: 0.7,
  },
  backText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.semiBold,
  },
  headerBlock: {
    gap: 2,
  },
  overline: {
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  heading: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: FontWeights.bold,
  },
  subtitle: {
    fontSize: Typography.body.fontSize,
    lineHeight: 22,
  },
  filterRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexWrap: 'nowrap',
  },
  filterPill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.one,
    paddingVertical: Spacing.two,
    borderRadius: BorderRadii.full,
  },
  filterText: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  clientList: {
    width: '100%',
    gap: Spacing.three,
  },
  emptyContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadii.xl,
    borderWidth: 1,
    padding: Spacing.six,
    alignItems: 'center',
    gap: Spacing.two,
  },
  emptyTitle: {
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
  },
  emptySubtitle: {
    fontSize: Typography.body.fontSize,
    textAlign: 'center',
  },
});
