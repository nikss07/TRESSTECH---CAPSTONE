import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

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

export type PermissionRequestViewProps = {
  onRequestPermission: () => void;
  onChooseLibrary: () => void;
  onCancel: () => void;
};

export function PermissionRequestView({
  onRequestPermission,
  onChooseLibrary,
  onCancel,
}: PermissionRequestViewProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.contentWrapper}>
        {/* Camera Icon Circle */}
        <View style={[styles.iconCircle, { backgroundColor: theme.secondary }]}>
          <SymbolView
            name={{
              ios: 'camera.fill',
              android: 'photo_camera',
              web: 'photo_camera',
            }}
            size={IconSizes.lg}
            tintColor={theme.primary}
          />
        </View>

        {/* Headings */}
        <View style={styles.textBlock}>
          <ThemedText style={[styles.overline, { color: theme.primary }]}>
            CAMERA ACCESS REQUIRED
          </ThemedText>

          <ThemedText style={[styles.title, { color: theme.text }]}>
            Enable rear camera for hair assessment.
          </ThemedText>

          <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
            {"TressTech uses your device's high-definition back camera to examine hair fiber condition, porosity, and chemical stress across 5 essential angles."}
          </ThemedText>
        </View>

        {/* Benefits / Guidance List */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.borderSubtle }]}>
          <ThemedText style={[styles.itemText, { color: theme.text }]}>
            • High-resolution rear camera for fine cuticle detection
          </ThemedText>
          <ThemedText style={[styles.itemText, { color: theme.text }]}>
            • Guided 5-angle sequential hair capture
          </ThemedText>
          <ThemedText style={[styles.itemText, { color: theme.text }]}>
            • Real-time blur and lighting validation before AI formulation
          </ThemedText>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Enable Back Camera"
            variant="primary"
            size="lg"
            fullWidth
            onPress={onRequestPermission}
            style={styles.enableButton}
            textStyle={styles.enableButtonText}
          />

          <Button
            title="Upload from photo library"
            variant="outline"
            size="lg"
            fullWidth
            onPress={onChooseLibrary}
            style={[styles.libraryButton, { borderColor: theme.secondary }]}
            textStyle={[styles.libraryButtonText, { color: theme.secondary }]}
          />

          <Button
            title="Cancel"
            variant="ghost"
            size="md"
            onPress={onCancel}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignItems: 'center',
    gap: Spacing.four,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
  },
  overline: {
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.body.fontSize,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 4,
  },
  card: {
    width: '100%',
    padding: Spacing.four,
    borderRadius: BorderRadii.xl,
    borderWidth: 1,
    gap: Spacing.two,
  },
  itemText: {
    fontSize: Typography.small.fontSize,
    lineHeight: 20,
  },
  actionButtons: {
    width: '100%',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  enableButton: {
    borderRadius: BorderRadii.pill,
    height: 52,
  },
  enableButtonText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.semiBold,
  },
  libraryButton: {
    borderRadius: BorderRadii.pill,
    height: 52,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },
  libraryButtonText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.semiBold,
  },
});
