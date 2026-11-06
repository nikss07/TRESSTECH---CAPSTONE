import { useSyncExternalStore } from 'react';
import { Appearance, type ColorSchemeName } from 'react-native';

function subscribe(callback: () => void) {
  const listener = Appearance.addChangeListener(callback);
  return () => listener.remove();
}

function getSnapshot(): ColorSchemeName {
  return Appearance.getColorScheme() ?? 'light';
}

function getServerSnapshot(): ColorSchemeName {
  return 'light';
}

/**
 * SSR-safe and React 19 compliant color scheme hook for web.
 * Subscribes to Appearance changes without calling setState in an effect.
 */
export function useColorScheme(): ColorSchemeName {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}



