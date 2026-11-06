import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { type ComponentRef, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ClientListItem } from '@/components/client-list-item';
import { CreateClientCard } from '@/components/create-client-card';
import { DashboardNavBar, type DashboardTab } from '@/components/dashboard-nav-bar';
import { DashboardTopNavbar } from '@/components/dashboard-top-navbar';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/ui/search-bar';
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

type SelectedClientInfo = {
  id?: string;
  name: string;
  email: string;
  initial: string;
  badgeText?: string;
  isExistingClient?: boolean;
};

export default function NewAnalysisSelectClientScreen() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{
    selectedClientName?: string;
    selectedClientEmail?: string;
  }>();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const scrollViewRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const [outerScrollEnabled, setOuterScrollEnabled] = useState(true);

  const handleDropdownOpenChange = (open: boolean) => {
    setIsSearchFocused(open);
    if (open) {
      setOuterScrollEnabled(true);
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: 165, animated: true });
        setTimeout(() => {
          setOuterScrollEnabled(false);
        }, 280);
      }, 50);
    } else {
      setOuterScrollEnabled(true);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  useEffect(() => {
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        if (!isSearchFocused) {
          setOuterScrollEnabled(true);
          scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }
      }
    );
    return () => hideSub.remove();
  }, [isSearchFocused]);

  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(() => Boolean(params.selectedClientName));
  const [isPreparing, setIsPreparing] = useState(false);
  const [confirmationClient, setConfirmationClient] = useState<SelectedClientInfo | null>(() => {
    if (params.selectedClientName) {
      return {
        id: 'selected',
        name: params.selectedClientName,
        email: params.selectedClientEmail || 'Client profile',
        initial: params.selectedClientName.charAt(0).toUpperCase(),
        isExistingClient: true,
      };
    }
    return null;
  });

  // Adjust state during render when route params change (official React pattern)
  const [prevParamName, setPrevParamName] = useState(params.selectedClientName);
  if (params.selectedClientName !== prevParamName) {
    setPrevParamName(params.selectedClientName);
    if (params.selectedClientName) {
      setConfirmationClient({
        id: 'selected',
        name: params.selectedClientName,
        email: params.selectedClientEmail || 'Client profile',
        initial: params.selectedClientName.charAt(0).toUpperCase(),
        isExistingClient: true,
      });
      setIsConfirmModalOpen(true);
    }
  }

  const [newClientName, setNewClientName] = useState('');
  const [newClientContact, setNewClientContact] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [allRegisteredClients, setAllRegisteredClients] = useState<SelectedClientInfo[]>([
    {
      id: 'client-1',
      name: 'Maya Chen',
      email: 'maya@example.com',
      initial: 'M',
      badgeText: 'FOLLOW UP',
      isExistingClient: true,
    },
    {
      id: 'client-2',
      name: 'Jordan Lee',
      email: 'jordan@example.com',
      initial: 'J',
      badgeText: undefined,
      isExistingClient: true,
    },
    {
      id: 'client-3',
      name: 'Priya Shah',
      email: 'priya@example.com',
      initial: 'P',
      badgeText: 'FOLLOW UP',
      isExistingClient: true,
    },
    {
      id: 'client-4',
      name: 'Elena Rostova',
      email: 'elena.r@example.com',
      initial: 'E',
      badgeText: undefined,
      isExistingClient: true,
    },
    {
      id: 'client-5',
      name: 'Marcus Vance',
      email: 'marcus.v@example.com',
      initial: 'M',
      badgeText: undefined,
      isExistingClient: true,
    },
    {
      id: 'client-6',
      name: 'Sophia Williams',
      email: 'sophia.w@example.com',
      initial: 'S',
      badgeText: 'FOLLOW UP',
      isExistingClient: true,
    },
    {
      id: 'client-7',
      name: 'David Kim',
      email: 'david.kim@example.com',
      initial: 'D',
      badgeText: undefined,
      isExistingClient: true,
    },
    {
      id: 'client-8',
      name: 'Aaliyah Jackson',
      email: 'aaliyah.j@example.com',
      initial: 'A',
      badgeText: undefined,
      isExistingClient: true,
    },
  ]);

  const isSearching = searchQuery.trim().length > 0;

  // Filtered clients for search suggestions/results (searches all registered clients)
  const filteredClients = isSearching
    ? allRegisteredClients.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allRegisteredClients;

  // Static 3 recent clients shown below the Create New Client button
  const recentThreeClients = allRegisteredClients.slice(0, 3);

  const handleSelectClient = (client: SelectedClientInfo) => {
    setConfirmationClient({
      ...client,
      isExistingClient: true,
    });
    setIsConfirmModalOpen(true);
  };

  const handleSaveClient = () => {
    const nameToSave = newClientName.trim() || 'Jamie Taylor';
    const contactToSave = newClientContact.trim() || 'Email or phone';

    setIsSaving(true);
    setTimeout(() => {
      const created: SelectedClientInfo = {
        id: `client-${Date.now()}`,
        name: nameToSave,
        email: contactToSave,
        initial: nameToSave.charAt(0).toUpperCase(),
        badgeText: undefined,
        isExistingClient: false,
      };
      setAllRegisteredClients((prev) => [created, ...prev]);
      setIsSaving(false);
      setNewClientName('');
      setNewClientContact('');
      setIsCreateModalOpen(false);
      setConfirmationClient(created);
      setIsConfirmModalOpen(true);
    }, 300);
  };

  const handleProceedToCapture = () => {
    setIsConfirmModalOpen(false);
    setIsPreparing(true);

    setTimeout(() => {
      setIsPreparing(false);
      router.push({
        pathname: '/photo-capture',
        params: {
          clientName: confirmationClient?.name,
          state: 'idle',
        },
      });
    }, 1800);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar style="dark" />

      {/* Top Navbar Header matching Dashboard */}
      <DashboardTopNavbar />

      {/* Main Content Area */}
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={outerScrollEnabled}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          {/* Back to Dashboard Navigation Link */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to Dashboard"
            onPress={() => router.push('/dashboard')}
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
              Dashboard
            </ThemedText>
          </Pressable>

          {/* Section Header */}
          <View style={styles.headerBlock}>
            <ThemedText style={[styles.overline, { color: theme.primary }]}>
              NEW ANALYSIS
            </ThemedText>

            <ThemedText style={[styles.heading, { color: theme.text }]}>
              Select a client.
            </ThemedText>

            <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
              Choose an existing record or create a new profile before uploading.
            </ThemedText>
          </View>

          {/* 1. Reusable SearchBar with Floating Dropdown & Spruce Green Backdrop */}
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search clients"
            onClear={() => setSearchQuery('')}
            isDropdownOpen={isSearchFocused}
            onDropdownOpenChange={handleDropdownOpenChange}
            dropdownLabel={
              isSearching
                ? `RESULTS (${filteredClients.length})`
                : 'SUGGESTED CLIENTS'
            }>
            {filteredClients.map((client) => (
              <SearchBar.Item
                key={client.id}
                title={client.name}
                subtitle={client.email}
                initial={client.initial}
                badgeText={client.badgeText}
                onPress={() => {
                  handleDropdownOpenChange(false);
                  handleSelectClient(client);
                }}
              />
            ))}

            {isSearching && filteredClients.length === 0 && (
              <View style={styles.suggestionEmptyBox}>
                <ThemedText
                  style={[
                    styles.suggestionEmptyText,
                    { color: theme.textSecondary },
                  ]}>
                  No clients found matching &quot;{searchQuery}&quot;
                </ThemedText>
                <Button
                  title={`+ Create new client "${searchQuery}"`}
                  variant="outline"
                  size="sm"
                  onPress={() => {
                    setIsSearchFocused(false);
                    setNewClientName(searchQuery);
                    setIsCreateModalOpen(true);
                  }}
                  style={[
                    styles.suggestionEmptyBtn,
                    { borderColor: theme.secondary },
                  ]}
                  textStyle={{ color: theme.secondary }}
                />
              </View>
            )}
          </SearchBar>

          {/* 2. Create New Client Action Button */}
          <Button
            title="Create new client"
            variant="outline"
            size="lg"
            fullWidth
            icon={
              <SymbolView
                name={{
                  ios: 'plus',
                  android: 'add',
                  web: 'add',
                }}
                size={IconSizes.sm}
                weight="bold"
                tintColor={theme.secondary}
              />
            }
            style={[styles.createButton, { borderColor: theme.secondary }]}
            textStyle={[styles.createButtonText, { color: theme.secondary }]}
            onPress={() => {
              setIsSearchFocused(false);
              setIsCreateModalOpen(true);
            }}
          />

          {/* 3. Static Recent Clients (3 clients displayed below Create New Client) */}
          <View style={styles.recentClientsSection}>
            <View style={styles.listHeaderRow}>
              <ThemedText
                style={[styles.listHeaderOverline, { color: theme.primary }]}>
                RECENT CLIENTS
              </ThemedText>
              <ThemedText
                style={[styles.listHeaderHint, { color: theme.textSecondary }]}>
                Tap to select
              </ThemedText>
            </View>

            {recentThreeClients.map((client) => (
              <ClientListItem
                key={client.id}
                name={client.name}
                details={client.email}
                initial={client.initial}
                badgeText={client.badgeText}
                onPress={() => handleSelectClient(client)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* 1. Modal: Create New Client Popup */}
      <Modal
        visible={isCreateModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsCreateModalOpen(false)}>
        <View style={styles.modalOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setIsCreateModalOpen(false)}
          />
          <View
            style={[
              styles.modalCard,
              { backgroundColor: theme.card, borderColor: theme.borderSubtle },
            ]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleBlock}>
                <ThemedText style={[styles.modalOverline, { color: theme.primary }]}>
                  NEW CLIENT
                </ThemedText>
                <ThemedText style={[styles.modalTitle, { color: theme.text }]}>
                  Create client profile
                </ThemedText>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close create client dialog"
                onPress={() => setIsCreateModalOpen(false)}
                style={styles.modalCloseBtn}>
                <SymbolView
                  name={{ ios: 'xmark', android: 'close', web: 'close' }}
                  size={IconSizes.sm}
                  tintColor={theme.secondary}
                />
              </Pressable>
            </View>

            <CreateClientCard
              clientName={newClientName}
              contact={newClientContact}
              onClientNameChange={setNewClientName}
              onContactChange={setNewClientContact}
              onSave={handleSaveClient}
              loading={isSaving}
              bare
              style={styles.createCardInner}
            />
          </View>
        </View>
      </Modal>

      {/* 2. Modal: Confirmation for New Analysis Popup */}
      <Modal
        visible={isConfirmModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsConfirmModalOpen(false)}>
        <View style={styles.modalOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setIsConfirmModalOpen(false)}
          />
          <View
            style={[
              styles.modalCard,
              { backgroundColor: theme.card, borderColor: theme.borderSubtle },
            ]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTitleBlock}>
                <ThemedText style={[styles.modalOverline, { color: theme.primary }]}>
                  {confirmationClient?.isExistingClient
                    ? 'EXISTING CLIENT · NEW ANALYSIS'
                    : 'NEW CLIENT · START ANALYSIS'}
                </ThemedText>
                <ThemedText style={[styles.modalTitle, { color: theme.text }]}>
                  Start new analysis
                </ThemedText>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close confirmation dialog"
                onPress={() => setIsConfirmModalOpen(false)}
                style={styles.modalCloseBtn}>
                <SymbolView
                  name={{ ios: 'xmark', android: 'close', web: 'close' }}
                  size={IconSizes.sm}
                  tintColor={theme.secondary}
                />
              </Pressable>
            </View>

            {confirmationClient ? (
              <View style={styles.confirmBody}>
                <View
                  style={[
                    styles.confirmClientBanner,
                    {
                      backgroundColor: theme.surfaceSecondary,
                      borderColor: theme.borderSubtle,
                    },
                  ]}>
                  <View
                    style={[
                      styles.confirmAvatar,
                      { backgroundColor: theme.secondary },
                    ]}>
                    <ThemedText
                      style={[
                        styles.confirmAvatarText,
                        { color: theme.secondaryText },
                      ]}>
                      {confirmationClient.initial}
                    </ThemedText>
                  </View>
                  <View style={styles.confirmClientInfo}>
                    <View style={styles.nameRow}>
                      <ThemedText
                        style={[styles.confirmClientName, { color: theme.text }]}>
                        {confirmationClient.name}
                      </ThemedText>
                      <View
                        style={[
                          styles.clientStatusPill,
                          {
                            backgroundColor: confirmationClient.isExistingClient
                              ? 'rgba(15, 61, 58, 0.1)'
                              : 'rgba(204, 159, 77, 0.18)',
                          },
                        ]}>
                        <ThemedText
                          style={[
                            styles.clientStatusPillText,
                            {
                              color: confirmationClient.isExistingClient
                                ? theme.secondary
                                : theme.primary,
                            },
                          ]}>
                          {confirmationClient.isExistingClient
                            ? 'Existing Client'
                            : 'New Client'}
                        </ThemedText>
                      </View>
                    </View>
                    <ThemedText
                      style={[
                        styles.confirmClientContact,
                        { color: theme.textSecondary },
                      ]}>
                      {confirmationClient.email}
                    </ThemedText>
                  </View>
                </View>

                <ThemedText
                  style={[
                    styles.confirmMessage,
                    { color: theme.textSecondary },
                  ]}>
                  {confirmationClient.isExistingClient
                    ? `You are starting a fresh hair analysis session for existing client ${confirmationClient.name}. Proceed to capture current hair photos next.`
                    : `New client profile registered for ${confirmationClient.name}. Proceed to capture initial hair photos to begin analysis.`}
                </ThemedText>

                <View style={styles.confirmActions}>
                  <Button
                    title="Confirm & Start Analysis"
                    variant="primary"
                    size="lg"
                    fullWidth
                    onPress={handleProceedToCapture}
                    style={styles.confirmPrimaryBtn}
                  />
                  <Button
                    title="Choose another client"
                    variant="outline"
                    size="md"
                    fullWidth
                    onPress={() => setIsConfirmModalOpen(false)}
                    style={[
                      styles.confirmCancelBtn,
                      { borderColor: theme.border },
                    ]}
                    textStyle={{ color: theme.secondary }}
                  />
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </Modal>

      {/* 3. Modal: Preparing Session Loading Animation */}
      <Modal visible={isPreparing} transparent animationType="fade">
        <View style={styles.preparingOverlay}>
          <View
            style={[
              styles.preparingCard,
              { backgroundColor: theme.card, borderColor: theme.borderSubtle },
            ]}>
            <View
              style={[
                styles.preparingSpinnerBox,
                { backgroundColor: theme.surfaceSecondary },
              ]}>
              <ActivityIndicator size="large" color={theme.primary} />
            </View>
            <View style={styles.preparingTextBlock}>
              <ThemedText
                style={[styles.preparingOverline, { color: theme.primary }]}>
                PREPARING SESSION
              </ThemedText>
              <ThemedText style={[styles.preparingTitle, { color: theme.text }]}>
                Setting up analysis...
              </ThemedText>
              <ThemedText
                style={[styles.preparingSubtitle, { color: theme.textSecondary }]}>
                {confirmationClient
                  ? `Initializing camera and hair assessment workspace for ${confirmationClient.name}.`
                  : 'Initializing camera and hair assessment workspace...'}
              </ThemedText>
            </View>
            <View
              style={[
                styles.preparingProgressTrack,
                { backgroundColor: theme.surfaceSecondary },
              ]}>
              <View
                style={[
                  styles.preparingProgressBar,
                  { backgroundColor: theme.primary },
                ]}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Staff Navigation Bar */}
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
    paddingTop: Platform.select({ ios: Spacing.two, default: Spacing.four }),
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
  createButton: {
    borderRadius: BorderRadii.pill,
    height: 52,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },
  createButtonText: {
    fontSize: Typography.body.fontSize,
    fontWeight: FontWeights.semiBold,
  },
  suggestionEmptyBox: {
    paddingVertical: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
  },
  suggestionEmptyText: {
    fontSize: Typography.body.fontSize,
    textAlign: 'center',
  },
  suggestionEmptyBtn: {
    marginTop: Spacing.one,
    borderRadius: BorderRadii.pill,
  },
  recentClientsSection: {
    width: '100%',
    gap: Spacing.three,
    marginTop: Spacing.one,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.one,
    marginBottom: 2,
  },
  listHeaderOverline: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  listHeaderHint: {
    fontSize: Typography.caption.fontSize,
  },
  noResultsBox: {
    width: '100%',
    padding: Spacing.five,
    borderRadius: BorderRadii.xl,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    gap: Spacing.two,
  },
  noResultsTitle: {
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
  },
  noResultsSub: {
    fontSize: Typography.body.fontSize,
    textAlign: 'center',
  },
  noResultsBtn: {
    marginTop: Spacing.two,
    borderRadius: BorderRadii.pill,
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
  modalCloseBtn: {
    padding: Spacing.one,
  },
  createCardInner: {
    borderWidth: 0,
    padding: 0,
    backgroundColor: 'transparent',
    elevation: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
  },
  confirmBody: {
    gap: Spacing.four,
  },
  confirmClientBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: BorderRadii.lg,
    borderWidth: 1,
  },
  confirmAvatar: {
    width: 46,
    height: 46,
    borderRadius: BorderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmAvatarText: {
    fontSize: 20,
    fontWeight: FontWeights.bold,
  },
  confirmClientInfo: {
    gap: 2,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  clientStatusPill: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: BorderRadii.full,
  },
  clientStatusPillText: {
    fontSize: 10.5,
    fontWeight: FontWeights.bold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  confirmClientName: {
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
  },
  confirmClientContact: {
    fontSize: Typography.small.fontSize,
  },
  confirmMessage: {
    fontSize: Typography.body.fontSize,
    lineHeight: 22,
  },
  confirmActions: {
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  confirmPrimaryBtn: {
    borderRadius: BorderRadii.pill,
    height: 52,
  },
  confirmCancelBtn: {
    borderRadius: BorderRadii.pill,
    height: 46,
    backgroundColor: 'transparent',
  },
  preparingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 61, 58, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  preparingCard: {
    width: '100%',
    maxWidth: 360,
    borderRadius: BorderRadii.xl,
    padding: Spacing.five,
    alignItems: 'center',
    borderWidth: 1,
    ...(Shadows.md as object),
    gap: Spacing.three,
  },
  preparingSpinnerBox: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  preparingTextBlock: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  preparingOverline: {
    fontSize: Typography.caption.fontSize,
    fontWeight: FontWeights.bold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  preparingTitle: {
    fontSize: Typography.title.fontSize,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
  },
  preparingSubtitle: {
    fontSize: Typography.small.fontSize,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: Spacing.two,
  },
  preparingProgressTrack: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: Spacing.two,
  },
  preparingProgressBar: {
    width: '65%',
    height: '100%',
    borderRadius: 3,
  },
});
