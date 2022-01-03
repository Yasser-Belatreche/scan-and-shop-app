import {useNavigation} from '@react-navigation/native';
import React from 'react';

// component
import {IconButton} from '../../../../../../components/Buttons';

// utiles
import {ICONS} from '../../../../../../utils/constants';

// types
import {HomeStackNavigationProp} from '../../../../HomeStack.types';

interface Props {}

const CartButton: React.FC<Props> = () => {
  const navigation = useNavigation<HomeStackNavigationProp<'Home'>>();
  return (
    <IconButton
      icon={ICONS.cart}
      backgroundColor="darkShade"
      onPress={() => navigation.navigate('Cart')}
      size={60}
      floten
    />
  );
};

export {CartButton};
