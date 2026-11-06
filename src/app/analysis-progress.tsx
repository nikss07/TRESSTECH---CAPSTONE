import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  AnalysisChecklist,
  type ChecklistStep,
} from '@/components/analysis-checklist';
import { DashboardNavBar, type DashboardTab } from '@/components/dashboard-nav-bar';
import { DashboardTopNavbar } from '@/components/dashboard-top-navbar';
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

export default function AnalysisProgressScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [progress, setProgress] = useState(0.55);
  const [isComplete, setIsComplete] = useState(false);

  const [steps, setSteps] = useState<ChecklistStep[]>([
    { id: '1', label: 'Image quality', status: 'completed' },
    { id: '2', label: 'Hair classification', status: 'completed' },
    { id: '3', label: 'Safety matching', status: 'in_progress' },
  ]);

  useEffect(() => {
    // Simulate real AI analysis completion progression
    const timer = setTimeout(() => {
      setProgress(1.0);
      setSteps([
        { id: '1', label: 'Image quality', status: 'completed' },
        { id: '2', label: 'Hair classification', status: 'completed' },
        { id: '3', label: 'Safety matching', status: 'completed' },
      ]);
      setIsComplete(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

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
          {/* Central TressTech Emblem */}
          <View style={styles.emblemContainer}>
            <Image
              source={require('@/assets/images/tresstechlogo.png')}
              style={styles.emblemImage}
              resizeMode="contain"
            />
          </View>

          {/* AI Analysis Titles */}
          <View style={styles.headerBlock}>
            <ThemedText style={[styles.overline, { color: theme.primary }]}>
              AI ANALYSIS IN PROGRESS
            </ThemedText>

            <View style={styles.headingGroup}>
              <ThemedText style={[styles.headingDark, { color: theme.text }]}>
                Reading the signs
              </ThemedText>
              <ThemedText style={[styles.headingGold, { color: theme.primary }]}>
                in their hair.
              </ThemedText>
            </View>

            <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
              Our model is reviewing texture, porosity, and visible chemical stress.
            </ThemedText>
          </View>

          {/* Horizontal Progress Bar */}
          <View style={styles.progressBarWrapper}>
            <View
              style={[
                styles.progressBarTrack,
                { backgroundColor: theme.border },
              ]}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    backgroundColor: theme.primary,
                    width: `${Math.round(progress * 100)}%`,
                  },
                ]}
              />
            </View>
          </View>

          {/* Checklist of Steps */}
          <AnalysisChecklist steps={steps} />

          {/* Completion Action */}
          {isComplete && (
            <View style={styles.completedBlock}>
              <Button
                title="View Analysis Results"
                variant="primary"
                size="lg"
                fullWidth
                onPress={() => {
                  router.push('/analysis-results');
                }}
                style={styles.completeButton}
                textStyle={styles.completeButtonText}
              />
            </View>
          )}
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
    justifyContent: 'center',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignItems: 'center',
    gap: Spacing.five,
  },
  emblemContainer: {
    width: 170,
    height: 170,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.two,
  },
  emblemImage: {
    width: 160,
    height: 160,
  },
  headerBlock: {
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
  },
  overline: {
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  headingGroup: {
    alignItems: 'center',
    marginTop: 2,
  },
  headingDark: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
  },
  headingGold: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.body.fontSize,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: Spacing.two,
    maxWidth: 340,
  },
  progressBarWrapper: {
    width: '100%',
    maxWidth: 320,
    paddingHorizontal: Spacing.two,
  },
  progressBarTrack: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  completedBlock: {
    width: '100%',
    maxWidth: 340,
    marginTop: Spacing.two,
  },
  completeButton: {
    borderRadius: BorderRadii.pill,
    height: 52,
  },
  completeButtonText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.semiBold,
  },
});
