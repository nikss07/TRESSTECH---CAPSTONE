import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { DashboardNavBar, type DashboardTab } from '@/components/dashboard-nav-bar';
import { DashboardTopNavbar } from '@/components/dashboard-top-navbar';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import {
  BorderRadii,
  Dimensions,
  FontWeights,
  IconSizes,
  MaxContentWidth,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function DesiredColorScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [desiredShade, setDesiredShade] = useState('');
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');

  const handleSubmit = () => {
    router.push('/suggested-formula');
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
            accessibilityLabel="Back to image results"
            onPress={() => router.push('/analysis-results')}
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
              Image results
            </ThemedText>
          </Pressable>

          {/* Header Block */}
          <View style={styles.headerBlock}>
            <ThemedText style={[styles.overline, { color: theme.primary }]}>
              DESIRED COLOR
            </ThemedText>

            <ThemedText style={[styles.heading, { color: theme.text }]}>
              What color does the client want?
            </ThemedText>

            <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
              {"Enter the client's target shade or service. We'll compare it with their hair profile next."}
            </ThemedText>
          </View>

          {/* Desired Shade Input Field */}
          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.fieldLabel, { color: theme.text }]}>
              Desired shade / service
            </ThemedText>
            <TextInput
              value={desiredShade}
              onChangeText={setDesiredShade}
              placeholder="e.g. honey blonde gloss"
              placeholderTextColor={theme.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: theme.surfaceSecondary,
                  borderColor: theme.secondary,
                  color: theme.text,
                },
              ]}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Color Consultation Guidance Card */}
          <View
            style={[
              styles.consultCard,
              { backgroundColor: theme.backgroundElement },
            ]}>
            <ThemedText style={[styles.consultTitle, { color: theme.text }]}>
              Color consultation
            </ThemedText>
            <ThemedText
              style={[styles.consultDesc, { color: theme.textSecondary }]}>
              Be specific about the shade, tone, and service. Example: warm honey blonde, demi-permanent gloss.
            </ThemedText>
          </View>

          {/* Primary CTA */}
          <Button
            title="See suggested formula →"
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleSubmit}
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
  fieldGroup: {
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  fieldLabel: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  input: {
    width: '100%',
    height: Dimensions.inputHeight,
    borderRadius: BorderRadii.md,
    borderWidth: 1.5,
    paddingHorizontal: Spacing.four,
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.regular,
  },
  consultCard: {
    width: '100%',
    padding: Spacing.four,
    borderRadius: BorderRadii.xl,
    gap: Spacing.two,
  },
  consultTitle: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  consultDesc: {
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
