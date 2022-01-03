import React from 'react';
import {View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// utils
import {IMAGES} from '../../../../../../utils/constants';

// styles
import {styles} from '../../Home.style';

// types
import {HomeStackNavigationProp} from '../../../../HomeStack.types';

// components
import {TextButton} from '../../../../../../components/Buttons';
import Header from '../../../../../../components/Header/Header';

interface Props {}

const ScanAnItem: React.FC<Props> = () => {
  const navigation = useNavigation<HomeStackNavigationProp<'Home'>>();

  return (
    <View style={styles.scanAnItemContainer}>
      <Image
        source={IMAGES.homeMan}
        style={styles.manImage}
        resizeMode="contain"
      />
      <Header
        variant="h4"
        fontWeight="bold"
        color="white"
        capitalize
        style={{maxWidth: 140}}>
        Scan and find products from all around the world
      </Header>
      <TextButton
        variant="primary"
        onPress={() => navigation.navigate('Scan')}
        style={{maxWidth: 140}}>
        Scan Now
      </TextButton>
    </View>
  );
};

export {ScanAnItem};
