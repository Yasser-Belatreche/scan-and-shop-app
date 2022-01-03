import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Native from '@react-navigation/native';

import Buttons from './Buttons';
import {APICalls} from '../../../../../../../../apis';
import {UserToken} from '../../../../../../__utils__/UserToken';
import {InvalidInputValuesError} from '../../../../../../../../apis/__utils__/Errors';
import * as ErrorHandler from '../../../../../../../../utils/helpers/handleError/handleError';
import * as Toast from '../../../../../../../../utils/helpers/showToast/showToast';

describe('EmailVerification screen, EmailVerificationForm - Buttons component', () => {
  const mockEmail = 'test@gmail.com';
  const mockVerficationCode = 5241;
  const mockUserToken = 'lksdfumoiajfdlkqsjdfpoijafdz';

  let useRouteSpy: jest.SpyInstance;
  let onSuccessMock: jest.Mock<any, any>;
  let getVerificationCodeMock: jest.Mock<any, any>;
  let setIsWrongCodeMock: jest.Mock<any, any>;
  let setLoaderMock: jest.Mock<any, any>;
  let handleErrorSpy: jest.SpyInstance;
  let verifyCodeApiSpy: jest.SpyInstance;
  let sendVerificationCodeSpy: jest.SpyInstance;
  let showToastSpy: jest.SpyInstance;
  let saveTokenLocallySpy: jest.SpyInstance;

  beforeEach(() => {
    onSuccessMock = jest.fn();
    useRouteSpy = jest.spyOn(Native, 'useRoute').mockImplementation(
      () =>
        ({
          params: {email: mockEmail, onSuccess: onSuccessMock},
        } as any),
    );

    getVerificationCodeMock = jest
      .fn()
      .mockImplementation(() => mockVerficationCode);

    setLoaderMock = jest.fn();
    setIsWrongCodeMock = jest.fn();

    handleErrorSpy = jest
      .spyOn(ErrorHandler, 'handleError')
      .mockImplementation(() => {});

    verifyCodeApiSpy = jest
      .spyOn(APICalls, 'verifyCode')
      .mockImplementation(() => new Promise(resolve => resolve(mockUserToken)));

    sendVerificationCodeSpy = jest
      .spyOn(APICalls, 'sendVerificationEmail')
      .mockImplementation(() => new Promise(resolve => resolve('')));

    showToastSpy = jest.spyOn(Toast, 'showToast').mockImplementation(() => {});

    saveTokenLocallySpy = jest
      .spyOn(UserToken, 'save')
      .mockImplementation(() => new Promise(resolve => resolve()));
  });

  afterEach(() => {
    onSuccessMock.mockReset();
    useRouteSpy.mockRestore();
    getVerificationCodeMock.mockRestore();
    setLoaderMock.mockRestore();
    setIsWrongCodeMock.mockRestore();
    handleErrorSpy.mockRestore();
    verifyCodeApiSpy.mockRestore();
    sendVerificationCodeSpy.mockRestore();
    showToastSpy.mockRestore();
    saveTokenLocallySpy.mockRestore();
  });

  it('should render correctly with the right UI', async () => {
    const instance = render(
      <Buttons
        setLoader={setLoaderMock}
        getVerificationCode={getVerificationCodeMock}
        setIsWrongCode={setIsWrongCodeMock}
      />,
    );

    await instance.findByTestId('sendCodeButton');
    await instance.findByText('Didn’t get the code?');
    await instance.findByText(' Resend code');
  });

  describe('verifyCode onPress method', () => {
    it('should call getVerificationCode and verifyCode api end point when everything is ok', async () => {
      const instance = render(
        <Buttons
          setLoader={setLoaderMock}
          getVerificationCode={getVerificationCodeMock}
          setIsWrongCode={setIsWrongCodeMock}
        />,
      );

      const sendCodeButton = instance.getByTestId('sendCodeButton');

      await fireEvent(sendCodeButton, 'onPress');

      expect(setLoaderMock).toBeCalledTimes(1);
      expect(setLoaderMock.mock.calls).toEqual([[true]]);

      expect(setIsWrongCodeMock).toBeCalledTimes(1);
      expect(setIsWrongCodeMock.mock.calls).toEqual([[false]]);

      expect(getVerificationCodeMock).toBeCalledTimes(1);
      expect(getVerificationCodeMock).toReturnWith(mockVerficationCode);

      expect(verifyCodeApiSpy).toBeCalledTimes(1);
      expect(verifyCodeApiSpy).toBeCalledWith({
        email: mockEmail,
        code: mockVerficationCode,
      });
      expect(verifyCodeApiSpy).toReturnWith(
        expect.objectContaining({_W: mockUserToken}),
      );

      expect(saveTokenLocallySpy).toBeCalledTimes(1);
      expect(saveTokenLocallySpy).toBeCalledWith(mockUserToken);

      expect(showToastSpy).toBeCalledTimes(1);
      expect(showToastSpy).toBeCalledWith('Your email verified successfully');

      expect(onSuccessMock).toBeCalledTimes(1);

      expect(handleErrorSpy).toBeCalledTimes(0);
    });

    it('should call the setIsWrongCode with true when the code is not correct', async () => {
      verifyCodeApiSpy.mockImplementation(
        () =>
          new Promise((_, rejected) =>
            rejected(
              new InvalidInputValuesError({
                success: false,
                errors: 'wrong verification code, please try again',
              }),
            ),
          ),
      );

      const instance = render(
        <Buttons
          setLoader={setLoaderMock}
          getVerificationCode={getVerificationCodeMock}
          setIsWrongCode={setIsWrongCodeMock}
        />,
      );

      const sendCodeButton = instance.getByTestId('sendCodeButton');

      await fireEvent(sendCodeButton, 'onPress');

      expect(setLoaderMock).toBeCalledTimes(2);
      expect(setLoaderMock.mock.calls).toEqual([[true], [false]]);

      expect(getVerificationCodeMock).toBeCalledTimes(1);
      expect(getVerificationCodeMock).toReturnWith(mockVerficationCode);

      expect(verifyCodeApiSpy).toBeCalledTimes(1);
      expect(verifyCodeApiSpy).toBeCalledWith({
        email: mockEmail,
        code: mockVerficationCode,
      });

      expect(setIsWrongCodeMock).toBeCalledTimes(2);
      expect(setIsWrongCodeMock.mock.calls).toEqual([[false], [true]]);

      expect(saveTokenLocallySpy).toBeCalledTimes(0);
      expect(onSuccessMock).toBeCalledTimes(0);
      expect(handleErrorSpy).toBeCalledTimes(0);
    });

    it('should call handleError when we have an unkown error', async () => {
      verifyCodeApiSpy.mockImplementation(
        () => new Promise((_, rejected) => rejected('something went wrong')),
      );

      const instance = render(
        <Buttons
          setLoader={setLoaderMock}
          getVerificationCode={getVerificationCodeMock}
          setIsWrongCode={setIsWrongCodeMock}
        />,
      );

      const sendCodeButton = instance.getByTestId('sendCodeButton');

      await fireEvent(sendCodeButton, 'onPress');

      expect(setLoaderMock).toBeCalledTimes(2);
      expect(setLoaderMock.mock.calls).toEqual([[true], [false]]);

      expect(getVerificationCodeMock).toBeCalledTimes(1);
      expect(getVerificationCodeMock).toReturnWith(mockVerficationCode);

      expect(verifyCodeApiSpy).toBeCalledTimes(1);
      expect(verifyCodeApiSpy).toBeCalledWith({
        email: mockEmail,
        code: mockVerficationCode,
      });

      expect(setIsWrongCodeMock).toBeCalledTimes(1);
      expect(setIsWrongCodeMock.mock.calls).toEqual([[false]]);

      expect(saveTokenLocallySpy).toBeCalledTimes(0);
      expect(onSuccessMock).toBeCalledTimes(0);

      expect(handleErrorSpy).toBeCalledTimes(1);
      expect(handleErrorSpy).toBeCalledWith('something went wrong');
    });
  });

  describe('resendCode onPress method', () => {
    it('should call the sentVerificationCode api endpoint and show a success Toast when everything is ok', async () => {
      const instance = render(
        <Buttons
          setLoader={setLoaderMock}
          getVerificationCode={getVerificationCodeMock}
          setIsWrongCode={setIsWrongCodeMock}
        />,
      );

      const resendCodeButton = instance.getByText(' Resend code');

      await fireEvent(resendCodeButton, 'onPress');

      expect(setLoaderMock).toBeCalledTimes(2);
      expect(setLoaderMock.mock.calls).toEqual([[true], [false]]);

      expect(sendVerificationCodeSpy).toBeCalledTimes(1);
      expect(sendVerificationCodeSpy).toBeCalledWith(mockEmail);

      expect(showToastSpy).toBeCalledTimes(1);
      expect(showToastSpy).toBeCalledWith(
        'Verification code resent successfully',
      );

      expect(handleErrorSpy).toBeCalledTimes(0);
    });

    it('should call the handleError function when an unkown error occure', async () => {
      sendVerificationCodeSpy.mockImplementation(
        () => new Promise((_, rejected) => rejected('something went wrong')),
      );

      const instance = render(
        <Buttons
          setLoader={setLoaderMock}
          getVerificationCode={getVerificationCodeMock}
          setIsWrongCode={setIsWrongCodeMock}
        />,
      );

      const resendCodeButton = instance.getByText(' Resend code');

      await fireEvent(resendCodeButton, 'onPress');

      expect(setLoaderMock).toBeCalledTimes(2);
      expect(setLoaderMock.mock.calls).toEqual([[true], [false]]);

      expect(sendVerificationCodeSpy).toBeCalledTimes(1);
      expect(sendVerificationCodeSpy).toBeCalledWith(mockEmail);

      expect(showToastSpy).toBeCalledTimes(0);

      expect(handleErrorSpy).toBeCalledTimes(1);
      expect(handleErrorSpy).toBeCalledWith('something went wrong');
    });
  });
});
