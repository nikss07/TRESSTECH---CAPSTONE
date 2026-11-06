import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  useFonts,
  font42dotSans_300Light,
  font42dotSans_400Regular,
  font42dotSans_500Medium,
  font42dotSans_600SemiBold,
  font42dotSans_700Bold,
  font42dotSans_800ExtraBold,
} from '@expo-google-fonts/42dot-sans';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.light.primary,
    background: Colors.light.background,
    card: Colors.light.surface,
    text: Colors.light.text,
    border: Colors.light.border,
    notification: Colors.light.primary,
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    '42dotSans_300Light': font42dotSans_300Light,
    '42dotSans_400Regular': font42dotSans_400Regular,
    '42dotSans_500Medium': font42dotSans_500Medium,
    '42dotSans_600SemiBold': font42dotSans_600SemiBold,
    '42dotSans_700Bold': font42dotSans_700Bold,
    '42dotSans_800ExtraBold': font42dotSans_800ExtraBold,
    '42dot Sans': font42dotSans_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={AppTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signin" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="client-list" />
        <Stack.Screen name="new-analysis" />
        <Stack.Screen name="photo-capture" />
        <Stack.Screen name="analysis-progress" />
        <Stack.Screen name="analysis-results" />
        <Stack.Screen name="desired-color" />
        <Stack.Screen name="suggested-formula" />
        <Stack.Screen name="analysis-complete" />
        <Stack.Screen name="client-profile" />
        <Stack.Screen name="staff-menu" />
        <Stack.Screen name="reports" />
        <Stack.Screen name="chemical-reference" />
        <Stack.Screen name="profile-settings" />
        <Stack.Screen name="explore" />
      </Stack>
    </ThemeProvider>
  );
}
