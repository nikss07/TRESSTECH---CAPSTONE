import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ChemicalReferenceCard } from '@/components/chemical-reference-card';
import { DashboardNavBar, type DashboardTab } from '@/components/dashboard-nav-bar';
import { DashboardTopNavbar } from '@/components/dashboard-top-navbar';
import { ThemedText } from '@/components/themed-text';
import {
  FontWeights,
  MaxContentWidth,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ChemicalReferenceScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');

  const referenceData = [
    {
      id: 'ref-1',
      strength: '6% / 20 vol',
      liftLevel: 'Low to moderate lift',
      usage: 'Demi and tone-on-tone color',
    },
    {
      id: 'ref-2',
      strength: '9% / 30 vol',
      liftLevel: 'Up to 2–3 levels lift',
      usage: 'Permanent color',
    },
    {
      id: 'ref-3',
      strength: '12% / 40 vol',
      liftLevel: 'Use only with\nprofessional assessment',
      usage: 'High-lift services',
    },
  ];

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
          {/* Header Block */}
          <View style={styles.headerBlock}>
            <ThemedText style={[styles.overline, { color: theme.primary }]}>
              READ-ONLY LOOKUP
            </ThemedText>

            <ThemedText style={[styles.heading, { color: theme.text }]}>
              Chemical safety reference.
            </ThemedText>

            <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
              Quick thresholds for consultation. Always confirm with a strand test and professional judgment.
            </ThemedText>
          </View>

          {/* Reference Cards Stack */}
          <View style={styles.cardsStack}>
            {referenceData.map((item) => (
              <ChemicalReferenceCard
                key={item.id}
                strength={item.strength}
                liftLevel={item.liftLevel}
                usage={item.usage}
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
  subtitle: {
    fontSize: Typography.body.fontSize,
    lineHeight: 22,
    marginTop: 2,
  },
  cardsStack: {
    width: '100%',
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
});
