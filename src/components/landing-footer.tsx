import { Image, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadii, FontWeights, MaxContentWidth, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function LandingFooter() {
  const theme = useTheme();

  const links = ['About', 'Features', 'Pricing', 'Contact', 'Privacy Policy'];
  const socials = ['in', 'ig', 'x'];

  return (
    <View style={[styles.footerContainer, { backgroundColor: theme.secondary }]}>
      <View style={styles.footerContent}>
        {/* Brand and Copyright Header */}
        <View style={styles.brandRow}>
          <View style={styles.brandLeft}>
            <Image
              source={require('@/assets/images/tresstechlogo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <ThemedText style={styles.brandTitle}>TressTech</ThemedText>
          </View>
          <ThemedText style={styles.copyrightText}>© 2024</ThemedText>
        </View>

        {/* Navigation Links */}
        <View style={styles.linksRow}>
          {links.map((link) => (
            <Pressable key={link} accessibilityRole="button">
              <ThemedText style={styles.linkText}>{link}</ThemedText>
            </Pressable>
          ))}
        </View>

        {/* Social Icons / Chips */}
        <View style={styles.socialsRow}>
          {socials.map((social) => (
            <Pressable
              key={social}
              accessibilityRole="button"
              style={[
                styles.socialCircle,
                { backgroundColor: theme.backgroundElement },
              ]}>
              <ThemedText style={styles.socialText}>{social}</ThemedText>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.four,
  },
  footerContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Spacing.four,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  logoImage: {
    width: 24,
    height: 24,
    borderRadius: BorderRadii.full,
  },
  brandTitle: {
    color: '#EDE4D6',
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
  },
  copyrightText: {
    color: 'rgba(237, 228, 214, 0.7)',
    fontSize: Typography.caption.fontSize,
  },
  linksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  linkText: {
    color: 'rgba(237, 228, 214, 0.85)',
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.medium,
  },
  socialsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  socialCircle: {
    width: 30,
    height: 30,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    color: '#EDE4D6',
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.bold,
  },
});
