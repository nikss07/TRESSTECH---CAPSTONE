/**
 * Centralized Design System Foundation for TressTech.
 * Defines colors, typography, spacing, border radii, shadows, and shared dimensions.
 * Changing the application color palette across Android, iOS, and Web is controlled here.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Brand Core
    primary: '#CC9F4D',
    primaryLight: '#E5BD78',
    primaryDark: '#AF8436',
    primaryText: '#0F3D3A', // High-contrast text on primary buttons
    secondary: '#0F3D3A',
    secondaryLight: '#1C5B56',
    secondaryText: '#EDE4D6',

    // Backgrounds & Surfaces
    background: '#EDE4D6', // Main background requested
    howItWorksBackground: '#EDE4D3', // Specific warm background for How It Works section
    backgroundElement: '#E3D7C5',
    backgroundSelected: '#D6C8B2',
    surface: '#FAF5EE',
    surfaceSecondary: '#F2E8DC',
    card: '#FAF5EE',

    // Typography Colors
    text: '#0F3D3A', // Brand tone for high-readability text
    textSecondary: '#4A625E',
    textMuted: '#7E918E',
    textInverse: '#EDE4D6',

    // Borders & Dividers
    border: '#D8CAB5',
    borderSubtle: '#E6DCCA',
    borderFocus: '#CC9F4D',

    // Buttons
    buttonBackground: '#CC9F4D',
    buttonText: '#0F3D3A',
    buttonSecondaryBackground: '#0F3D3A',
    buttonSecondaryText: '#EDE4D6',

    // Semantics & Status
    success: '#2E7D32',
    successBackground: '#E8F5E9',
    warning: '#D97706',
    warningBackground: '#FFFBEB',
    error: '#C62828',
    errorBackground: '#FFEBEE',

    // Navigation & Tints
    tint: '#CC9F4D',
    tabIconDefault: '#7E918E',
    tabIconSelected: '#0F3D3A',
  },
  dark: {
    // Brand Core
    primary: '#CC9F4D',
    primaryLight: '#DFC085',
    primaryDark: '#AF8436',
    primaryText: '#0F3D3A',
    secondary: '#205E59',
    secondaryLight: '#2C7E77',
    secondaryText: '#EDE4D6',

    // Backgrounds & Surfaces
    background: '#091E1C',
    howItWorksBackground: '#0B2421',
    backgroundElement: '#0F3D3A',
    backgroundSelected: '#164F4B',
    surface: '#0E2E2A',
    surfaceSecondary: '#143C37',
    card: '#0E2E2A',

    // Typography Colors
    text: '#EDE4D6',
    textSecondary: '#A2B6B2',
    textMuted: '#6B807C',
    textInverse: '#0F3D3A',

    // Borders & Dividers
    border: '#1B4743',
    borderSubtle: '#143834',
    borderFocus: '#CC9F4D',

    // Buttons
    buttonBackground: '#CC9F4D',
    buttonText: '#0F3D3A',
    buttonSecondaryBackground: '#EDE4D6',
    buttonSecondaryText: '#0F3D3A',

    // Semantics & Status
    success: '#4CAF50',
    successBackground: '#17361E',
    warning: '#F59E0B',
    warningBackground: '#382B10',
    error: '#EF4444',
    errorBackground: '#3A1818',

    // Navigation & Tints
    tint: '#CC9F4D',
    tabIconDefault: '#6B807C',
    tabIconSelected: '#CC9F4D',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

export const Typography = {
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    lineHeight: 26,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
  },
  display: {
    fontSize: 32,
    lineHeight: 40,
  },
  hero: {
    fontSize: 44,
    lineHeight: 52,
  },
} as const;

export const Spacing = {
  none: 0,
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 48,
  seven: 64,
  eight: 80,
} as const;

export const BorderRadii = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
  pill: 9999,
} as const;

export const IconSizes = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
} as const;

export const Dimensions = {
  buttonHeightSm: 36,
  buttonHeightMd: 48,
  buttonHeightLg: 56,
  inputHeight: 48,
  bottomTabInset: Platform.select({ ios: 50, android: 80 }) ?? 0,
  maxContentWidth: 800,
} as const;

export const BottomTabInset = Dimensions.bottomTabInset;
export const MaxContentWidth = Dimensions.maxContentWidth;

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: Platform.select({
    ios: {
      shadowColor: '#0F3D3A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
    },
    android: {
      elevation: 2,
    },
    web: {
      boxShadow: '0 1px 3px rgba(15, 61, 58, 0.08)',
    },
    default: {
      elevation: 2,
    },
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#0F3D3A',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
    },
    android: {
      elevation: 4,
    },
    web: {
      boxShadow: '0 4px 6px -1px rgba(15, 61, 58, 0.1), 0 2px 4px -1px rgba(15, 61, 58, 0.06)',
    },
    default: {
      elevation: 4,
    },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#0F3D3A',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.16,
      shadowRadius: 12,
    },
    android: {
      elevation: 8,
    },
    web: {
      boxShadow: '0 10px 15px -3px rgba(15, 61, 58, 0.14), 0 4px 6px -2px rgba(15, 61, 58, 0.08)',
    },
    default: {
      elevation: 8,
    },
  }),
} as const;
