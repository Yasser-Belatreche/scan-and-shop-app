import 'react-native';
import React from 'react';
import {Image, View} from 'react-native';
import {render} from '@testing-library/react-native';

import {SPACINGS} from '../../../../theme';
import {ProductImage} from './ProductImage';

describe('ProductCard - ProductImage component', () => {
  const mockLink = 'https://someFakePicLink.com';

  it('should render the correct elements with the default row view', () => {
    const instance = render(<ProductImage pictureLink={mockLink} />);

    const ImageContainer = instance.UNSAFE_getByType(View);
    const ProductPic = instance.UNSAFE_getByType(Image);

    expect(ProductPic).toHaveProp('source', {uri: mockLink});
    expect(ImageContainer).toHaveStyle({
      width: 100 - SPACINGS.m * 2,
      height: '100%',
    });
  });

  it('should render with the grid view when gridView passed in the props', () => {
    const instance = render(<ProductImage pictureLink={mockLink} gridView />);

    const ImageContainer = instance.UNSAFE_getByType(View);

    expect(ImageContainer).toHaveStyle({
      width: '100%',
      height: '50%',
      maxHeight: 100,
    });
  });
});
