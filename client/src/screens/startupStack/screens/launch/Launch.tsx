import React from 'react';
import {ImageBackground, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// styles
import styles from './Launch.style';

// images
import {IMAGES} from '../../../../utils/constants';

// types
import {StartupStackNavigation} from '../../StartupStack.types';

// components
import TopHeaders from './__components__/TopHeaders';
import Buttons from './__components__/Buttons';
import {MainStackNavigationProp} from '../../../MainStack.types';

interface Props extends MainStackNavigationProp<'StartupStack'> {}

const Launch: React.FC<Props> = ({globalNavigation}) => {
  return (
    <ImageBackground source={IMAGES.startupImage} style={styles.bg}>
      <LinearGradient
        colors={['transparent', '#000000']}
        style={styles.gradientContainer}>
        <View style={styles.contentContainer}>
          <TopHeaders />
          <Buttons globalNavigation={globalNavigation} />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Launch;
