import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Native from '@react-navigation/native';

import BottomLinks from './BottomLinks';

describe('Signup screen, BottomLinks component', () => {
  let navigateMock: jest.Mock<any, any>;
  let useNavigationSpy: jest.SpyInstance;

  beforeEach(() => {
    navigateMock = jest.fn();
    useNavigationSpy = jest
      .spyOn(Native, 'useNavigation')
      .mockImplementation(() => ({
        navigate: navigateMock,
      }));
  });

  afterEach(() => {
    navigateMock.mockRestore();
    useNavigationSpy.mockRestore();
  });

  it('should render correctly with the right UI', async () => {
    const instance = render(<BottomLinks />);

    await instance.findByText('Already have an account ?');
    await instance.findByText('Login');
  });

  it('should take you to login screen when pressing login', async () => {
    const instance = render(<BottomLinks />);

    const loginButton = await instance.findByText('Login');

    fireEvent(loginButton, 'onPress');

    expect(useNavigationSpy).toBeCalledTimes(1);
    expect(navigateMock).toBeCalledTimes(1);
    expect(navigateMock).toBeCalledWith('Login');
  });
});
