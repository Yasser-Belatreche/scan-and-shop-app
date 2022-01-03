import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import {Headers} from './Headers';

describe('ResetPassword screen, Headers component', () => {
  it('should render correctly with the right UI', async () => {
    const instance = render(<Headers />);

    await instance.findByText('Reset Password');
    await instance.findByText('Enter your new password :');
  });
});
