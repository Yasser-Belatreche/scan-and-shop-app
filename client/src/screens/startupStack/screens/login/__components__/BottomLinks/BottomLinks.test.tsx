import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import BottomLinks from './BottomLinks';
import Native from '@react-navigation/native';

describe('Login screen, BottomLinks component', () => {
  let replaceSpy: jest.Mock;
  let navigateSpy: jest.Mock;
  let useNavigationSpy: jest.SpyInstance;

  beforeEach(() => {
    replaceSpy = jest.fn();
    navigateSpy = jest.fn();
    useNavigationSpy = jest
      .spyOn(Native, 'useNavigation')
      .mockImplementation(() => ({
        replace: replaceSpy,
        navigate: navigateSpy,
      }));
  });

  afterEach(() => {
    replaceSpy.mockRestore();
    navigateSpy.mockRestore();
    useNavigationSpy.mockRestore();
  });

  it('should render correctelly with the right UI elements', async () => {
    const instance = render(<BottomLinks />);

    await instance.findByText('Forget password ?');
    await instance.findByText('Sign up');
  });

  it('should navigate to Signup and forgetPassword screen when clicking the "Sign up" and "Forget Password"', async () => {
    const instance = render(<BottomLinks />);

    const forgetPassword = await instance.findByText('Forget password ?');
    const signupButton = await instance.findByText('Sign up');

    expect(useNavigationSpy).toBeCalledTimes(1);

    fireEvent(forgetPassword, 'onPress');

    expect(navigateSpy).toBeCalledTimes(1);
    expect(navigateSpy).toBeCalledWith('ForgetPassword');

    navigateSpy.mockReset();

    fireEvent(signupButton, 'onPress');

    expect(navigateSpy).toBeCalledTimes(1);
    expect(navigateSpy).toBeCalledWith('Signup');
  });
});
