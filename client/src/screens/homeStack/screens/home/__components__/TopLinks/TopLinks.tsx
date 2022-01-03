import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// components
import {IconButton} from '../../../../../../components/Buttons';

// styles
import {styles} from '../../Home.style';

// types
import {HomeStackNavigationProp} from '../../../../HomeStack.types';

// icons
import {ICONS} from '../../../../../../utils/constants';

interface Props {}

const TopLinks: React.FC<Props> = () => {
  const navigation = useNavigation<HomeStackNavigationProp<'Home'>>();

  return (
    <View style={styles.topLinksContainer}>
      <IconButton
        icon={ICONS.profile}
        onPress={() => navigation.navigate('Profile')}
      />
      <IconButton
        icon={ICONS.favourites}
        onPress={() => navigation.navigate('Favourites')}
      />
    </View>
  );
};

export {TopLinks};
