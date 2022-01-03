import 'react-native';
import React from 'react';
import {TextInput} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';

import {ResetPasswordForm} from './ResetPasswordForm';
import {APICalls} from '../../../../../../apis';
import * as ErrorHandler from '../../../../../../utils/helpers/handleError/handleError';
import {InvalidInputValuesError} from '../../../../../../apis/__utils__/Errors';
import * as Toast from '../../../../../../utils/helpers/showToast/showToast';
import {act} from '@testing-library/react-hooks';

describe('ResetPassword screen, ResetPasswordForm Component', () => {
  let setLoaderMock: jest.Mock<any, any>;
  let replaceMock: jest.Mock<any, any>;
  let globalNavigation: any;

  let resetPasswordApiCallSpy: jest.SpyInstance;
  let showToastSpy: jest.SpyInstance;
  let handleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    setLoaderMock = jest.fn();
    replaceMock = jest.fn();
    globalNavigation = {
      replace: replaceMock,
    };

    resetPasswordApiCallSpy = jest
      .spyOn(APICalls, 'resetPassword')
      .mockImplementation(() => Promise.resolve());

    showToastSpy = jest.spyOn(Toast, 'showToast').mockImplementation(() => {});

    handleErrorSpy = jest
      .spyOn(ErrorHandler, 'handleError')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    setLoaderMock.mockReset();
    replaceMock.mockReset();
    resetPasswordApiCallSpy.mockRestore();
    showToastSpy.mockRestore();
    handleErrorSpy.mockRestore();
  });

  it('should render correctly with the right UI', () => {
    const instance = render(
      <ResetPasswordForm
        globalNavigation={globalNavigation}
        setLoader={setLoaderMock}
      />,
    );

    const inputs = instance.UNSAFE_getAllByType(TextInput);
    const submitButton = instance.getByTestId('submitButton');

    inputs.map(input => expect(input).toHaveProp('secureTextEntry', true));
    expect(submitButton).toBeDefined();
  });

  describe('onSubmit method', () => {
    const mockPassword = 'mySupperSecretPassword';

    it('should call the resetPassword api endpoint and go to home screen when everything is OK', async () => {
      const instance = render(
        <ResetPasswordForm
          globalNavigation={globalNavigation}
          setLoader={setLoaderMock}
        />,
      );

      const inputs = instance.UNSAFE_getAllByType(TextInput);
      const submitButton = instance.getByTestId('submitButton');

      fireEvent(inputs[0], 'onChangeText', mockPassword);
      fireEvent(inputs[1], 'onChangeText', mockPassword);

      await act(async () => {
        await fireEvent(submitButton, 'onPress');
      });

      expect(setLoaderMock).toBeCalledTimes(1);
      expect(setLoaderMock).toBeCalledWith(true);

      expect(resetPasswordApiCallSpy).toBeCalledTimes(1);
      expect(resetPasswordApiCallSpy).toBeCalledWith({
        password: mockPassword,
        confirmPassword: mockPassword,
      });

      expect(showToastSpy).toBeCalledTimes(1);
      expect(showToastSpy).toBeCalledWith(
        'Your password has changed successfully',
      );

      expect(replaceMock).toBeCalledTimes(1);
      expect(replaceMock).toBeCalledWith('HomeStack', {screen: 'Home'});
    });

    it('should show some input errors if the inputs are not valid', async () => {
      resetPasswordApiCallSpy.mockImplementation(() =>
        Promise.reject(
          new InvalidInputValuesError({
            success: false,
            errors: {
              password: 'invalid password',
              confirmPassword: 'password must match',
            },
          }),
        ),
      );

      const instance = render(
        <ResetPasswordForm
          globalNavigation={globalNavigation}
          setLoader={setLoaderMock}
        />,
      );

      const inputs = instance.UNSAFE_getAllByType(TextInput);
      const submitButton = instance.getByTestId('submitButton');

      fireEvent(inputs[0], 'onChangeText', 'sldk');
      fireEvent(inputs[1], 'onChangeText', 'ksqlhdsflkjh');

      await act(async () => {
        await fireEvent(submitButton, 'onPress');
      });

      expect(setLoaderMock).toBeCalledTimes(2);
      expect(setLoaderMock.mock.calls).toEqual([[true], [false]]);

      expect(resetPasswordApiCallSpy).toBeCalledTimes(1);
      expect(resetPasswordApiCallSpy).toBeCalledWith({
        password: 'sldk',
        confirmPassword: 'ksqlhdsflkjh',
      });

      expect(showToastSpy).toBeCalledTimes(0);
      expect(replaceMock).toBeCalledTimes(0);
      expect(handleErrorSpy).toBeCalledTimes(0);

      await instance.findByText('invalid password');
      await instance.findByText('password must match');
    });

    it('should call the handleError function when we have an unkown error', async () => {
      resetPasswordApiCallSpy.mockImplementation(() =>
        Promise.reject('some unkown error'),
      );

      const instance = render(
        <ResetPasswordForm
          globalNavigation={globalNavigation}
          setLoader={setLoaderMock}
        />,
      );

      const inputs = instance.UNSAFE_getAllByType(TextInput);
      const submitButton = instance.getByTestId('submitButton');

      fireEvent(inputs[0], 'onChangeText', mockPassword);
      fireEvent(inputs[1], 'onChangeText', mockPassword);

      await act(async () => {
        await fireEvent(submitButton, 'onPress');
      });

      expect(setLoaderMock).toBeCalledTimes(2);
      expect(setLoaderMock.mock.calls).toEqual([[true], [false]]);

      expect(resetPasswordApiCallSpy).toBeCalledTimes(1);
      expect(resetPasswordApiCallSpy).toBeCalledWith({
        password: mockPassword,
        confirmPassword: mockPassword,
      });

      expect(showToastSpy).toBeCalledTimes(0);
      expect(replaceMock).toBeCalledTimes(0);
      expect(handleErrorSpy).toBeCalledTimes(1);
    });
  });
});
