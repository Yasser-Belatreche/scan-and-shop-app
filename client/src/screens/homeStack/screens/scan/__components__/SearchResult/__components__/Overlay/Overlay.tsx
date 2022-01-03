import React, {useEffect, useRef} from 'react';
import {Animated, Easing, View} from 'react-native';
import {COLORS} from '../../../../../../../../theme';

// styles
import {styles} from '../../../../Scan.style';

interface Props {
  backgroundColor?: keyof typeof COLORS;
  opacity?: number;
  animationDuration?: number;
}

const Overlay: React.FC<Props> = ({
  backgroundColor = 'white',
  opacity = 0.7,
  animationDuration = 300,
}) => {
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: opacity,
      duration: animationDuration,
      useNativeDriver: true,
      easing: Easing.in(value => value),
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...styles.overlay,
        backgroundColor: COLORS[backgroundColor],
        opacity: opacityValue,
      }}
    />
  );
};

export {Overlay};
