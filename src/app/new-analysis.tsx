import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  Image,
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
import { BrandWordmark } from '@/components/brand-wordmark';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/ui/search-bar';
import {
  BorderRadii,
  FontWeights,
  IconSizes,
  MaxContentWidth,
  Spacing,
  Typography,
  BrandColors,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function NewAnalysisSelectClientScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [isCreatingClient, setIsCreatingClient] = useState(true);
  const [newClientName, setNewClientName] = useState('');
  const [newClientContact, setNewClientContact] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [clientsList, setClientsList] = useState([
    {
      id: 'client-1',
      name: 'Maya Chen',
      email: 'maya@example.com',
      initial: 'M',
      badgeText: 'FOLLOW UP',
    },
    {
      id: 'client-2',
      name: 'Jordan Lee',
      email: 'jordan@example.com',
      initial: 'J',
      badgeText: undefined,
    },
    {
      id: 'client-3',
      name: 'Priya Shah',
      email: 'priya@example.com',
      initial: 'P',
      badgeText: 'FOLLOW UP',
    },
  ]);

  const filteredClients = clientsList.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectClient = (client: (typeof clientsList)[0]) => {
    router.push('/photo-capture');
  };

  const handleToggleCreateClient = () => {
    setIsCreatingClient((prev) => !prev);
  };

  const handleSaveClient = () => {
    const nameToSave = newClientName.trim() || 'Jamie Taylor';
    const contactToSave = newClientContact.trim() || 'Email or phone';

    setIsSaving(true);
    setTimeout(() => {
      const created = {
        id: `client-${Date.now()}`,
        name: nameToSave,
        email: contactToSave,
        initial: nameToSave.charAt(0).toUpperCase(),
        badgeText: undefined,
      };
      setClientsList((prev) => [created, ...prev]);
      setIsSaving(false);
      setNewClientName('');
      setNewClientContact('');
      router.push('/photo-capture');
    }, 300);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar style="dark" />

      {/* Top Navbar Header with Divider */}
      <View style={[styles.topNavbar, { backgroundColor: BrandColors.headerBg, borderBottomColor: theme.border }]}>
        <View style={styles.topNavbarContent}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="TressTech Home"
            onPress={() => router.push('/dashboard')}
            style={styles.brandRow}>
            <Image
              source={require('@/assets/images/tresstechlogo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <BrandWordmark style={styles.brandTitle} />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Navigation Menu"
            onPress={() => router.push('/staff-menu')}
            style={styles.menuButton}>
            <SymbolView
              name={{
                ios: 'line.3.horizontal',
                android: 'menu',
                web: 'menu',
              }}
              size={IconSizes.md}
              tintColor={theme.secondary}
            />
          </Pressable>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView
        showsVerticalScrollIndicator={false}
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

          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search clients"
          />

          {/* Create New Client Action Button */}
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
            onPress={handleToggleCreateClient}
          />

          {/* Inline Create Client Form Card (Matches Design State) */}
          {isCreatingClient && (
            <CreateClientCard
              clientName={newClientName}
              contact={newClientContact}
              onClientNameChange={setNewClientName}
              onContactChange={setNewClientContact}
              onSave={handleSaveClient}
              loading={isSaving}
            />
          )}

          {/* Client Selection Cards Stack */}
          <View style={styles.clientCardsList}>
            {filteredClients.map((client) => (
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
  topNavbar: {
    width: '100%',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Platform.select({ ios: Spacing.two, default: Spacing.two }),
  },
  topNavbarContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
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
  clientCardsList: {
    width: '100%',
    gap: Spacing.three,
    marginTop: Spacing.one,
  },
});
