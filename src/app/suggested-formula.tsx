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

import { DashboardNavBar, type DashboardTab } from '@/components/dashboard-nav-bar';
import { DashboardTopNavbar } from '@/components/dashboard-top-navbar';
import { FormulaMetricCard } from '@/components/formula-metric-card';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { VerdictCard } from '@/components/verdict-card';
import {
  BorderRadii,
  FontWeights,
  IconSizes,
  MaxContentWidth,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function SuggestedFormulaScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');

  const handleAftercare = () => {
    router.push('/analysis-complete');
  };

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
          {/* Back Navigation Link */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to desired color"
            onPress={() => router.push('/desired-color')}
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
              Desired color
            </ThemedText>
          </Pressable>

          {/* Header Block */}
          <View style={styles.headerBlock}>
            <ThemedText style={[styles.overline, { color: theme.primary }]}>
              CHEMICAL SAFETY
            </ThemedText>

            <ThemedText style={[styles.heading, { color: theme.text }]}>
              Suggested formula.
            </ThemedText>

            <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
              {"Based on the client's normal condition, medium porosity, colored history, and mild damage."}
            </ThemedText>
          </View>

          {/* Verdict Card */}
          <VerdictCard
            verdictTitle="Proceed with Caution"
            verdictSubtitle="Use a gentle formula and complete a strand test before service."
          />

          {/* Metric Summary Grid (3 Cards) */}
          <View style={styles.metricsRow}>
            <FormulaMetricCard
              label="Suggested oxidizer"
              value="6% / 20 vol"
            />
            <FormulaMetricCard
              label="Mixture ratio"
              value="1 : 1"
            />
            <FormulaMetricCard
              label="Max processing"
              value="30 min"
            />
          </View>

          {/* Explanation Card */}
          <View
            style={[
              styles.reasonCard,
              { backgroundColor: theme.backgroundElement },
            ]}>
            <ThemedText style={[styles.reasonTitle, { color: theme.text }]}>
              Why this recommendation
            </ThemedText>
            <ThemedText
              style={[styles.reasonDesc, { color: theme.textSecondary }]}>
              Medium porosity can accept color well, but previous color and mild damage call for a lower-strength oxidizer.
            </ThemedText>
          </View>

          {/* Primary CTA */}
          <Button
            title="See aftercare plan →"
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleAftercare}
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
  metricsRow: {
    width: '100%',
    flexDirection: 'row',
    gap: Spacing.two,
  },
  reasonCard: {
    width: '100%',
    padding: Spacing.four,
    borderRadius: BorderRadii.xl,
    gap: Spacing.two,
  },
  reasonTitle: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  reasonDesc: {
    fontSize: Typography.small.fontSize,
    lineHeight: 20,
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
