import 'react-native';
import React from 'react';
import {TextInput} from 'react-native';
import {render} from '@testing-library/react-native';

import ForgetPassword from './ForgetPassword';

describe('ForgetPassword Screen', () => {
  it('should renders correctly', async () => {
    const screenInstance = render(<ForgetPassword />);

    const emailInput = screenInstance.UNSAFE_getByType(TextInput);
    const submitButton = screenInstance.getByTestId('submitEmailButton');

    await screenInstance.findByText('Forget password ?');
    await screenInstance.findByText(
      'Enter the old email that you create your account with:',
    );
    expect(emailInput).toHaveProp('keyboardType', 'email-address');
    expect(emailInput).toHaveProp('placeholder', 'Example@email.com');

    expect(submitButton).toBeDefined();
  });
});
