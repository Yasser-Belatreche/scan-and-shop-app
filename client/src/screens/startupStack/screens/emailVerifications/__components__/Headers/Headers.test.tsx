import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import Native from '@react-navigation/native';

import Headers from './Headers';

describe('EmailVerification screen, Headers component', () => {
  const mockEmail = 'test@gmail.com';

  let useRouteSpy: jest.SpyInstance;

  beforeEach(() => {
    useRouteSpy = jest.spyOn(Native, 'useRoute').mockImplementation(
      () =>
        ({
          params: {email: mockEmail},
        } as any),
    );
  });

  afterEach(() => {
    useRouteSpy.mockRestore();
  });

  it('should render correctly with the right UI elements', async () => {
    const instance = render(<Headers />);

    expect(useRouteSpy).toBeCalledTimes(1);

    await instance.findByText('Verify your email adress');
    await instance.findByText('We sent a verification code to your email');
    await instance.findByText(` ${mockEmail}`);
  });
});
