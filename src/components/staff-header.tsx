import { SymbolView } from 'expo-symbols';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { BrandWordmark } from '@/components/brand-wordmark';
import { ThemedText } from '@/components/themed-text';
import {
  BorderRadii,
  BrandColors,
  FontWeights,
  IconSizes,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type StaffHeaderProps = {
  staffName?: string;
  avatarLetter?: string;
  onMenuPress?: () => void;
  onAvatarPress?: () => void;
};

export function StaffHeader({
  staffName = 'Nic',
  avatarLetter = 'A',
  onMenuPress,
  onAvatarPress,
}: StaffHeaderProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Top Navbar */}
      <View style={styles.navRow}>
        <View style={styles.brandGroup}>
          <Image
            source={require('@/assets/images/tresstechlogo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <BrandWordmark style={styles.brandTitle} />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dashboard Menu"
          onPress={onMenuPress}
          style={({ pressed }) => [styles.menuButton, pressed && styles.pressed]}>
          <SymbolView
            name={{
              ios: 'line.3.horizontal',
              android: 'menu',
              web: 'menu',
            }}
            size={IconSizes.md}
            tintColor={BrandColors.solid}
          />
        </Pressable>
      </View>

      {/* Staff Greeting Block */}
      <View style={styles.greetingBlock}>
        <ThemedText style={[styles.overline, { color: theme.primary }]}>
          STAFF DASHBOARD
        </ThemedText>

        <View style={styles.headingRow}>
          <ThemedText style={[styles.greetingTitle, { color: theme.text }]}>
            Good morning, {staffName}
          </ThemedText>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Staff profile for ${staffName}`}
            onPress={onAvatarPress}
            style={[styles.avatarCircle, { backgroundColor: theme.secondary }]}>
            <ThemedText
              style={[styles.avatarText, { color: theme.secondaryText }]}>
              {avatarLetter}
            </ThemedText>
          </Pressable>
        </View>

        <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
          Make every treatment decision with confidence.
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: Spacing.four,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.one,
  },
  brandGroup: {
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
  pressed: {
    opacity: 0.6,
  },
  greetingBlock: {
    gap: Spacing.one,
  },
  overline: {
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greetingTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: FontWeights.bold,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
  },
  subtitle: {
    fontSize: Typography.body.fontSize,
    lineHeight: 22,
    marginTop: 2,
  },
});
