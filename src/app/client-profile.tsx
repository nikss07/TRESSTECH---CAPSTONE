import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ClientHistoryItem } from '@/components/client-history-item';
import { DashboardNavBar, type DashboardTab } from '@/components/dashboard-nav-bar';
import { DashboardTopNavbar } from '@/components/dashboard-top-navbar';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import {
  BorderRadii,
  FontWeights,
  IconSizes,
  MaxContentWidth,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ClientProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ name?: string; email?: string }>();
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');

  const clientName = params.name || 'Junaica';
  const clientInitial = clientName.charAt(0).toUpperCase();
  const clientHandle =
    params.email ||
    (params.name
      ? `${params.name.toLowerCase().replace(/\s+/g, '.')}@example.com`
      : 'niksmapagmahal');

  const handleReturn = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/dashboard');
    }
  };

  type AnalysisHistoryRecord = {
    id: string;
    date: string;
    fullDate: string;
    condition: string;
    porosity: string;
    score: string;
    recommendation: string;
    followUpFlag: string;
    notes?: string;
  };

  const [selectedRecord, setSelectedRecord] =
    useState<AnalysisHistoryRecord | null>(null);

  const historyRecords: AnalysisHistoryRecord[] = [
    {
      id: 'rec-1',
      date: 'Today',
      fullDate: 'Today · Oct 24, 2026',
      condition: 'Normal condition',
      porosity: 'Medium porosity',
      score: '84/100',
      recommendation: 'Proceed with standard formula · 6% / 20 vol',
      followUpFlag: 'Normal maintenance schedule',
      notes: 'Hair cortex in healthy state. Minimal cuticular lifting detected.',
    },
    {
      id: 'rec-2',
      date: 'Jun 08',
      fullDate: 'Jun 08, 2026',
      condition: 'Mild damage',
      porosity: 'Medium porosity',
      score: '78/100',
      recommendation: 'Proceed with caution · 6% / 20 vol with bond protector',
      followUpFlag: 'Recheck after next chemical service',
      notes: 'Slight cuticle porosity variation at mid-lengths and ends.',
    },
    {
      id: 'rec-3',
      date: 'May 12',
      fullDate: 'May 12, 2026',
      condition: 'Colored',
      porosity: 'High porosity',
      score: '72/100',
      recommendation: 'Pre-treat with protein filler · Gentle 3% / 10 vol',
      followUpFlag: 'High sensitivity — recurrent exposure',
      notes: 'Prior chemical bleaching identified. Requires moisture sealant.',
    },
  ];

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar style="dark" />

      {/* Top Navbar Header matching Dashboard */}
      <DashboardTopNavbar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          {/* Return Navigation Link */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Return to previous screen"
            onPress={handleReturn}
            style={({ pressed }) => [styles.backRow, pressed && styles.pressed]}>
            <SymbolView
              name={{
                ios: 'arrow.left',
                android: 'arrow_back',
                web: 'arrow_back',
              }}
              size={IconSizes.sm}
              tintColor={theme.secondary}
            />
            <ThemedText style={[styles.backText, { color: theme.secondary }]}>
              Return
            </ThemedText>
          </Pressable>

          {/* Profile Header Row */}
          <View style={styles.profileHeader}>
            <View
              style={[
                styles.avatarCircle,
                { backgroundColor: theme.secondary },
              ]}>
              <ThemedText
                style={[styles.avatarText, { color: theme.secondaryText }]}>
                {clientInitial}
              </ThemedText>
            </View>

            <View style={styles.profileInfo}>
              <ThemedText style={[styles.profileOverline, { color: theme.primary }]}>
                CLIENT PROFILE
              </ThemedText>
              <ThemedText style={[styles.profileName, { color: theme.text }]}>
                {clientName}
              </ThemedText>
              <ThemedText
                style={[styles.profileHandle, { color: theme.textSecondary }]}>
                {clientHandle}
              </ThemedText>
            </View>
          </View>

          {/* Follow-up Flag Callout Box */}
          <View
            style={[
              styles.flagBox,
              {
                backgroundColor: theme.surfaceSecondary,
                borderColor: theme.primary,
              },
            ]}>
            <ThemedText style={[styles.flagOverline, { color: theme.primaryDark }]}>
              FOLLOW-UP FLAG
            </ThemedText>
            <ThemedText style={[styles.flagTitle, { color: theme.text }]}>
              High sensitivity — recurrent exposure
            </ThemedText>
            <ThemedText style={[styles.flagDesc, { color: theme.textSecondary }]}>
              Review chemical history before the next service.
            </ThemedText>
          </View>

          {/* Analysis History Section Header */}
          <View style={styles.historyHeader}>
            <ThemedText style={[styles.historyTitle, { color: theme.text }]}>
              Analysis history
            </ThemedText>
            <View
              style={[
                styles.recordsBadge,
                { borderColor: theme.primary },
              ]}>
              <ThemedText
                style={[styles.recordsBadgeText, { color: theme.primaryDark }]}>
                3 RECORDS
              </ThemedText>
            </View>
          </View>

          {/* History Records Stack */}
          <View style={styles.recordsStack}>
            {historyRecords.map((rec) => (
              <ClientHistoryItem
                key={rec.id}
                date={rec.date}
                condition={rec.condition}
                porosity={rec.porosity}
                score={rec.score}
                onPress={() => setSelectedRecord(rec)}
              />
            ))}
          </View>

          {/* Start New Analysis Action Button */}
          <Button
            title="Start new analysis"
            variant="primary"
            size="lg"
            fullWidth
            onPress={() =>
              router.push({
                pathname: '/new-analysis',
                params: {
                  selectedClientName: clientName,
                  selectedClientEmail: clientHandle,
                },
              })
            }
            style={styles.actionButton}
            textStyle={styles.actionButtonText}
          />
        </View>
      </ScrollView>

      {/* Analysis History Record Detail Modal */}
      <Modal
        visible={Boolean(selectedRecord)}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedRecord(null)}>
        <View style={styles.modalOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setSelectedRecord(null)}
          />

          <View
            style={[
              styles.modalCard,
              { backgroundColor: theme.card, borderColor: theme.borderSubtle },
            ]}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleBlock}>
                <ThemedText
                  style={[styles.modalOverline, { color: theme.primary }]}>
                  ANALYSIS RECORD
                </ThemedText>
                <ThemedText style={[styles.modalTitle, { color: theme.text }]}>
                  {selectedRecord?.condition}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.modalSubtitle,
                    { color: theme.textSecondary },
                  ]}>
                  {selectedRecord?.fullDate}
                </ThemedText>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close analysis details"
                onPress={() => setSelectedRecord(null)}
                style={styles.modalCloseBtn}>
                <SymbolView
                  name={{ ios: 'xmark', android: 'close', web: 'close' }}
                  size={IconSizes.sm}
                  tintColor={theme.secondary}
                />
              </Pressable>
            </View>

            {/* Modal Detail Content */}
            {selectedRecord && (
              <View style={styles.modalBody}>
                {/* Porosity & Health Score Metric Box */}
                <View
                  style={[
                    styles.metricBanner,
                    {
                      backgroundColor: theme.surfaceSecondary,
                      borderColor: theme.borderSubtle,
                    },
                  ]}>
                  <View style={styles.metricItem}>
                    <ThemedText
                      style={[
                        styles.metricLabel,
                        { color: theme.textSecondary },
                      ]}>
                      POROSITY
                    </ThemedText>
                    <ThemedText
                      style={[styles.metricValue, { color: theme.text }]}>
                      {selectedRecord.porosity}
                    </ThemedText>
                  </View>

                  <View
                    style={[
                      styles.metricDivider,
                      { backgroundColor: theme.border },
                    ]}
                  />

                  <View style={styles.metricItem}>
                    <ThemedText
                      style={[
                        styles.metricLabel,
                        { color: theme.textSecondary },
                      ]}>
                      SCORE
                    </ThemedText>
                    <ThemedText
                      style={[styles.metricValue, { color: theme.text }]}>
                      {selectedRecord.score}
                    </ThemedText>
                  </View>
                </View>

                {/* Follow-up Flag Box */}
                <View style={styles.detailBlock}>
                  <ThemedText
                    style={[styles.detailLabel, { color: theme.textMuted }]}>
                    FOLLOW-UP FLAG
                  </ThemedText>
                  <ThemedText
                    style={[styles.detailFlag, { color: theme.primaryDark }]}>
                    {selectedRecord.followUpFlag}
                  </ThemedText>
                </View>

                {/* Recommendation Box */}
                <View style={styles.detailBlock}>
                  <ThemedText
                    style={[styles.detailLabel, { color: theme.textMuted }]}>
                    RECOMMENDATION
                  </ThemedText>
                  <ThemedText
                    style={[styles.detailText, { color: theme.text }]}>
                    {selectedRecord.recommendation}
                  </ThemedText>
                </View>

                {/* Observations */}
                {selectedRecord.notes && (
                  <View style={styles.detailBlock}>
                    <ThemedText
                      style={[styles.detailLabel, { color: theme.textMuted }]}>
                      OBSERVATIONS
                    </ThemedText>
                    <ThemedText
                      style={[
                        styles.detailNotes,
                        { color: theme.textSecondary },
                      ]}>
                      {selectedRecord.notes}
                    </ThemedText>
                  </View>
                )}

                {/* Action Button */}
                <View style={styles.modalActions}>
                  <Button
                    title="Close"
                    variant="primary"
                    size="lg"
                    fullWidth
                    onPress={() => setSelectedRecord(null)}
                    style={styles.modalPrimaryBtn}
                    textStyle={styles.modalPrimaryBtnText}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Fixed Bottom Staff Navigation Bar */}
      <DashboardNavBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'home') {
            router.push('/dashboard');
          } else if (tab === 'profile') {
            router.push('/signin');
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
    paddingVertical: Spacing.one,
  },
  pressed: {
    opacity: 0.7,
  },
  backText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.semiBold,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 26,
    fontWeight: FontWeights.bold,
  },
  profileInfo: {
    gap: 2,
  },
  profileOverline: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  profileName: {
    fontSize: 26,
    fontWeight: FontWeights.bold,
  },
  profileHandle: {
    fontSize: Typography.small.fontSize,
  },
  flagBox: {
    width: '100%',
    padding: Spacing.four,
    borderRadius: BorderRadii.xl,
    borderWidth: 1.5,
    gap: Spacing.one,
  },
  flagOverline: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  flagTitle: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  flagDesc: {
    fontSize: Typography.small.fontSize,
    lineHeight: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.one,
  },
  historyTitle: {
    fontSize: Typography.subtitle.fontSize,
    fontWeight: FontWeights.bold,
  },
  recordsBadge: {
    borderWidth: 1,
    borderRadius: BorderRadii.full,
    paddingHorizontal: Spacing.three,
    paddingVertical: 4,
  },
  recordsBadgeText: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 0.8,
  },
  recordsStack: {
    width: '100%',
    gap: Spacing.three,
  },
  actionButton: {
    borderRadius: BorderRadii.pill,
    height: 52,
    marginTop: Spacing.two,
  },
  actionButtonText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.semiBold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 61, 58, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    borderRadius: BorderRadii.xl,
    borderWidth: 1,
    padding: Spacing.five,
    gap: Spacing.four,
    ...(Shadows.md as object),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  modalHeaderTitleBlock: {
    gap: 2,
    flex: 1,
  },
  modalOverline: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: FontWeights.bold,
  },
  modalSubtitle: {
    fontSize: Typography.small.fontSize,
  },
  modalCloseBtn: {
    padding: Spacing.one,
  },
  modalBody: {
    gap: Spacing.four,
  },
  metricBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    borderRadius: BorderRadii.lg,
    borderWidth: 1,
  },
  metricItem: {
    alignItems: 'center',
    gap: 2,
    flex: 1,
  },
  metricDivider: {
    width: 1,
    height: 32,
  },
  metricLabel: {
    fontSize: 10.5,
    fontWeight: FontWeights.bold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  detailBlock: {
    gap: Spacing.one,
  },
  detailLabel: {
    fontSize: 10.5,
    fontWeight: FontWeights.bold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  detailFlag: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.bold,
  },
  detailText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.medium,
  },
  detailNotes: {
    fontSize: Typography.small.fontSize,
    lineHeight: 20,
  },
  modalActions: {
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  modalPrimaryBtn: {
    borderRadius: BorderRadii.pill,
    height: 50,
  },
  modalPrimaryBtnText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.semiBold,
  },
});
