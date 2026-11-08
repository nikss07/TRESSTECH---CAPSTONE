import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { SymbolView } from 'expo-symbols';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import {
  CaptureAngleIndicator,
  HAIR_ANGLES,
  type HairAngleKey,
} from '@/components/camera/capture-angle-indicator';
import { PermissionRequestView } from '@/components/camera/permission-request-view';
import { ThemedText } from '@/components/themed-text';
import {
  BorderRadii,
  FontWeights,
  IconSizes,
  Spacing,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import {
  type QualityCheckResult,
  validateImageClarity,
} from '@/utils/image-clarity';

export type CameraCaptureModalProps = {
  visible: boolean;
  onClose: () => void;
  onAllAnglesCompleted: (angles: Record<HairAngleKey, string | undefined>) => void;
  onQualityFailed: (
    result: QualityCheckResult,
    angle: HairAngleKey,
    photoUri: string
  ) => void;
  initialAngleIndex?: number;
  singleAngleMode?: boolean;
  existingAngles?: Record<HairAngleKey, string | undefined>;
  onSingleAngleRecaptured?: (angle: HairAngleKey, photoUri: string) => void;
};

export function CameraCaptureModal({
  visible,
  onClose,
  onAllAnglesCompleted,
  onQualityFailed,
  initialAngleIndex = 0,
  singleAngleMode = false,
  existingAngles,
  onSingleAngleRecaptured,
}: CameraCaptureModalProps) {
  const theme = useTheme();
  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [currentAngleIndex, setCurrentAngleIndex] = useState(initialAngleIndex);
  const [completedAngles, setCompletedAngles] = useState<
    Record<HairAngleKey, string | undefined>
  >(
    existingAngles ?? {
      side_left: undefined,
      side_right: undefined,
      back: undefined,
      top: undefined,
      front: undefined,
    }
  );

  // Sync state if initialAngleIndex or existingAngles change
  const [prevVisible, setPrevVisible] = useState(visible);
  if (visible !== prevVisible) {
    setPrevVisible(visible);
    if (visible) {
      setCurrentAngleIndex(initialAngleIndex);
      if (existingAngles) {
        setCompletedAngles(existingAngles);
      }
    }
  }

  const [isProcessing, setIsProcessing] = useState(false);
  const [enableTorch, setEnableTorch] = useState(false);
  const [simulateBlur, setSimulateBlur] = useState(false);

  const currentAngle = HAIR_ANGLES[currentAngleIndex];

  // Manual Gallery Picker Fallback
  const handleOpenLibrary = async () => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.9,
      });

      if (!pickerResult.canceled && pickerResult.assets?.[0]?.uri) {
        await processCapturedPhoto(pickerResult.assets[0].uri);
      }
    } catch {
      // Graceful error handling
    }
  };

  // Taking photo via rear camera
  const handleCapture = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      let photoUri: string | undefined;

      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.9,
          skipProcessing: Platform.OS === 'android',
        });
        photoUri = photo?.uri;
      }

      // If camera capture is simulated or unavailable on web
      if (!photoUri) {
        photoUri = `sample-hair-${currentAngle.key}.jpg`;
      }

      await processCapturedPhoto(photoUri);
    } catch {
      // In case of capture failure, fallback to simulated photo
      await processCapturedPhoto(`sample-hair-${currentAngle.key}.jpg`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Validating clarity and advancing or failing
  const processCapturedPhoto = async (photoUri: string) => {
    setIsProcessing(true);

    try {
      const clarityResult = await validateImageClarity(photoUri, {
        forceFail: simulateBlur,
        forcedReason: simulateBlur ? 'blur' : undefined,
      });

      // 1. If Clarity Check Failed: trigger Photo Needs Attention
      if (!clarityResult.isClear) {
        setIsProcessing(false);
        onClose();
        onQualityFailed(clarityResult, currentAngle.key, photoUri);
        return;
      }

      // 2. If Clarity Passed: record angle capture
      const updated = {
        ...completedAngles,
        [currentAngle.key]: photoUri,
      };
      setCompletedAngles(updated);

      // If in single-angle recapture mode, return immediately
      if (singleAngleMode) {
        setIsProcessing(false);
        onClose();
        onSingleAngleRecaptured?.(currentAngle.key, photoUri);
        return;
      }

      // Check if all 5 angles are complete
      if (currentAngleIndex < HAIR_ANGLES.length - 1) {
        setCurrentAngleIndex((prev) => prev + 1);
        setIsProcessing(false);
      } else {
        // All 5 angles captured successfully
        setIsProcessing(false);
        onClose();
        onAllAnglesCompleted(updated);
      }
    } catch {
      setIsProcessing(false);
    }
  };

  if (!visible) return null;

  // Handle camera permission screen
  if (!permission?.granted) {
    return (
      <Modal visible={visible} animationType="slide">
        <PermissionRequestView
          onRequestPermission={requestPermission}
          onChooseLibrary={handleOpenLibrary}
          onCancel={onClose}
        />
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent>
      <SafeAreaView style={styles.container}>
        {/* Fullscreen Camera View using Back Camera */}
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing="back"
          enableTorch={enableTorch}
          mode="picture"
        />

        {/* Top Floating Control Bar */}
        <View style={styles.topBar}>
          <View style={styles.topActionsRow}>
            {/* Simulate Blur toggle for testing quality warning screen */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Toggle test blur simulation"
              onPress={() => setSimulateBlur((prev) => !prev)}
              style={[
                styles.iconButton,
                simulateBlur && { backgroundColor: theme.error },
              ]}>
              <ThemedText style={styles.testBadgeText}>
                {simulateBlur ? 'Blur ON' : 'Test Blur'}
              </ThemedText>
            </Pressable>

            {/* Close Button */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close camera"
              onPress={onClose}
              style={styles.iconButton}>
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
            </Pressable>
          </View>

          {/* 5-Step Angle Guide Indicator */}
          <CaptureAngleIndicator
            currentAngleIndex={currentAngleIndex}
            completedAngles={completedAngles}
          />
        </View>

        {/* Center Angle Viewfinder Reticle */}
        <View style={styles.viewfinderCenter}>
          <View style={styles.viewfinderFrame}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />

            <View style={styles.angleTag}>
              <ThemedText style={styles.angleTagText}>
                Align {currentAngle.label}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Bottom Shutter & Tool Controls */}
        <View style={styles.bottomControls}>
          {/* Left Tool: Torch / Flash */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Toggle torch flash"
            onPress={() => setEnableTorch((prev) => !prev)}
            style={[
              styles.toolButton,
              enableTorch && { backgroundColor: theme.primary },
            ]}>
            <SymbolView
              name={{
                ios: 'bolt.fill',
                android: 'bolt',
                web: 'bolt',
              }}
              size={IconSizes.md}
              tintColor={enableTorch ? theme.primaryText : '#FFFFFF'}
            />
          </Pressable>

          {/* Center: Main Circular Shutter Button */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Capture ${currentAngle.label} photo`}
            disabled={isProcessing}
            onPress={handleCapture}
            style={({ pressed }) => [
              styles.shutterOuter,
              pressed && styles.shutterPressed,
            ]}>
            <View
              style={[
                styles.shutterInner,
                { backgroundColor: theme.primary },
              ]}>
              {isProcessing ? (
                <ActivityIndicator color={theme.primaryText} size="small" />
              ) : null}
            </View>
          </Pressable>

          {/* Right Tool: Upload Manually from Photo Library */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Choose photo from library"
            onPress={handleOpenLibrary}
            style={styles.toolButton}>
            <SymbolView
              name={{
                ios: 'photo.on.rectangle',
                android: 'photo_library',
                web: 'photo_library',
              }}
              size={IconSizes.md}
              tintColor="#FFFFFF"
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
  },
  topBar: {
    width: '100%',
    paddingTop: Platform.select({ ios: Spacing.two, default: Spacing.four }),
    paddingBottom: Spacing.two,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    gap: Spacing.two,
  },
  topActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadii.full,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testBadgeText: {
    fontSize: 9,
    fontWeight: FontWeights.bold,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  viewfinderCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
  },
  viewfinderFrame: {
    width: 270,
    height: 340,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: BorderRadii.xl,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#CC9F4D',
  },
  cornerTL: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: BorderRadii.md,
  },
  cornerTR: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: BorderRadii.md,
  },
  cornerBL: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: BorderRadii.md,
  },
  cornerBR: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: BorderRadii.md,
  },
  angleTag: {
    position: 'absolute',
    bottom: Spacing.three,
    backgroundColor: 'rgba(15, 61, 58, 0.85)',
    paddingHorizontal: Spacing.three,
    paddingVertical: 6,
    borderRadius: BorderRadii.pill,
  },
  angleTagText: {
    fontSize: 12,
    fontWeight: FontWeights.bold,
    color: '#EDE4D6',
  },
  bottomControls: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.four,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  toolButton: {
    width: 50,
    height: 50,
    borderRadius: BorderRadii.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterOuter: {
    width: 78,
    height: 78,
    borderRadius: BorderRadii.full,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
  shutterInner: {
    width: 62,
    height: 62,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
