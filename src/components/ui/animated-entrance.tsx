import { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  Platform,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export type AnimatedEntranceDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export type AnimatedEntranceProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  slideDistance?: number;
  direction?: AnimatedEntranceDirection;
  style?: StyleProp<ViewStyle>;
};

/**
 * Reusable animated entrance component.
 * Applies a smooth fade-in and directional glide to any child element or section.
 */
export function AnimatedEntrance({
  children,
  delay = 0,
  duration = 420,
  slideDistance = 18,
  direction = 'up',
  style,
}: AnimatedEntranceProps) {
  const [animValue] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.timing(animValue, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: Platform.OS !== 'web',
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [animValue, delay, duration]);

  const opacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const getTransform = () => {
    if (direction === 'none') {
      return [];
    }

    if (direction === 'up') {
      return [
        {
          translateY: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [slideDistance, 0],
          }),
        },
      ];
    }

    if (direction === 'down') {
      return [
        {
          translateY: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-slideDistance, 0],
          }),
        },
      ];
    }

    if (direction === 'left') {
      return [
        {
          translateX: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [slideDistance, 0],
          }),
        },
      ];
    }

    if (direction === 'right') {
      return [
        {
          translateX: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-slideDistance, 0],
          }),
        },
      ];
    }

    return [];
  };

  return (
    <Animated.View
      style={[
        style,
        {
          opacity,
          transform: getTransform(),
        },
      ]}>
      {children}
    </Animated.View>
  );
}
