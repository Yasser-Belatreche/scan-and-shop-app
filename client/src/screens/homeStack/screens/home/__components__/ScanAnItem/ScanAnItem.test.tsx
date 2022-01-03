import 'react-native';
import React from 'react';
import {Image, TouchableHighlight} from 'react-native';
import Native from '@react-navigation/native';
import {fireEvent, render} from '@testing-library/react-native';

import {ScanAnItem} from './ScanAnItem';
import {IMAGES} from '../../../../../../utils/constants';

describe('Home screen, ScanAnItem component', () => {
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

  it('should render correctly with the right UI', async () => {
    const instance = render(<ScanAnItem />);

    const ManImage = instance.UNSAFE_getByType(Image);
    await instance.findByText(
      'Scan and find products from all around the world',
    );
    await instance.findByText('Scan Now');

    expect(ManImage).toHaveProp('source', IMAGES.homeMan);
  });

  it('should take you to Scan screen when pressing the scan now button', () => {
    const instance = render(<ScanAnItem />);

    const Button = instance.UNSAFE_getByType(TouchableHighlight);

    expect(useNavigationSpy).toBeCalledTimes(1);

    fireEvent(Button, 'onPress');

    expect(navigateMock).toBeCalledTimes(1);
    expect(navigateMock).toBeCalledWith('Scan');
  });
});
