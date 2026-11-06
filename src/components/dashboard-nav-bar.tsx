import { SymbolView } from 'expo-symbols';
import { type ComponentProps, useEffect, useState } from 'react';
import { Keyboard, Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import {
  BorderRadii,
  FontWeights,
  IconSizes,
  MaxContentWidth,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type DashboardTab = 'home' | 'reports' | 'profile';

export type DashboardNavBarProps = {
  activeTab?: DashboardTab;
  onTabChange?: (tab: DashboardTab) => void;
  hideOnKeyboard?: boolean;
};

export function DashboardNavBar({
  activeTab = 'home',
  onTabChange,
  hideOnKeyboard = true,
}: DashboardNavBarProps) {
  const theme = useTheme();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    if (!hideOnKeyboard) return;

    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEvent, () => {
      setIsKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [hideOnKeyboard]);

  if (hideOnKeyboard && isKeyboardVisible) {
    return null;
  }

  const tabs: {
    id: DashboardTab;
    label: string;
    icon: ComponentProps<typeof SymbolView>['name'];
  }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: { ios: 'house', android: 'home', web: 'home' } as any,
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: { ios: 'doc.text', android: 'description', web: 'description' } as any,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: { ios: 'person', android: 'person', web: 'person' } as any,
    },
  ];

  return (
    <View
      style={[
        styles.navBarContainer,
        {
          backgroundColor: theme.backgroundElement,
          borderTopColor: theme.border,
        },
      ]}>
      <View style={styles.navBarContent}>
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          const activeColor = isSelected ? theme.secondary : theme.textMuted;

          return (
            <Pressable
              key={tab.id}
              accessibilityRole="button"
              accessibilityLabel={`Navigate to ${tab.label}`}
              accessibilityState={{ selected: isSelected }}
              onPress={() => onTabChange?.(tab.id)}
              style={({ pressed }) => [
                styles.tabItem,
                isSelected && styles.tabItemActive,
                pressed && styles.pressed,
              ]}>
              {/* Active Tab Top Indicator Bar */}
              {isSelected ? (
                <View
                  style={[
                    styles.activeIndicator,
                    { backgroundColor: theme.primary },
                  ]}
                />
              ) : null}

              <SymbolView
                name={tab.icon}
                size={IconSizes.md}
                weight={isSelected ? 'bold' : 'medium'}
                tintColor={activeColor}
              />
              <ThemedText
                style={[
                  styles.tabLabel,
                  {
                    color: activeColor,
                    fontWeight: isSelected
                      ? FontWeights.bold
                      : FontWeights.medium,
                  },
                ]}>
                {tab.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBarContainer: {
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: Spacing.two,
    paddingBottom: 4,
  },
  navBarContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.one,
    paddingBottom: 3,
    borderRadius: BorderRadii.lg,
    gap: 3,
    minWidth: 78,
    position: 'relative',
  },
  tabItemActive: {
    backgroundColor: 'rgba(15, 61, 58, 0.08)',
  },
  activeIndicator: {
    position: 'absolute',
    top: -Spacing.two - 1,
    width: 36,
    height: 3,
    borderRadius: BorderRadii.full,
  },
  pressed: {
    opacity: 0.6,
  },
  tabLabel: {
    fontSize: Typography.caption.fontSize,
  },
});
