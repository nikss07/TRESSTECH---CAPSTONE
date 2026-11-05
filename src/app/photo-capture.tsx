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
import {
  DashedUploadBox,
  type UploadState,
} from '@/components/dashed-upload-box';
import { QualityWarningCard } from '@/components/quality-warning-card';
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

export default function PhotoCaptureScreen() {
  const theme = useTheme();
  const router = useRouter();

  // Support idle, warning (needs refresh), and ready states
  const [uploadState, setUploadState] = useState<UploadState>('ready');
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');

  const guidanceItems = [
    'Face the camera directly',
    'Use bright, natural lighting',
    'Avoid filters and heavy styling products',
  ];

  const handleBoxPress = () => {
    // Cycle between states for interactive inspection: idle -> warning -> ready
    if (uploadState === 'idle') {
      setUploadState('warning');
    } else if (uploadState === 'warning') {
      setUploadState('ready');
    } else {
      setUploadState('idle');
    }
  };

  const handleReplace = () => {
    setUploadState('ready');
  };

  const handleContinue = () => {
    if (uploadState === 'ready') {
      router.push('/analysis-progress');
    }
  };

  const getOverline = () => {
    switch (uploadState) {
      case 'warning':
        return 'PHOTO NEEDS A REFRESH';
      case 'ready':
        return 'NEW ANALYSIS';
      case 'idle':
      default:
        return 'PHOTO CAPTURE';
    }
  };

  const getHeadline = () => {
    if (uploadState === 'warning') {
      return "Let's get a clearer photo.";
    }
    return "Let's understand your hair.";
  };

  const getSubtitle = () => {
    switch (uploadState) {
      case 'warning':
        return 'The image does not have enough detail for an accurate analysis.';
      case 'ready':
        return 'Upload a clear photo in natural light for the most accurate results.';
      case 'idle':
      default:
        return 'Capture a clear image so the analysis can identify condition, porosity, and damage.';
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar style="dark" />

      {/* Top Header Navbar */}
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
            accessibilityLabel="Back to client selection"
            onPress={() => router.push('/new-analysis')}
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
              Back
            </ThemedText>
          </Pressable>

          {/* Section Headings */}
          <View style={styles.headerBlock}>
            <ThemedText style={[styles.overline, { color: theme.primary }]}>
              {getOverline()}
            </ThemedText>

            <ThemedText style={[styles.heading, { color: theme.text }]}>
              {getHeadline()}
            </ThemedText>

            <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
              {getSubtitle()}
            </ThemedText>
          </View>

          {/* Interactive State Picker for Testing All 3 Designs */}
          <View style={styles.stateSelector}>
            <Pressable
              onPress={() => setUploadState('idle')}
              style={[
                styles.statePill,
                uploadState === 'idle' && {
                  backgroundColor: theme.secondary,
                },
              ]}>
              <ThemedText
                style={[
                  styles.statePillText,
                  {
                    color:
                      uploadState === 'idle'
                        ? theme.secondaryText
                        : theme.textSecondary,
                  },
                ]}>
                Idle / Capture
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={() => setUploadState('warning')}
              style={[
                styles.statePill,
                uploadState === 'warning' && {
                  backgroundColor: theme.secondary,
                },
              ]}>
              <ThemedText
                style={[
                  styles.statePillText,
                  {
                    color:
                      uploadState === 'warning'
                        ? theme.secondaryText
                        : theme.textSecondary,
                  },
                ]}>
                Quality Warning
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={() => setUploadState('ready')}
              style={[
                styles.statePill,
                uploadState === 'ready' && {
                  backgroundColor: theme.secondary,
                },
              ]}>
              <ThemedText
                style={[
                  styles.statePillText,
                  {
                    color:
                      uploadState === 'ready'
                        ? theme.secondaryText
                        : theme.textSecondary,
                  },
                ]}>
                Ready to Analyze
              </ThemedText>
            </Pressable>
          </View>

          {/* Dashed Upload Box */}
          <DashedUploadBox
            state={uploadState}
            fileName={
              uploadState === 'warning'
                ? 'Untitled design (4).png'
                : 'sample-hair-profile.jpg'
            }
            onPress={handleBoxPress}
            onReplace={handleReplace}
          />

          {/* Body Section: Warning Card OR Guidance List */}
          {uploadState === 'warning' ? (
            <QualityWarningCard />
          ) : (
            <View style={styles.guidanceBlock}>
              <ThemedText style={[styles.guidanceTitle, { color: theme.text }]}>
                {uploadState === 'ready' ? 'For best results' : 'Capture Guidance'}
              </ThemedText>

              <View style={styles.guidanceList}>
                {guidanceItems.map((item, idx) => (
                  <ThemedText
                    key={idx}
                    style={[styles.guidanceItem, { color: theme.textSecondary }]}>
                    {item}
                  </ThemedText>
                ))}
              </View>
            </View>
          )}

          {/* Bottom Action Button */}
          {uploadState === 'ready' ? (
            <Button
              title="Analyze My Hair"
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleContinue}
              style={styles.actionButton}
              textStyle={styles.actionButtonText}
            />
          ) : (
            <Button
              title="Continue to analysis →"
              variant="primary"
              size="lg"
              fullWidth
              disabled
              onPress={handleContinue}
              style={[
                styles.actionButton,
                { backgroundColor: theme.primaryLight, opacity: 0.8 },
              ]}
              textStyle={styles.actionButtonText}
            />
          )}
        </View>
      </ScrollView>

      {/* Fixed Staff Navigation Bar */}
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
  stateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  statePill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: 6,
    borderRadius: BorderRadii.full,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  statePillText: {
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.semiBold,
  },
  guidanceBlock: {
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  guidanceTitle: {
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
  },
  guidanceList: {
    gap: 6,
  },
  guidanceItem: {
    fontSize: Typography.body.fontSize,
    lineHeight: 22,
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
