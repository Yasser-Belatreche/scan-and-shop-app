import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import {TextInput} from 'react-native';

import Signup from './Signup';

describe('Signup Screen', () => {
  let replaceMock: jest.Mock<any, any>;
  let globalNavigation: any;

  beforeEach(() => {
    replaceMock = jest.fn();
    globalNavigation = {
      replace: replaceMock,
    };
  });

  afterEach(() => {
    replaceMock.mockRestore();
  });

  it('should renders correctly with the right UI elements', async () => {
    const screenIntance = render(
      <Signup globalNavigation={globalNavigation} />,
    );

    await screenIntance.findByText('hi 👋');
    await screenIntance.findByText('Welcom to');
    await screenIntance.findByText('Signup with Google');
    await screenIntance.findByText('Signup with Facebook');
    await screenIntance.findByText('or');
    await screenIntance.findByText('name');
    await screenIntance.findByText('email');
    await screenIntance.findByText('password');
    await screenIntance.findByText('Already have an account ?');
    await screenIntance.findByText('Login');

    const [nameInput, emailInput, passwordInput] =
      screenIntance.UNSAFE_getAllByType(TextInput);
    const singupButton = screenIntance.getByTestId('signupButton');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(passwordInput).toHaveProp('secureTextEntry', true);
    expect(singupButton).toBeDefined();
  });
});
