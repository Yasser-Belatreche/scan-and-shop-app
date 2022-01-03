import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import Native from '@react-navigation/native';
import {TextInput} from 'react-native';

import EmailVerification from './EmailVerification';

describe('EmailVerification Screen', () => {
  const mockEmail = 'test@gmail.com';

  let useRouteSpy: jest.SpyInstance;
  let replaceMock: jest.Mock<any, any>;
  let props: any;

  beforeEach(() => {
    useRouteSpy = jest.spyOn(Native, 'useRoute').mockImplementation(
      () =>
        ({
          params: {email: mockEmail},
        } as any),
    );
    replaceMock = jest.fn();
    props = {
      globalNavigationMock: {
        replace: replaceMock,
      },
    };
  });

  afterEach(() => {
    useRouteSpy.mockRestore();
    replaceMock.mockRestore();
  });

  it('should renders correctly', async () => {
    const screenInstance = render(<EmailVerification {...props} />);

    await screenInstance.findByText('Verify your email adress');
    await screenInstance.findByText(
      'We sent a verification code to your email',
    );
    await screenInstance.findByText(` ${mockEmail}`);

    const inputs = screenInstance.UNSAFE_getAllByType(TextInput);

    expect(inputs.length).toEqual(4);
    await screenInstance.findByTestId('sendCodeButton');
    await screenInstance.findByText('Didn’t get the code?');
    await screenInstance.findByText(' Resend code');
  });
});
