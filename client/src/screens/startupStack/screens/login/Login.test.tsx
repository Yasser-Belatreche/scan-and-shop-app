import 'react-native';
import React from 'react';
import {RenderAPI, render, fireEvent} from '@testing-library/react-native';
import Native from '@react-navigation/native';

import {TextInput} from 'react-native';
import Login from './Login';

describe('Login Screen', () => {
  const props: any = {
    globalNavigation: {
      replace: jest.fn(),
    },
  };

  let replaceSpy: jest.Mock;
  let navigateSpy: jest.Mock;

  beforeEach(() => {
    replaceSpy = jest.fn();
    navigateSpy = jest.fn();
  });

  afterEach(() => {
    replaceSpy.mockRestore();
    navigateSpy.mockRestore();
  });

  it('should renders correctly with the right UI elements', async () => {
    const screenInstance: RenderAPI = render(<Login {...props} />);

    await screenInstance.findByText('welcom back');
    await screenInstance.findByText('Login with Google');
    await screenInstance.findByText('Login with Facebook');
    await screenInstance.findByText('or');
    await screenInstance.findByText('Forget password ?');
    await screenInstance.findByText('Sign up');

    const loginButton = screenInstance.findByTestId('loginButton');
    const [emailInput, passwordInput] =
      screenInstance.UNSAFE_getAllByType(TextInput);

    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(loginButton).toBeDefined();
  });
});
