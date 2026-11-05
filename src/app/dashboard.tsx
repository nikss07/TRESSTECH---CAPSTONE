import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ActionBanner } from '@/components/action-banner';
import { ClientListItem } from '@/components/client-list-item';
import { DashboardNavBar, type DashboardTab } from '@/components/dashboard-nav-bar';
import { StaffHeader } from '@/components/staff-header';
import { StatCard } from '@/components/stat-card';
import { ThemedText } from '@/components/themed-text';
import {
  FontWeights,
  MaxContentWidth,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function StaffDashboardScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');

  const clients = [
    {
      id: 'client-1',
      name: 'Maya Chen',
      hairDetails: 'Wavy hair, medium porosity',
      initial: 'M',
      hasStatusDot: true,
    },
    {
      id: 'client-2',
      name: 'Jordan Lee',
      hairDetails: 'Virgin hair, low porosity',
      initial: 'J',
      hasStatusDot: false,
    },
    {
      id: 'client-3',
      name: 'Priya Shah',
      hairDetails: 'Color-treated, needs moisture',
      initial: 'P',
      hasStatusDot: true,
    },
  ];

  const handleNewAnalysis = () => {
    router.push('/new-analysis');
  };

  const handleClientPress = (name: string) => {
    if (Platform.OS === 'web') {
      window.alert(`Opening profile & chemical treatment history for ${name}.`);
    } else {
      Alert.alert(
        `${name}'s Profile`,
        'Loading trichology records, porosity history, and safe chemical treatment threshold reports.'
      );
    }
  };

  const handleViewAll = () => {
    if (Platform.OS === 'web') {
      window.alert('Viewing full client database (24 total clients).');
    } else {
      Alert.alert('Client Directory', 'Showing all 24 clients.');
    }
  };

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
    if (tab === 'reports') {
      if (Platform.OS === 'web') {
        window.alert('Reports tab: Viewing chemical safety & formulation reports.');
      } else {
        Alert.alert('Reports', 'Viewing chemical safety & formulation reports.');
      }
    } else if (tab === 'profile') {
      router.push('/signin');
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar style="dark" />

      {/* Scrollable Dashboard Body */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          {/* 1. Header with Logo & Staff Welcome */}
          <StaffHeader
            staffName="Nic"
            avatarLetter="A"
            onMenuPress={() => router.push('/')}
            onAvatarPress={() => router.push('/signin')}
          />

          {/* 2. "New analysis" Action Banner */}
          <ActionBanner
            title="New analysis"
            subtitle="Start with a client profile"
            onPress={handleNewAnalysis}
          />

          {/* 3. Metrics Summary Grid */}
          <View style={styles.metricsGrid}>
            <StatCard
              value="24"
              label="Analyses this week"
              variant="default"
            />
            <StatCard
              value="2"
              label="Needs follow-up"
              variant="highlight"
            />
          </View>

          {/* 4. Recent Clients Section */}
          <View style={styles.recentSection}>
            <View style={styles.sectionHeaderRow}>
              <ThemedText style={[styles.sectionTitle, { color: theme.text }]}>
                Recent clients
              </ThemedText>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="View all recent clients"
                onPress={handleViewAll}>
                <ThemedText
                  style={[styles.viewAllText, { color: theme.text }]}>
                  View all
                </ThemedText>
              </Pressable>
            </View>

            {/* Client Cards Stack */}
            <View style={styles.clientList}>
              {clients.map((client) => (
                <ClientListItem
                  key={client.id}
                  name={client.name}
                  hairDetails={client.hairDetails}
                  initial={client.initial}
                  hasStatusDot={client.hasStatusDot}
                  onPress={() => handleClientPress(client.name)}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 5. Fixed Staff Navigation Bar */}
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
    paddingTop: Platform.select({ ios: Spacing.two, default: Spacing.four }),
    paddingBottom: Spacing.six,
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Spacing.four,
  },
  metricsGrid: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  recentSection: {
    width: '100%',
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: Typography.subtitle.fontSize,
    fontWeight: FontWeights.bold,
  },
  viewAllText: {
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.medium,
    textDecorationLine: 'underline',
  },
  clientList: {
    width: '100%',
    gap: Spacing.three,
  },
});
