import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import {TextInput} from 'react-native';

import ResetPassword from './ResetPassword';

describe('ResetPassword screen', () => {
  let replaceMock: jest.Mock<any, any>;
  let globalNavigation: any;

  beforeEach(() => {
    replaceMock = jest.fn();
    globalNavigation = {
      replace: replaceMock,
    };
  });

  afterEach(() => {
    replaceMock.mockReset();
  });

  it('should render correctly with the right UI elements', async () => {
    const screenInstance = render(
      <ResetPassword globalNavigation={globalNavigation} />,
    );

    await screenInstance.findByText('Reset Password');
    await screenInstance.findByText('Enter your new password :');

    const inputs = screenInstance.UNSAFE_getAllByType(TextInput);
    const submitButton = screenInstance.getByTestId('submitButton');

    inputs.map(input => expect(input).toHaveProp('secureTextEntry', true));
    expect(submitButton).toBeDefined();
  });
});
