import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';

// styles
import {styles} from '../../ProductCard.style';

// types
import {Companies} from '../../ProductCard.types';

// components
import Header from '../../../Header/Header';
import {Title} from './__components__/Title';
import {Rating} from './__components__/Rating';
import {Price} from './__components__/Price';

interface Props {
  title: string;
  company: Companies;
  rating: number;
  price: number;
  gridView?: boolean;
}

const DetailsContainer: React.FC<Props> = props => {
  let customStyles: StyleProp<ViewStyle> = {...styles.detailsContainer};

  if (props.gridView) {
    customStyles = Object.assign(customStyles, styles.gridViewDetailsContainer);
  }

  return (
    <View style={customStyles}>
      <Title title={props.title} />

      <View style={styles.companyRatingContainer}>
        <Header color="greyDeeper">{props.company}</Header>
        <View style={styles.point} />
        <Rating rating={props.rating} />
      </View>

      <Price price={props.price} />
    </View>
  );
};

export {DetailsContainer};
