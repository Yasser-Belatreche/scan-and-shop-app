import React from 'react';
import {View, Image, StyleProp, ViewStyle} from 'react-native';

// styles
import {styles} from '../../ProductCard.style';

interface Props {
  pictureLink: string;
  gridView?: boolean;
}

const ProductImage: React.FC<Props> = ({pictureLink, gridView}) => {
  let customStyles: StyleProp<ViewStyle> = {...styles.imageContainer};

  if (gridView) {
    customStyles = Object.assign(customStyles, styles.gridViewImageContainer);
  }

  return (
    <View style={customStyles}>
      <Image
        source={{uri: pictureLink}}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};
export {ProductImage};
