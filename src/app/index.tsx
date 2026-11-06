import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import { ClinicalSection } from '@/components/clinical-section';
import { HeroSection } from '@/components/hero-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { LandingFooter } from '@/components/landing-footer';
import { LandingHeader } from '@/components/landing-header';
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button';
import { BrandColors } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<any>(null);
  const { height: windowHeight } = useWindowDimensions();

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [howItWorksVisible, setHowItWorksVisible] = useState(false);
  const [clinicalVisible, setClinicalVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  // Dynamic layout coordinates for each section
  const sectionPositions = useRef({
    howItWorks: 550,
    clinical: 1050,
    footer: 1550,
  });

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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollTop(offsetY > 280);

    const triggerThreshold = offsetY + windowHeight * 0.88;

    if (!howItWorksVisible && triggerThreshold >= sectionPositions.current.howItWorks) {
      setHowItWorksVisible(true);
    }
    if (!clinicalVisible && triggerThreshold >= sectionPositions.current.clinical) {
      setClinicalVisible(true);
    }
    if (!footerVisible && triggerThreshold >= sectionPositions.current.footer) {
      setFooterVisible(true);
    }
  };

  const handleScrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={[styles.safeArea, { backgroundColor: BrandColors.headerBg }]}>
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
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}>
        {/* 1. Hero Section with Green Gradient & 4 Hair Types Image (Animates on load) */}
        <HeroSection
          onGetStartedPress={handleGetStarted}
          onFeaturesPress={handleScrollToFeatures}
        />

        {/* 2. "How It Works" Section with Warm EDE4D3 Background (Animates on scroll) */}
        <View
          onLayout={(e) => {
            sectionPositions.current.howItWorks = e.nativeEvent.layout.y;
            if (windowHeight * 0.88 >= e.nativeEvent.layout.y) {
              setHowItWorksVisible(true);
            }
          }}>
          <HowItWorksSection visible={howItWorksVisible} />
        </View>

        {/* 3. "Clinical Credibility, Validated by Experts" Section with 10s Carousel (Animates on scroll) */}
        <View
          onLayout={(e) => {
            sectionPositions.current.clinical = e.nativeEvent.layout.y;
            if (windowHeight * 0.88 >= e.nativeEvent.layout.y) {
              setClinicalVisible(true);
            }
          }}>
          <ClinicalSection visible={clinicalVisible} />
        </View>

        {/* 4. Branded Dark Footer with Navigation & Social Links (Animates on scroll) */}
        <View
          onLayout={(e) => {
            sectionPositions.current.footer = e.nativeEvent.layout.y;
            if (windowHeight * 0.95 >= e.nativeEvent.layout.y) {
              setFooterVisible(true);
            }
          }}>
          <LandingFooter visible={footerVisible} />
        </View>
      </ScrollView>

      {/* Smooth Reusable Floating Scroll-To-Top Button */}
      <ScrollToTopButton
        visible={showScrollTop}
        onPress={handleScrollToTop}
      />
    </View>
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
