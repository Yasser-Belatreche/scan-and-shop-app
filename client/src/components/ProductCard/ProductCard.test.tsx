import 'react-native';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {render} from '@testing-library/react-native';

import {ProductCard} from './ProductCard';
import {ICONS} from '../../utils/constants';

describe('ProductCard Component', () => {
  const fakeData: any = {
    title: 'apple watch',
    price: 20,
    rating: 3.5,
    company: 'eBay',
    pictureLink: 'https://someFakePicLink.com',
  };

  it('should render the correct elements with the default row view', () => {
    const instance = render(<ProductCard {...fakeData} />);

    const CardContainer = instance.UNSAFE_getByType(TouchableOpacity);
    const [productImage, ratingStar] = instance.UNSAFE_getAllByType(Image);

    instance.getByText(fakeData.title);
    instance.getByText(`$${fakeData.price}.00`);
    instance.getByText(`${fakeData.rating}`);
    instance.getByText(fakeData.company);

    expect(productImage).toHaveProp('source', {uri: fakeData.pictureLink});
    expect(ratingStar).toHaveProp('source', ICONS.ratingStar);

    expect(CardContainer).toHaveStyle({flexDirection: 'row'});
  });

  it('should give custom styles to the container when passing style props', () => {
    const instance = render(
      <ProductCard {...fakeData} style={{margin: 300}} />,
    );

    const CardContainer = instance.UNSAFE_getByType(TouchableOpacity);

    expect(CardContainer).toHaveStyle({margin: 300});
  });

  it('should show the container with the grid view when gridView passed in the props', () => {
    const instance = render(<ProductCard {...fakeData} gridView />);

    const CardContainer = instance.UNSAFE_getByType(TouchableOpacity);

    expect(CardContainer).toHaveStyle({flexDirection: 'column'});
  });
});
