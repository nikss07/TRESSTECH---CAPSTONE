import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { ClinicalSection } from '@/components/clinical-section';
import { HeroSection } from '@/components/hero-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { LandingFooter } from '@/components/landing-footer';
import { LandingHeader } from '@/components/landing-header';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const scrollViewRef = useRef<any>(null);

  const handleGetStarted = () => {
    router.push('/signin');
  };

  const handleScrollToFeatures = () => {
    scrollViewRef.current?.scrollTo({ y: 560, animated: true });
  };

  const handleScrollToHowItWorks = () => {
    scrollViewRef.current?.scrollTo({ y: 560, animated: true });
  };

  const handleScrollToClinical = () => {
    scrollViewRef.current?.scrollTo({ y: 880, animated: true });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar style="dark" />

      {/* Sticky Brand Navigation Header */}
      <LandingHeader
        onGetStartedPress={handleGetStarted}
        onFeaturesPress={handleScrollToFeatures}
        onHowItWorksPress={handleScrollToHowItWorks}
        onClinicalPress={handleScrollToClinical}
      />

      {/* Main Scrollable Landing Experience */}
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* 1. Hero Section with Green Gradient & 4 Hair Types Image */}
        <HeroSection
          onGetStartedPress={handleGetStarted}
          onFeaturesPress={handleScrollToFeatures}
        />

        {/* 2. "How It Works" Section with Warm EDE4D3 Background */}
        <HowItWorksSection />

        {/* 3. "Clinical Credibility, Validated by Experts" Section with 10s Carousel */}
        <ClinicalSection />

        {/* 4. Branded Dark Footer with Navigation & Social Links */}
        <LandingFooter />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
