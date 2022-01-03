import 'react-native';
import React from 'react';
import {Image} from 'react-native';
import Native from '@react-navigation/native';
import {render} from '@testing-library/react-native';

import Home from './Home';
import {ICONS, IMAGES} from '../../../../utils/constants';

describe('Home Screen', () => {
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

  it('should renders correctly with the right UI', async () => {
    const screenInstance = render(<Home />);

    const [ProfileIcon, FavouritesIcon, ManImage, CartIcon] =
      screenInstance.UNSAFE_getAllByType(Image);

    await screenInstance.findByText(
      'Scan and find products from all around the world',
    );
    await screenInstance.findByText('Scan Now');
    await screenInstance.findByText('latest visited');

    expect(ProfileIcon).toHaveProp('source', ICONS.profile);
    expect(FavouritesIcon).toHaveProp('source', ICONS.favourites);
    expect(ManImage).toHaveProp('source', IMAGES.homeMan);
    expect(CartIcon).toHaveProp('source', ICONS.cart);
  });
});
