import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

// component
import {Headers} from './Headers';

describe('ForgetPassword, Headers component', () => {
  it('should render correctly with the right UI', async () => {
    const instance = render(<Headers />);

    await instance.findByText('Forget password ?');
    await instance.findByText(
      'Enter the old email that you create your account with:',
    );
  });
});
