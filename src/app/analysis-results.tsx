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

import { ClassificationCard } from '@/components/classification-card';
import { DashboardNavBar, type DashboardTab } from '@/components/dashboard-nav-bar';
import { DashboardTopNavbar } from '@/components/dashboard-top-navbar';
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

export default function AnalysisResultsScreen() {
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
          {/* Back Navigation Link */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to analysis"
            onPress={() => router.push('/photo-capture')}
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
              Analysis
            </ThemedText>
          </Pressable>

          {/* Header Block */}
          <View style={styles.headerBlock}>
            <ThemedText style={[styles.overline, { color: theme.primary }]}>
              IMAGE RESULTS
            </ThemedText>

            <ThemedText style={[styles.heading, { color: theme.text }]}>
              Profile classified.
            </ThemedText>

            <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
              Review the four classification outputs before choosing a service.
            </ThemedText>
          </View>

          {/* Classification Output Cards */}
          <View style={styles.cardsStack}>
            <ClassificationCard
              category="Hair condition"
              value="Normal"
              description="Healthy shine and balanced texture."
              iconType="letter"
              iconLetter="W"
              iconBgColor="#DDD2C1"
            />

            <ClassificationCard
              category="Porosity"
              value="Medium"
              description="Cuticles absorb and hold moisture well."
              iconType="porosity"
              iconBgColor="#DFC085"
            />

            <ClassificationCard
              category="Damage level"
              value="Mild"
              description="Low-level dryness at the ends."
              iconType="damage"
              iconBgColor="#C3CEBE"
            />
          </View>

          {/* Primary CTA */}
          <Button
            title="Choose desired color →"
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => router.push('/desired-color')}
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
  cardsStack: {
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
