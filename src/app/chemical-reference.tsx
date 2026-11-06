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

import { ChemicalReferenceCard } from '@/components/chemical-reference-card';
import { DashboardNavBar, type DashboardTab } from '@/components/dashboard-nav-bar';
import { BrandWordmark } from '@/components/brand-wordmark';
import { ThemedText } from '@/components/themed-text';
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
            accessibilityLabel="Close chemical reference"
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
