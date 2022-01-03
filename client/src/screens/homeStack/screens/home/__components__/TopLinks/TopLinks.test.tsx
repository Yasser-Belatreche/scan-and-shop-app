import 'react-native';
import React from 'react';
import Native from '@react-navigation/native';
import {fireEvent, render} from '@testing-library/react-native';

import {TopLinks} from './TopLinks';
import {Image, TouchableHighlight} from 'react-native';
import {ICONS} from '../../../../../../utils/constants';

describe('Home screen, TopLinks component', () => {
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

  it('should render correctly with the right UI elements', () => {
    const instance = render(<TopLinks />);

    const [ProfileIcon, FavouritesIcon] = instance.UNSAFE_getAllByType(Image);

    expect(ProfileIcon).toHaveProp('source', ICONS.profile);
    expect(FavouritesIcon).toHaveProp('source', ICONS.favourites);
  });

  it('should take you to favourites screen when clicking favourites and to profile screen when clicking the profile', () => {
    const instance = render(<TopLinks />);

    const [ProfileButton, FavouritesButton] =
      instance.UNSAFE_getAllByType(TouchableHighlight);

    expect(useNavigationSpy).toBeCalledTimes(1);

    fireEvent(ProfileButton, 'onPress');

    expect(navigateMock).toBeCalledTimes(1);
    expect(navigateMock).toBeCalledWith('Profile');

    fireEvent(FavouritesButton, 'onPress');

    expect(navigateMock).toBeCalledTimes(2);
    expect(navigateMock).toBeCalledWith('Favourites');
  });
});
