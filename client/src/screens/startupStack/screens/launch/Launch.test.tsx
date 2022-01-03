import 'react-native';
import React from 'react';
import Native from '@react-navigation/native';
import {render, RenderAPI, fireEvent} from '@testing-library/react-native';

import Launch from './Launch';
import {ImageBackground} from 'react-native';
import {IMAGES} from '../../../../utils/constants';

describe('Launch Screen', () => {
  let useNavigationSpy: jest.SpyInstance;
  let replaceSpy: jest.Mock<any, any>;

  let props: any = {
    globalNavigation: {
      replace: jest.fn(),
    },
  };

  beforeEach(() => {
    replaceSpy = jest.fn();
    useNavigationSpy = jest
      .spyOn(Native, 'useNavigation')
      .mockImplementation(() => ({
        replace: replaceSpy,
      }));
  });

  afterEach(() => {
    replaceSpy.mockRestore();
    useNavigationSpy.mockRestore();
  });

  it('should renders correctly with the right UI', () => {
    const screenInstance: RenderAPI = render(<Launch {...props} />);

    const background = screenInstance.UNSAFE_getByType(ImageBackground);
    const welcomText = screenInstance.getByText('welcome');
    const loginButton = screenInstance.getByText('Login');
    const goWithoutLoginButton = screenInstance.getByText('Go wihout login');

    expect(background.props).toHaveProperty('source', IMAGES.startupImage);
    expect(welcomText).toBeDefined();
    expect(loginButton).toBeDefined();
    expect(goWithoutLoginButton).toBeDefined();
  });

  it('should have a login button that take to login screen, and a button take to home screen', () => {
    const screenInstance: RenderAPI = render(<Launch {...props} />);

    expect(useNavigationSpy).toBeCalledTimes(1);

    const loginButton = screenInstance.getByTestId('loginButton');
    const goWithoutLoginButton = screenInstance.getByText('Go wihout login');

    fireEvent(loginButton, 'onPress');

    expect(replaceSpy).toBeCalledTimes(1);
    expect(replaceSpy).toBeCalledWith('Login');

    fireEvent(goWithoutLoginButton, 'onPress');

    expect(props.globalNavigation.replace).toBeCalledTimes(1);
    expect(props.globalNavigation.replace).toBeCalledWith('HomeStack', {
      screen: 'Home',
    });
  });
});
