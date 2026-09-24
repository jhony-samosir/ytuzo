import React, { useState } from 'react';
import { Animated, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface TouchableScaleProps extends PressableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
}

export function TouchableScale({ children, style, onPress, scaleTo = 0.95, ...props }: TouchableScaleProps) {
  const [scale] = useState(() => new Animated.Value(1));

  const handlePressIn = (e: any) => {
    Animated.spring(scale, {
      toValue: scaleTo,
      useNativeDriver: true,
      speed: 20,
    }).start();
    props.onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
    props.onPressOut?.(e);
  };

  return (
    <AnimatedPressable 
      {...props}
      onPressIn={handlePressIn} 
      onPressOut={handlePressOut} 
      onPress={onPress}
      style={[style, { transform: [{ scale }] }]}
    >
      {children}
    </AnimatedPressable>
  );
}
