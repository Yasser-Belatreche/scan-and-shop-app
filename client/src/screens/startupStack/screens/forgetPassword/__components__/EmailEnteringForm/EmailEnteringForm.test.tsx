import 'react-native';
import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import {TextInput} from 'react-native';
import Native from '@react-navigation/native';
import * as ErrorHandler from '../../../../../../utils/helpers/handleError/handleError';

import {EmailEnteringForm} from './EmailEnteringForm';
import {APICalls} from '../../../../../../apis';
import {InvalidInputValuesError} from '../../../../../../apis/__utils__/Errors';

describe('ForgetPassword screen, EmailEnteringForm', () => {
  const mockEmail = 'email@example.com';

  let setLoaderMock: jest.Mock<any, any>;
  let sendVerificationCodeSpy: jest.SpyInstance;
  let replaceMock: jest.Mock<any, any>;
  let useNavigationSpy: jest.SpyInstance;
  let handleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    setLoaderMock = jest.fn();
    replaceMock = jest.fn();
    sendVerificationCodeSpy = jest
      .spyOn(APICalls, 'sendVerificationEmail')
      .mockImplementation(() => Promise.resolve());
    useNavigationSpy = jest
      .spyOn(Native, 'useNavigation')
      .mockImplementation(() => ({
        replace: replaceMock,
      }));
    handleErrorSpy = jest
      .spyOn(ErrorHandler, 'handleError')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    setLoaderMock.mockReset();
    replaceMock.mockReset();
    useNavigationSpy.mockRestore();
    sendVerificationCodeSpy.mockRestore();
    handleErrorSpy.mockRestore();
  });

  it('should render correctly with the right UI', () => {
    const instance = render(<EmailEnteringForm setLoader={setLoaderMock} />);

    const emailInput = instance.UNSAFE_getByType(TextInput);
    const submitButton = instance.getByTestId('submitEmailButton');

    expect(emailInput).toHaveProp('keyboardType', 'email-address');
    expect(emailInput).toHaveProp('placeholder', 'Example@email.com');

    expect(submitButton).toBeDefined();
  });

  describe('onPress method', () => {
    it('should call the sendVerificationEmail api endpoint and go to EmailVerification screen when everything is OK', async () => {
      const instance = render(<EmailEnteringForm setLoader={setLoaderMock} />);

      const emailInput = instance.UNSAFE_getByType(TextInput);
      const submitButton = instance.getByTestId('submitEmailButton');

      fireEvent(emailInput, 'onChangeText', mockEmail);
      await fireEvent(submitButton, 'onPress');

      expect(setLoaderMock).toBeCalledTimes(1);
      expect(setLoaderMock).toBeCalledWith(true);

      expect(sendVerificationCodeSpy).toBeCalledTimes(1);
      expect(sendVerificationCodeSpy).toBeCalledWith(mockEmail);

      expect(replaceMock).toBeCalledTimes(1);
      expect(replaceMock).toBeCalledWith(
        'EmailVerification',
        expect.objectContaining({
          email: mockEmail,
        }),
      );
    });

    it('should show an email error when we have an email property in the response error', async () => {
      const error = 'unvalid email';
      sendVerificationCodeSpy.mockImplementation(() =>
        Promise.reject(
          new InvalidInputValuesError({success: false, errors: {email: error}}),
        ),
      );

      const instance = render(<EmailEnteringForm setLoader={setLoaderMock} />);

      const emailInput = instance.UNSAFE_getByType(TextInput);
      const submitButton = instance.getByTestId('submitEmailButton');

      fireEvent(emailInput, 'onChangeText', mockEmail);

      await act(async () => {
        await fireEvent(submitButton, 'onPress');
      });

      expect(setLoaderMock).toBeCalledTimes(2);
      expect(setLoaderMock.mock.calls).toEqual([[true], [false]]);

      expect(sendVerificationCodeSpy).toBeCalledTimes(1);
      expect(sendVerificationCodeSpy).toBeCalledWith(mockEmail);

      expect(replaceMock).toBeCalledTimes(0);
      expect(handleErrorSpy).toBeCalledTimes(0);

      await instance.findByText(error);
    });

    it('should call the handleError method when we have an unkown error', async () => {
      const error = 'unkown error';
      sendVerificationCodeSpy.mockImplementation(() => Promise.reject(error));

      const instance = render(<EmailEnteringForm setLoader={setLoaderMock} />);

      const emailInput = instance.UNSAFE_getByType(TextInput);
      const submitButton = instance.getByTestId('submitEmailButton');

      fireEvent(emailInput, 'onChangeText', mockEmail);
      await fireEvent(submitButton, 'onPress');

      expect(setLoaderMock).toBeCalledTimes(2);
      expect(setLoaderMock.mock.calls).toEqual([[true], [false]]);

      expect(sendVerificationCodeSpy).toBeCalledTimes(1);
      expect(sendVerificationCodeSpy).toBeCalledWith(mockEmail);

      expect(replaceMock).toBeCalledTimes(0);

      expect(handleErrorSpy).toBeCalledTimes(1);
      expect(handleErrorSpy).toBeCalledWith(error);
    });
  });
});
