import 'react-native';
import React from 'react';
import {Image, View} from 'react-native';
import {render} from '@testing-library/react-native';

import {DetailsContainer} from './DetailsContainer';
import {ICONS} from '../../../../utils/constants';

describe('ProductCard - DetailsContainer component', () => {
  const fakeData: any = {
    title: 'apple watch',
    price: 20,
    rating: 3.5,
    company: 'eBay',
  };

  it('should render the correct elements with the default row view', () => {
    const instance = render(<DetailsContainer {...fakeData} />);

    const Container = instance.UNSAFE_getByType(View);

    instance.getByText(fakeData.title);
    instance.getByText(`$${fakeData.price}.00`);
    instance.getByText(`${fakeData.rating}`);
    instance.getByText(fakeData.company);

    expect(Container).toHaveStyle({width: '70%', height: '100%'});
    expect(instance.UNSAFE_getByType(Image)).toHaveProp(
      'source',
      ICONS.ratingStar,
    );
  });

  it('should render the grid view when gridView is passed in the props', () => {
    const instance = render(<DetailsContainer {...fakeData} gridView />);

    const Container = instance.UNSAFE_getByType(View);

    expect(Container).toHaveStyle({width: '100%', height: 'auto'});
  });
});
