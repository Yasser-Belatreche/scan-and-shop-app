import {boolean} from '@storybook/addon-knobs';
import React, {useEffect, useRef} from 'react';
import {View, Animated, Image, Easing} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// theme
import {COLORS} from '../../../../../../../../theme';
import {ICONS} from '../../../../../../../../utils/constants';

// styles
import {styles} from '../../../../Scan.style';

// context
import {useScanScreenContext} from '../../../../__context__/context';

interface Props {}

const ScanRectangle: React.FC<Props> = () => {
  const store = useScanScreenContext();

  return (
    <View style={styles.scanRectangle} testID="scanRectangle">
      {store?.isPicConfirmed && <AnimatedScanBar />}

      <View style={styles.row}>
        <Image
          source={ICONS.borderTopLeftCorner}
          style={styles.corner}
          resizeMode="contain"
        />
        <Image
          source={ICONS.borderTopRightCorner}
          style={styles.corner}
          resizeMode="contain"
        />
      </View>

      <View style={styles.row}>
        <Image
          source={ICONS.borderBottomLeftCorner}
          style={styles.corner}
          resizeMode="contain"
        />
        <Image
          source={ICONS.borderBottomRightCorner}
          style={styles.corner}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const AnimatedScanBar = () => {
  const topAnimation = useRef(new Animated.Value(350)).current;

  useEffect(() => {
    const animation = Animated.timing(topAnimation, {
      toValue: 5,
      duration: 3000,
      useNativeDriver: false,
    });

    const loobAnimation = Animated.loop(animation);
    loobAnimation.start();
  }, []);

  return (
    <Animated.View style={{...styles.scanBar, top: topAnimation}}>
      <LinearGradient
        style={styles.scanShadow}
        colors={[
          `${COLORS.whiteShade}90`,
          `${COLORS.whiteShade}1d`,
          `transparent`,
        ]}
      />
    </Animated.View>
  );
};

export {ScanRectangle};
