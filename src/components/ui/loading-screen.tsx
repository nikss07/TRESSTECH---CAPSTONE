import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Modal,
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import {
  BorderRadii,
  FontWeights,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';

export type LoadingScreenProps = {
  visible: boolean;
  message?: string;
  submessage?: string;
  showLogo?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Reusable branded loading screen with animated dual-tone spinner and soft linen backdrop.
 * Adheres strictly to the TressTech palette (Warm Linen #EDE4D6, Dark Spruce #0F3D3A, Warm Gold #CC9F4D).
 */
export function LoadingScreen({
  visible,
  message = 'Signing you in...',
  submessage = 'Preparing your hair analysis records',
  showLogo = true,
  style,
}: LoadingScreenProps) {
  const [spinAnim] = useState(() => new Animated.Value(0));
  const [pulseAnim] = useState(() => new Animated.Value(1));
  const [fadeAnim] = useState(() => new Animated.Value(visible ? 1 : 0));
  const [isRendered, setIsRendered] = useState(visible);

  const loopAnimationRef = useRef<Animated.CompositeAnimation | null>(null);

  if (visible && !isRendered) {
    setIsRendered(true);
  }

  useEffect(() => {
    if (visible) {
      // Fade in modal container
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== 'web',
      }).start();

      // Continuous 360-degree rotation animation
      spinAnim.setValue(0);
      const spinLoop = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1100,
          easing: Easing.linear,
          useNativeDriver: Platform.OS !== 'web',
        })
      );

      // Subtle breathing pulse on the inner logo
      const pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.96,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: Platform.OS !== 'web',
          }),
        ])
      );

      loopAnimationRef.current = Animated.parallel([spinLoop, pulseLoop]);
      loopAnimationRef.current.start();
    } else if (isRendered) {
      // Fade out smoothly before unmounting
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: Platform.OS !== 'web',
      }).start(({ finished }) => {
        if (finished) {
          loopAnimationRef.current?.stop();
          setIsRendered(false);
        }
      });
    }

    return () => {
      loopAnimationRef.current?.stop();
    };
  }, [visible, fadeAnim, isRendered, pulseAnim, spinAnim]);

  if (!isRendered) {
    return null;
  }

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal
      transparent
      visible={isRendered}
      animationType="none"
      statusBarTranslucent>
      <Animated.View
        style={[
          styles.overlay,
          { opacity: fadeAnim },
          style,
        ]}>
        {/* Centered Elevated Card */}
        <View style={styles.card}>
          {/* Animated Spinner Ring */}
          <View style={styles.spinnerWrapper}>
            {/* Rotating Dual-Tone Arc */}
            <Animated.View
              style={[
                styles.spinnerRing,
                { transform: [{ rotate: spin }] },
              ]}
            />

            {/* Inner Brand Logo with subtle pulse */}
            {showLogo && (
              <Animated.View
                style={[
                  styles.logoContainer,
                  { transform: [{ scale: pulseAnim }] },
                ]}>
                <Image
                  source={require('@/assets/images/tresstechlogo.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </Animated.View>
            )}
          </View>

          {/* Loading Messages */}
          <View style={styles.textContainer}>
            <ThemedText style={styles.titleText}>
              {message}
            </ThemedText>
            {submessage ? (
              <ThemedText style={styles.subText}>
                {submessage}
              </ThemedText>
            ) : null}
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(237, 228, 214, 0.92)', // Translucent warm linen beige
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: Spacing.four,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF', // Pure white card
    borderRadius: BorderRadii.xl,
    borderWidth: 1,
    borderColor: '#E6DCCA', // Subtle beige border
    paddingVertical: Spacing.six,
    paddingHorizontal: Spacing.five,
    alignItems: 'center',
    gap: Spacing.four,
    ...(Shadows.md as object),
  },
  spinnerWrapper: {
    width: 84,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  spinnerRing: {
    position: 'absolute',
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 4,
    borderColor: 'rgba(204, 159, 77, 0.25)', // Soft gold track
    borderTopColor: '#0F3D3A', // Dark spruce green leading arc
    borderRightColor: '#CC9F4D', // Warm gold accent arc
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDE4D6', // Warm linen circle backing
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 32,
    height: 32,
  },
  textContainer: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  titleText: {
    color: '#0F3D3A', // Dark spruce green
    fontSize: Typography.bodyLarge.fontSize,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
  },
  subText: {
    color: '#4A625E', // Muted spruce green
    fontSize: Typography.small.fontSize,
    lineHeight: 20,
    textAlign: 'center',
  },
});
