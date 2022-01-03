import React from 'react';
import {View, Image} from 'react-native';

// styles
import {styles} from '../../../ProductCard.style';

// components
import Header from '../../../../Header/Header';

// utils
import {ICONS} from '../../../../../utils/constants';

// theme
import {SPACINGS} from '../../../../../theme';

interface Props {
  rating: number;
}

const Rating: React.FC<Props> = ({rating}) => {
  return (
    <View style={styles.row}>
      <Header color="greyDeeper">{rating}</Header>
      <Image
        source={ICONS.ratingStar}
        style={{width: 10, height: 10, marginLeft: SPACINGS.m / 4}}
        resizeMode="contain"
      />
    </View>
  );
};
export {Rating};
