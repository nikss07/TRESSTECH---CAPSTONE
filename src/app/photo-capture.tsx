import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { AngleReviewCard } from '@/components/camera/angle-review-card';
import { CameraCaptureModal } from '@/components/camera/camera-capture-modal';
import {
  HAIR_ANGLES,
  type HairAngleKey,
} from '@/components/camera/capture-angle-indicator';
import { DashboardNavBar, type DashboardTab } from '@/components/dashboard-nav-bar';
import { DashboardTopNavbar } from '@/components/dashboard-top-navbar';
import {
  DashedUploadBox,
  type UploadState,
} from '@/components/dashed-upload-box';
import { QualityWarningCard } from '@/components/quality-warning-card';
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
import {
  type QualityCheckResult,
  validateImageClarity,
} from '@/utils/image-clarity';

export default function PhotoCaptureScreen() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ state?: string; clientName?: string }>();

  // Upload visual states: 'idle' | 'warning' | 'ready'
  const [uploadState, setUploadState] = useState<UploadState>(() => {
    if (params.state === 'ready') return 'ready';
    if (params.state === 'warning') return 'warning';
    return 'idle';
  });

  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [targetAngleIndex, setTargetAngleIndex] = useState(0);
  const [isSingleRecapture, setIsSingleRecapture] = useState(false);
  const [displayedFileName, setDisplayedFileName] = useState('Untitled design (4).png');
  const [warningDiagnostics, setWarningDiagnostics] = useState<QualityCheckResult | null>(null);

  // 5 Captured Hair Angles
  const [capturedAngles, setCapturedAngles] = useState<
    Record<HairAngleKey, string | undefined>
  >({
    side_left: 'sample-hair-side_left.jpg',
    side_right: 'sample-hair-side_right.jpg',
    back: 'sample-hair-back.jpg',
    top: 'sample-hair-top.jpg',
    front: 'sample-hair-front.jpg',
  });

  const guidanceItems = [
    'Face the camera directly',
    'Use bright, natural lighting',
    'Avoid filters and heavy styling products',
  ];

  // Open the 5-step camera sequence from the beginning
  const handleStartFullSequence = () => {
    setTargetAngleIndex(0);
    setIsSingleRecapture(false);
    setIsCameraVisible(true);
  };

  // Recapture a specific angle among the 5
  const handleRecaptureSpecificAngle = (index: number) => {
    setTargetAngleIndex(index);
    setIsSingleRecapture(true);
    setIsCameraVisible(true);
  };

  // Called when a single angle is recaptured and validated
  const handleSingleAngleRecaptured = (angle: HairAngleKey, photoUri: string) => {
    setCapturedAngles((prev) => ({
      ...prev,
      [angle]: photoUri,
    }));
    setUploadState('ready');
  };

  // Manual Photo Library Upload Fallback
  const handleManualUpload = async () => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.9,
      });

      if (!pickerResult.canceled && pickerResult.assets?.[0]?.uri) {
        const pickedUri = pickerResult.assets[0].uri;
        const pickedName = pickerResult.assets[0].fileName ?? 'manual-upload.jpg';
        setDisplayedFileName(pickedName);

        const checkResult = await validateImageClarity(pickedUri);

        if (!checkResult.isClear) {
          setWarningDiagnostics(checkResult);
          setUploadState('warning');
        } else {
          setCapturedAngles((prev) => ({
            ...prev,
            front: pickedUri,
          }));
          setUploadState('ready');
          setDisplayedFileName('sample-hair-profile.jpg');
        }
      }
    } catch {
      if (Platform.OS === 'web') {
        window.alert('Manual upload failed. Please try again.');
      } else {
        Alert.alert('Upload Error', 'Could not open image library.');
      }
    }
  };

  // Called when all 5 camera angles pass clarity checks
  const handleAllAnglesCompleted = (angles: Record<HairAngleKey, string | undefined>) => {
    setCapturedAngles(angles);
    setUploadState('ready');
    setDisplayedFileName('sample-hair-profile.jpg');
    setIsCameraVisible(false);
  };

  // Called when camera captures a blurry or low-light image
  const handleQualityFailed = (
    result: QualityCheckResult,
    _angle: HairAngleKey,
    _photoUri: string
  ) => {
    setWarningDiagnostics(result);
    setDisplayedFileName('Untitled design (4).png');
    setUploadState('warning');
    setIsCameraVisible(false);
  };

  const handleContinue = () => {
    if (uploadState === 'ready') {
      router.push('/analysis-progress');
    }
  };

  const getOverline = () => {
    if (uploadState === 'warning') {
      return 'PHOTO NEEDS A REFRESH';
    }
    if (params.clientName) {
      return `ANALYSIS FOR ${params.clientName.toUpperCase()}`;
    }
    switch (uploadState) {
      case 'ready':
        return 'NEW ANALYSIS · 5 ANGLES READY';
      case 'idle':
      default:
        return 'PHOTO CAPTURE';
    }
  };

  const getHeadline = () => {
    if (uploadState === 'warning') {
      return "Let's get a clearer photo.";
    }
    if (uploadState === 'ready') {
      return 'Review your hair captures.';
    }
    return "Let's understand your hair.";
  };

  const getSubtitle = () => {
    switch (uploadState) {
      case 'warning':
        return 'The image does not have enough detail for an accurate analysis.';
      case 'ready':
        return 'All 5 perspectives are verified sharp and clear. Tap Retake to recapture any specific picture.';
      case 'idle':
      default:
        return 'Capture a clear image so the analysis can identify condition, porosity, and damage.';
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar style="dark" />

      {/* Top Navbar Header */}
      <DashboardTopNavbar showMenu={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          {/* Back Navigation Link */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to client selection"
            onPress={() => router.push('/new-analysis')}
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
              Back
            </ThemedText>
          </Pressable>

          {/* Section Headings */}
          <View style={styles.headerBlock}>
            <ThemedText style={[styles.overline, { color: theme.primary }]}>
              {getOverline()}
            </ThemedText>

            <ThemedText style={[styles.heading, { color: theme.text }]}>
              {getHeadline()}
            </ThemedText>

            <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
              {getSubtitle()}
            </ThemedText>
          </View>

          {/* Interactive State Picker for Testing All 3 Designs */}
          <View style={styles.stateSelector}>
            <Pressable
              onPress={() => setUploadState('idle')}
              style={[
                styles.statePill,
                uploadState === 'idle' && {
                  backgroundColor: theme.secondary,
                },
              ]}>
              <ThemedText
                style={[
                  styles.statePillText,
                  {
                    color:
                      uploadState === 'idle'
                        ? theme.secondaryText
                        : theme.textSecondary,
                  },
                ]}>
                Idle / Capture
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={() => setUploadState('warning')}
              style={[
                styles.statePill,
                uploadState === 'warning' && {
                  backgroundColor: theme.secondary,
                },
              ]}>
              <ThemedText
                style={[
                  styles.statePillText,
                  {
                    color:
                      uploadState === 'warning'
                        ? theme.secondaryText
                        : theme.textSecondary,
                  },
                ]}>
                Quality Warning
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={() => setUploadState('ready')}
              style={[
                styles.statePill,
                uploadState === 'ready' && {
                  backgroundColor: theme.secondary,
                },
              ]}>
              <ThemedText
                style={[
                  styles.statePillText,
                  {
                    color:
                      uploadState === 'ready'
                        ? theme.secondaryText
                        : theme.textSecondary,
                  },
                ]}>
                5-Angle Ready
              </ThemedText>
            </Pressable>
          </View>

          {/* STATE 1 & 2: IDLE & WARNING STATES */}
          {uploadState !== 'ready' ? (
            <>
              {/* Dashed Upload Box */}
              <DashedUploadBox
                state={uploadState}
                fileName={displayedFileName}
                onPress={handleStartFullSequence}
                onReplace={handleStartFullSequence}
              />

              {/* Action Options: Camera & Manual Upload */}
              <View style={styles.actionOptionsRow}>
                <Button
                  title="Start Multi-Angle Camera"
                  variant="outline"
                  size="md"
                  icon={
                    <SymbolView
                      name={{
                        ios: 'camera.fill',
                        android: 'photo_camera',
                        web: 'photo_camera',
                      }}
                      size={IconSizes.sm}
                      tintColor={theme.secondary}
                    />
                  }
                  onPress={handleStartFullSequence}
                  style={[styles.cameraButton, { borderColor: theme.secondary }]}
                  textStyle={[styles.cameraButtonText, { color: theme.secondary }]}
                />

                <Button
                  title="Manual Upload"
                  variant="ghost"
                  size="md"
                  icon={
                    <SymbolView
                      name={{
                        ios: 'photo.on.rectangle',
                        android: 'photo_library',
                        web: 'photo_library',
                      }}
                      size={IconSizes.sm}
                      tintColor={theme.textSecondary}
                    />
                  }
                  onPress={handleManualUpload}
                  textStyle={{ color: theme.textSecondary }}
                />
              </View>

              {/* Warning Card OR Guidance */}
              {uploadState === 'warning' ? (
                <QualityWarningCard
                  title={warningDiagnostics?.diagnosticTitle ?? "Image isn't clear enough"}
                  subtitle={warningDiagnostics?.diagnosticSubtitle ?? 'Please retake your photo before continuing.'}
                  tips={warningDiagnostics?.tips}
                  footerNote={warningDiagnostics?.footerNote}
                />
              ) : (
                <View style={styles.guidanceBlock}>
                  <ThemedText style={[styles.guidanceTitle, { color: theme.text }]}>
                    Capture Guidance
                  </ThemedText>

                  <View style={styles.guidanceList}>
                    {guidanceItems.map((item, idx) => (
                      <ThemedText
                        key={idx}
                        style={[styles.guidanceItem, { color: theme.textSecondary }]}>
                        • {item}
                      </ThemedText>
                    ))}
                  </View>
                </View>
              )}

              {/* Disabled CTA in idle/warning */}
              <Button
                title="Continue to analysis →"
                variant="primary"
                size="lg"
                fullWidth
                disabled
                onPress={handleContinue}
                style={[
                  styles.actionButton,
                  { backgroundColor: theme.primaryLight, opacity: 0.8 },
                ]}
                textStyle={styles.actionButtonText}
              />
            </>
          ) : (
            /* STATE 3: ALL 5 ANGLES CAPTURED WITH INDIVIDUAL RECAPTURE OPTIONS */
            <View style={styles.reviewSection}>
              <View style={styles.reviewHeaderRow}>
                <ThemedText style={[styles.reviewHeaderTitle, { color: theme.text }]}>
                  Captured Perspectives
                </ThemedText>
                <View style={[styles.verifiedPill, { backgroundColor: theme.backgroundElement }]}>
                  <ThemedText style={[styles.verifiedPillText, { color: theme.primaryDark }]}>
                    5 OF 5 CAPTURED
                  </ThemedText>
                </View>
              </View>

              {/* 5-Angle Review Cards Stack */}
              <View style={styles.angleCardsList}>
                {HAIR_ANGLES.map((angle, index) => (
                  <AngleReviewCard
                    key={angle.key}
                    stepNumber={index + 1}
                    angleKey={angle.key}
                    angleLabel={angle.label}
                    guidance={angle.guidance}
                    photoUri={capturedAngles[angle.key]}
                    onRecapture={() => handleRecaptureSpecificAngle(index)}
                  />
                ))}
              </View>

              {/* Ready CTA Actions */}
              <View style={styles.readyActionGroup}>
                <Button
                  title="Analyze My Hair"
                  variant="primary"
                  size="lg"
                  fullWidth
                  onPress={handleContinue}
                  style={styles.actionButton}
                  textStyle={styles.actionButtonText}
                />

                <Button
                  title="Retake all 5 angles"
                  variant="ghost"
                  size="md"
                  onPress={handleStartFullSequence}
                  textStyle={{ color: theme.textSecondary }}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Multi-Step 5-Angle Rear Camera Modal */}
      <CameraCaptureModal
        visible={isCameraVisible}
        onClose={() => setIsCameraVisible(false)}
        initialAngleIndex={targetAngleIndex}
        singleAngleMode={isSingleRecapture}
        existingAngles={capturedAngles}
        onSingleAngleRecaptured={handleSingleAngleRecaptured}
        onAllAnglesCompleted={handleAllAnglesCompleted}
        onQualityFailed={handleQualityFailed}
      />

      {/* Fixed Staff Navigation Bar */}
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
  stateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  statePill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: 6,
    borderRadius: BorderRadii.full,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  statePillText: {
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.semiBold,
  },
  actionOptionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  cameraButton: {
    flex: 1,
    borderRadius: BorderRadii.pill,
    height: 44,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },
  cameraButtonText: {
    fontSize: Typography.small.fontSize,
    fontWeight: FontWeights.semiBold,
  },
  guidanceBlock: {
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  guidanceTitle: {
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
  },
  guidanceList: {
    gap: 6,
  },
  guidanceItem: {
    fontSize: Typography.body.fontSize,
    lineHeight: 22,
  },
  reviewSection: {
    width: '100%',
    gap: Spacing.three,
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewHeaderTitle: {
    fontSize: Typography.subtitle.fontSize,
    fontWeight: FontWeights.bold,
  },
  verifiedPill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: 4,
    borderRadius: BorderRadii.full,
  },
  verifiedPillText: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 0.8,
  },
  angleCardsList: {
    width: '100%',
    gap: Spacing.three,
  },
  readyActionGroup: {
    width: '100%',
    gap: Spacing.one,
    marginTop: Spacing.two,
    alignItems: 'center',
  },
  actionButton: {
    borderRadius: BorderRadii.pill,
    height: 52,
  },
  actionButtonText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.semiBold,
  },
});
