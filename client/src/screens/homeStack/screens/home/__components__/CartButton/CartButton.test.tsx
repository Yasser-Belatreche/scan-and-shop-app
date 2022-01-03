import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {Image, TouchableHighlight} from 'react-native';
import Native from '@react-navigation/native';

import {CartButton} from './CartButton';
import {ICONS} from '../../../../../../utils/constants';

describe('Home screen, CartButton component', () => {
  let useNavigationSpy: jest.SpyInstance;
  let navigateMock: jest.Mock<any, any>;

  beforeEach(() => {
    navigateMock = jest.fn();
    useNavigationSpy = jest
      .spyOn(Native, 'useNavigation')
      .mockImplementation(() => ({
        navigate: navigateMock,
      }));
  });

  afterEach(() => {
    navigateMock.mockReset();
    useNavigationSpy.mockRestore();
  });

  it('should render correctly with the right UI', () => {
    const instance = render(<CartButton />);

    const Icon = instance.UNSAFE_getByType(Image);

    expect(Icon).toHaveProp('source', ICONS.cart);
  });

  it('should take you to cart screen', () => {
    const instance = render(<CartButton />);

    const Button = instance.UNSAFE_getByType(TouchableHighlight);

    expect(useNavigationSpy).toBeCalledTimes(1);

    fireEvent(Button, 'onPress');

    expect(navigateMock).toBeCalledTimes(1);
    expect(navigateMock).toBeCalledWith('Cart');
  });
});
