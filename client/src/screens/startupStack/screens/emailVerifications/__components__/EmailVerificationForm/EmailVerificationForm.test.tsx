import 'react-native';
import React from 'react';
import {TextInput} from 'react-native';
import {act, fireEvent, render} from '@testing-library/react-native';
import Native from '@react-navigation/native';

import EmailVerificationForm from './EmailVerificationForm';
import {APICalls} from '../../../../../../apis';
import {InvalidInputValuesError} from '../../../../../../apis/__utils__/Errors';

describe('EmailVerification screen, EmailVerificationForm component', () => {
  const mockEmail = 'test@gmail.com';
  const mockUserToken = 'lkqmufdoiqjdslkfjqs.lidsuoifj';

  let useRouteSpy: jest.SpyInstance;
  let onSuccessMock: jest.Mock<any, any>;
  let setLoaderMock: jest.Mock<any, any>;
  let verifyCodeApiSpy: jest.SpyInstance;
  let sendVerificationCodeSpy: jest.SpyInstance;

  beforeEach(() => {
    setLoaderMock = jest.fn();

    onSuccessMock = jest.fn();
    useRouteSpy = jest.spyOn(Native, 'useRoute').mockImplementation(
      () =>
        ({
          params: {email: mockEmail, onSuccess: onSuccessMock},
        } as any),
    );

    verifyCodeApiSpy = jest
      .spyOn(APICalls, 'verifyCode')
      .mockImplementation(() => new Promise(resolve => resolve(mockUserToken)));

    sendVerificationCodeSpy = jest
      .spyOn(APICalls, 'sendVerificationEmail')
      .mockImplementation(() => new Promise(resolve => resolve('')));
  });

  afterEach(() => {
    setLoaderMock.mockRestore();
    useRouteSpy.mockRestore();
    onSuccessMock.mockReset();
    verifyCodeApiSpy.mockRestore();
    sendVerificationCodeSpy.mockRestore();
  });

  it('should render correctly with the right UI', async () => {
    const instance = render(
      <EmailVerificationForm setLoader={setLoaderMock} />,
    );

    const inputs = instance.UNSAFE_getAllByType(TextInput);

    expect(inputs.length).toEqual(4);
    await instance.findByTestId('sendCodeButton');
    await instance.findByText('Didn’t get the code?');
    await instance.findByText(' Resend code');
  });

  it('should call the verifyCode api endpoint with the code from the inputs when pressing send code button', async () => {
    const instance = render(
      <EmailVerificationForm setLoader={setLoaderMock} />,
    );

    const inputs = instance.UNSAFE_getAllByType(TextInput);
    const sendCodeButton = instance.getByTestId('sendCodeButton');

    fireEvent(inputs[0], 'onChangeText', '2');
    fireEvent(inputs[1], 'onChangeText', '1');
    fireEvent(inputs[2], 'onChangeText', '9');
    fireEvent(inputs[3], 'onChangeText', '0');

    await act(async () => {
      await fireEvent(sendCodeButton, 'onPress');
    });

    expect(setLoaderMock).toBeCalledTimes(1);
    expect(setLoaderMock.mock.calls).toEqual([[true]]);

    expect(verifyCodeApiSpy).toBeCalledTimes(1);
    expect(verifyCodeApiSpy).toBeCalledWith({email: mockEmail, code: 2190});
  });

  it('should show an error message when the code is uncorrect', async () => {
    verifyCodeApiSpy.mockImplementation(
      () =>
        new Promise((_, rejected) =>
          rejected(
            new InvalidInputValuesError({
              success: false,
              errors: 'Wrong verification code, please try again',
            }),
          ),
        ),
    );

    const instance = render(
      <EmailVerificationForm setLoader={setLoaderMock} />,
    );

    const errorText = instance.queryByText(
      'Wrong verification code, please try again',
    );
    expect(errorText).toBeNull();

    const inputs = instance.UNSAFE_getAllByType(TextInput);
    const sendCodeButton = instance.getByTestId('sendCodeButton');

    fireEvent(inputs[0], 'onChangeText', '1');
    fireEvent(inputs[1], 'onChangeText', '1');
    fireEvent(inputs[2], 'onChangeText', '9');
    fireEvent(inputs[3], 'onChangeText', '0');

    await act(async () => {
      await fireEvent(sendCodeButton, 'onPress');
    });

    expect(setLoaderMock).toBeCalledTimes(2);
    expect(setLoaderMock.mock.calls).toEqual([[true], [false]]);

    expect(verifyCodeApiSpy).toBeCalledTimes(1);
    expect(verifyCodeApiSpy).toBeCalledWith({email: mockEmail, code: 1190});

    await instance.findByText('Wrong verification code, please try again');
  });
});
