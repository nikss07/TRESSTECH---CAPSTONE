import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import {
  BorderRadii,
  FontWeights,
  IconSizes,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type UploadState = 'idle' | 'warning' | 'ready';

export type DashedUploadBoxProps = {
  state: UploadState;
  fileName?: string;
  onPress?: () => void;
  onReplace?: () => void;
};

export function DashedUploadBox({
  state,
  fileName,
  onPress,
  onReplace,
}: DashedUploadBoxProps) {
  const theme = useTheme();

  const getContainerStyle = () => {
    switch (state) {
      case 'warning':
        return {
          backgroundColor: theme.uploadBgWarning,
          borderColor: theme.uploadBorderWarning,
        };
      case 'ready':
        return {
          backgroundColor: theme.uploadBgReady,
          borderColor: theme.uploadBorderReady,
        };
      case 'idle':
      default:
        return {
          backgroundColor: theme.uploadBgIdle,
          borderColor: theme.uploadBorderIdle,
        };
    }
  };

  const renderIcon = () => {
    switch (state) {
      case 'warning':
        return (
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: theme.uploadWarningIconBg },
            ]}>
            <SymbolView
              name={{
                ios: 'xmark',
                android: 'close',
                web: 'close',
              }}
              size={IconSizes.md}
              weight="bold"
              tintColor="#FFFFFF"
            />
          </View>
        );
      case 'ready':
        return (
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: theme.uploadReadyIconBg },
            ]}>
            <SymbolView
              name={{
                ios: 'checkmark',
                android: 'check',
                web: 'check',
              }}
              size={IconSizes.md}
              weight="bold"
              tintColor="#FFFFFF"
            />
          </View>
        );
      case 'idle':
      default:
        return (
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: theme.secondary },
            ]}>
            <SymbolView
              name={{
                ios: 'arrow.up',
                android: 'arrow_upward',
                web: 'arrow_upward',
              }}
              size={IconSizes.md}
              weight="bold"
              tintColor="#FFFFFF"
            />
          </View>
        );
    }
  };

  const getTitle = () => {
    switch (state) {
      case 'warning':
        return 'Photo needs attention';
      case 'ready':
        return 'Photo ready to analyze';
      case 'idle':
      default:
        return 'Upload a hair photo';
    }
  };

  const getSubtitle = () => {
    switch (state) {
      case 'warning':
        return fileName ?? 'Untitled design (4).png';
      case 'ready':
        return fileName ?? 'sample-hair-profile.jpg';
      case 'idle':
      default:
        return 'Tap to choose from your device';
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={getTitle()}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        getContainerStyle(),
        pressed && styles.pressed,
      ]}>
      {renderIcon()}

      <ThemedText style={[styles.title, { color: theme.text }]}>
        {getTitle()}
      </ThemedText>

      <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
        {getSubtitle()}
      </ThemedText>

      {state === 'warning' && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Replace photo"
          onPress={(e) => {
            e.stopPropagation?.();
            if (onReplace) {
              onReplace();
            } else {
              onPress?.();
            }
          }}
          style={styles.replaceRow}>
          <SymbolView
            name={{
              ios: 'arrow.triangle.2.circlepath',
              android: 'refresh',
              web: 'refresh',
            }}
            size={IconSizes.xs}
            tintColor={theme.text}
          />
          <ThemedText style={[styles.replaceText, { color: theme.text }]}>
            Replace photo
          </ThemedText>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 220,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: BorderRadii.xl,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.one,
  },
  title: {
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.small.fontSize,
    textAlign: 'center',
  },
  replaceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    marginTop: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  replaceText: {
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.medium,
    textDecorationLine: 'underline',
  },
});
