import 'react-native';
import React from 'react';
import Native from '@react-navigation/native';
import {act, fireEvent, render} from '@testing-library/react-native';
import {TextInput} from 'react-native';

import {UserToken} from '../../../../__utils__/UserToken';
import SignupForm from './SignupForm';
import {APICalls} from '../../../../../../apis';
import {InvalidInputValuesError} from '../../../../../../apis/__utils__/Errors';
import * as ErrorHandler from '../../../../../../utils/helpers/handleError/handleError';

describe('Signup screen, SignupForm component', () => {
  const mockUserToken = 'lksdjfoiaezjflksqd';

  let isLoadingMock: jest.Mock<any, any>;
  let replaceMock: jest.Mock<any, any>;
  let useNavigationSpy: jest.SpyInstance;
  let signupApiCallSpy: jest.SpyInstance;
  let saveTokenLocallySpy: jest.SpyInstance;
  let handleErrorSpy: jest.SpyInstance;
  let globalReplaceMock: jest.Mock<any, any>;
  let globalNavigationMock: any;

  beforeEach(() => {
    isLoadingMock = jest.fn();
    replaceMock = jest.fn();
    useNavigationSpy = jest
      .spyOn(Native, 'useNavigation')
      .mockImplementation(() => ({
        replace: replaceMock,
      }));

    signupApiCallSpy = jest
      .spyOn(APICalls, 'signup')
      .mockImplementation(() => new Promise(resolve => resolve(mockUserToken)));

    saveTokenLocallySpy = jest
      .spyOn(UserToken, 'save')
      .mockImplementation(() => new Promise(resolve => resolve()));

    handleErrorSpy = jest
      .spyOn(ErrorHandler, 'handleError')
      .mockImplementation(() => {});

    globalReplaceMock = jest.fn();
    globalNavigationMock = {
      replace: globalReplaceMock,
    };
  });

  afterEach(() => {
    isLoadingMock.mockRestore();
    replaceMock.mockRestore();
    useNavigationSpy.mockRestore();
    signupApiCallSpy.mockRestore();
    saveTokenLocallySpy.mockRestore();
    handleErrorSpy.mockRestore();
    globalReplaceMock.mockReset();
  });

  it('should render correctly with the right UI', async () => {
    const instance = render(
      <SignupForm
        setIsLoading={isLoadingMock}
        globalNavigation={globalNavigationMock}
      />,
    );

    const [nameInput, emailInput, passwordInput] =
      instance.UNSAFE_getAllByType(TextInput);
    const singupButton = instance.getByTestId('signupButton');

    await instance.findByText('name');
    await instance.findByText('email');
    await instance.findByText('password');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(passwordInput).toHaveProp('secureTextEntry', true);
    expect(singupButton).toBeDefined();
  });

  describe('onPress method', () => {
    it('should sign the user up and send him to emailConfirmation Screen when everything is OK', async () => {
      const instance = render(
        <SignupForm
          setIsLoading={isLoadingMock}
          globalNavigation={globalNavigationMock}
        />,
      );

      const [nameInput, emailInput, passwordInput] =
        instance.UNSAFE_getAllByType(TextInput);
      const singupButton = instance.getByTestId('signupButton');

      expect(useNavigationSpy).toBeCalledTimes(1);

      fireEvent(nameInput, 'onChangeText', 'yasser');
      fireEvent(emailInput, 'onChangeText', 'yasser@gmail.com');
      fireEvent(passwordInput, 'onChangeText', 'yasser2002');

      await act(async () => {
        await fireEvent(singupButton, 'onPress');
      });

      expect(isLoadingMock).toBeCalledTimes(1);
      expect(isLoadingMock.mock.calls).toEqual([[true]]);

      expect(signupApiCallSpy).toBeCalledTimes(1);
      expect(signupApiCallSpy).toBeCalledWith({
        name: 'yasser',
        email: 'yasser@gmail.com',
        password: 'yasser2002',
      });
      expect(signupApiCallSpy).toReturnWith(
        expect.objectContaining({_W: mockUserToken}),
      );

      expect(saveTokenLocallySpy).toBeCalledTimes(1);
      expect(saveTokenLocallySpy).toBeCalledWith(mockUserToken);

      expect(replaceMock).toBeCalledTimes(1);
      expect(replaceMock).toBeCalledWith(
        'EmailVerification',
        expect.objectContaining({
          email: 'yasser@gmail.com',
        }),
      );

      expect(handleErrorSpy).toBeCalledTimes(0);
    });

    it('should show the input errors when the inputs are not valid', async () => {
      signupApiCallSpy.mockImplementation(
        () =>
          new Promise((_, rejected) =>
            rejected(
              new InvalidInputValuesError({
                success: false,
                errors: {
                  name: 'should not be empty',
                  email: 'should be a valid email',
                  password: 'should have more than 8 characters',
                },
              }),
            ),
          ),
      );

      const instance = render(
        <SignupForm
          setIsLoading={isLoadingMock}
          globalNavigation={globalNavigationMock}
        />,
      );

      const [nameInput, emailInput, passwordInput] =
        instance.UNSAFE_getAllByType(TextInput);
      const singupButton = instance.getByTestId('signupButton');

      expect(useNavigationSpy).toBeCalledTimes(1);

      fireEvent(nameInput, 'onChangeText', '');
      fireEvent(emailInput, 'onChangeText', 'yassmail.com');
      fireEvent(passwordInput, 'onChangeText', 'ya');

      await act(async () => {
        await fireEvent(singupButton, 'onPress');
      });

      expect(isLoadingMock).toBeCalledTimes(2);
      expect(isLoadingMock.mock.calls).toEqual([[true], [false]]);

      expect(signupApiCallSpy).toBeCalledTimes(1);
      expect(signupApiCallSpy).toBeCalledWith({
        name: '',
        email: 'yassmail.com',
        password: 'ya',
      });

      expect(saveTokenLocallySpy).toBeCalledTimes(0);
      expect(replaceMock).toBeCalledTimes(0);
      expect(handleErrorSpy).toBeCalledTimes(0);

      await instance.findByText('should not be empty');
      await instance.findByText('should be a valid email');
      await instance.findByText('should have more than 8 characters');
    });

    it('should call the handleError method when the inputs are valid but somthing wrong happend', async () => {
      signupApiCallSpy.mockImplementation(
        () => new Promise((_, rejected) => rejected('error')),
      );

      const instance = render(
        <SignupForm
          setIsLoading={isLoadingMock}
          globalNavigation={globalNavigationMock}
        />,
      );

      const [nameInput, emailInput, passwordInput] =
        instance.UNSAFE_getAllByType(TextInput);
      const singupButton = instance.getByTestId('signupButton');

      expect(useNavigationSpy).toBeCalledTimes(1);

      fireEvent(nameInput, 'onChangeText', 'Yasser Belatreche');
      fireEvent(emailInput, 'onChangeText', 'yasser@gmail.com');
      fireEvent(passwordInput, 'onChangeText', '12345678');

      await act(async () => {
        await fireEvent(singupButton, 'onPress');
      });

      expect(isLoadingMock).toBeCalledTimes(2);
      expect(isLoadingMock.mock.calls).toEqual([[true], [false]]);

      expect(signupApiCallSpy).toBeCalledTimes(1);
      expect(signupApiCallSpy).toBeCalledWith({
        name: 'Yasser Belatreche',
        email: 'yasser@gmail.com',
        password: '12345678',
      });

      expect(saveTokenLocallySpy).toBeCalledTimes(0);
      expect(replaceMock).toBeCalledTimes(0);

      expect(handleErrorSpy).toBeCalledTimes(1);
      expect(handleErrorSpy).toBeCalledWith('error');
    });
  });
});
