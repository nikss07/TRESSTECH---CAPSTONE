import { FontAwesome6 } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { AppVersion } from '@/constants/app-version';
import {
  BorderRadii,
  BrandColors,
  FontWeights,
  MaxContentWidth,
  Spacing,
  Typography,
} from '@/constants/theme';

export type LandingFooterProps = {
  visible?: boolean;
};

export function LandingFooter({ visible = true }: LandingFooterProps) {
  const [footerAnim] = useState(() => new Animated.Value(0));
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (visible && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      Animated.timing(footerAnim, {
        toValue: 1,
        duration: 450,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    }
  }, [footerAnim, visible]);

  const links = ['About', 'Features', 'Pricing', 'Contact', 'Privacy Policy'];

  const socials: {
    id: string;
    label: string;
    icon: 'linkedin-in' | 'instagram' | 'x-twitter';
    size: number;
  }[] = [
    { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin-in', size: 15 },
    { id: 'instagram', label: 'Instagram', icon: 'instagram', size: 15 },
    { id: 'x', label: 'X (Twitter)', icon: 'x-twitter', size: 14 },
  ];

  return (
    <View style={styles.footerContainer}>
      <Animated.View
        style={[
          styles.footerContent,
          {
            opacity: footerAnim,
            transform: [
              {
                translateY: footerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [18, 0],
                }),
              },
            ],
          },
        ]}>
        {/* Top Header Row: Brand Title Left, Version, Copyright Right */}
        <View style={styles.brandRow}>
          <View style={styles.brandTitleGroup}>
            <ThemedText style={styles.brandTitle}>TressTech</ThemedText>
            <View style={styles.versionPill}>
              <ThemedText style={styles.versionText}>{AppVersion}</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.copyrightText}>© 2024</ThemedText>
        </View>

        {/* Navigation Links Row */}
        <View style={styles.linksRow}>
          {links.map((link) => (
            <Pressable
              key={link}
              accessibilityRole="button"
              accessibilityLabel={link}
              hitSlop={8}>
              <ThemedText style={styles.linkText}>{link}</ThemedText>
            </Pressable>
          ))}
        </View>

        {/* Social Media Icon Circles Row */}
        <View style={styles.socialsRow}>
          {socials.map((social) => (
            <Pressable
              key={social.id}
              accessibilityRole="button"
              accessibilityLabel={social.label}
              style={styles.socialCircle}>
              <FontAwesome6
                name={social.icon}
                size={social.size}
                color="#EDE4D6"
              />
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: BrandColors.footerBg, // Deep spruce/forest green #0F3D3A from storyboard
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.four,
  },
  footerContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Spacing.three,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  brandTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  brandTitle: {
    color: '#EDE4D6',
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
    letterSpacing: -0.2,
  },
  versionPill: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: BorderRadii.pill,
    backgroundColor: 'rgba(204, 159, 77, 0.16)', // Subtle warm gold translucent fill
    borderWidth: 1,
    borderColor: 'rgba(204, 159, 77, 0.45)', // Gold border
  },
  versionText: {
    color: '#E5BD78', // Crisp warm gold
    fontSize: 11,
    fontWeight: FontWeights.semiBold,
    letterSpacing: 0.4,
  },
  copyrightText: {
    color: 'rgba(237, 228, 214, 0.75)',
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.regular,
  },
  linksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    marginTop: Spacing.one,
  },
  linkText: {
    color: 'rgba(237, 228, 214, 0.85)',
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.regular,
  },
  socialsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  socialCircle: {
    width: 36,
    height: 36,
    borderRadius: BorderRadii.full,
    backgroundColor: BrandColors.footerSocialBg, // #2C5552 from storyboard
    alignItems: 'center',
    justifyContent: 'center',
  },
});
