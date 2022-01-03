import React from 'react';
import {TouchableOpacity, StyleProp, ViewStyle} from 'react-native';

// styles
import {styles} from './ProductCard.style';

// components
import {ProductImage} from './__components__/ProductImage/ProductImage';
import {DetailsContainer} from './__components__/DetailsContainer/DetailsContainer';

// types
import {Companies} from './ProductCard.types';

interface Props {
  title: string;
  price: number;
  rating: number;
  pictureLink: string;
  company: Companies;
  style?: StyleProp<ViewStyle>;
  gridView?: boolean;
}

const ProductCard: React.FC<Props> = props => {
  let customStyles: StyleProp<ViewStyle> = {
    ...styles.cardContainer,
  };

  if (props.style) customStyles = Object.assign(customStyles, props.style);
  if (props.gridView) {
    customStyles = Object.assign(customStyles, styles.gridViewCardContainer);
  }

  return (
    <TouchableOpacity activeOpacity={0.7} style={customStyles}>
      <ProductImage pictureLink={props.pictureLink} gridView={props.gridView} />
      <DetailsContainer
        title={props.title}
        company={props.company}
        rating={props.rating}
        price={props.price}
        gridView={props.gridView}
      />
    </TouchableOpacity>
  );
};

export {ProductCard};
