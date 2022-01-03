import 'react-native';
import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import {TextInput} from 'react-native';

import LoginForm from './LoginForm';
import {UserToken} from '../../../../__utils__/UserToken';
import {APICalls} from '../../../../../../apis';
import {InvalidInputValuesError} from '../../../../../../apis/__utils__/Errors';
import * as handleError from '../../../../../../utils/helpers/handleError/handleError';

describe('Login screen, LoginForm component', () => {
  const mockUserToken = 'lksdjfpoiuahfksqjlkcnqk.ilksqjdfi';

  let setIsLoadingSpy: jest.Mock<any, any>;
  let replaceSpy: jest.Mock<any, any>;
  let loginApiCall: jest.SpyInstance;
  let globalNavigation: any;
  let saveTokenSpy: jest.SpyInstance;
  let handleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    setIsLoadingSpy = jest.fn();
    replaceSpy = jest.fn();
    globalNavigation = {
      replace: replaceSpy,
    };
    loginApiCall = jest
      .spyOn(APICalls, 'login')
      .mockImplementation(() => new Promise(resolve => resolve(mockUserToken)));
    saveTokenSpy = jest
      .spyOn(UserToken, 'save')
      .mockImplementation(() => new Promise(resolve => resolve()));
    handleErrorSpy = jest
      .spyOn(handleError, 'handleError')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    setIsLoadingSpy.mockRestore();
    replaceSpy.mockRestore();
    loginApiCall.mockRestore();
    saveTokenSpy.mockRestore();
    handleErrorSpy.mockRestore();
  });

  it('should render correctelly with the right UI elements', async () => {
    const instance = render(
      <LoginForm
        setIsLoading={setIsLoadingSpy}
        globalNavigation={globalNavigation}
      />,
    );

    const [emailInput, passwordInput] =
      instance.UNSAFE_queryAllByType(TextInput);
    const loginButton = await instance.findByTestId('loginButton');

    await instance.findByText('email');
    await instance.findByText('password');
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(passwordInput).toHaveProp('secureTextEntry', true);
    expect(loginButton).toBeDefined();
  });

  describe('onPress method', () => {
    it('should log the user in and push to home, if the input values are valid and every thing is ok', async () => {
      const instance = render(
        <LoginForm
          setIsLoading={setIsLoadingSpy}
          globalNavigation={globalNavigation}
        />,
      );

      const [emailInput, passwordInput] =
        instance.UNSAFE_queryAllByType(TextInput);
      const loginButton = await instance.findByTestId('loginButton');

      fireEvent(emailInput, 'onChangeText', 'email@example.com');
      fireEvent(passwordInput, 'onChangeText', 'myPassword');

      await act(async () => {
        await fireEvent(loginButton, 'onPress');
      });

      expect(setIsLoadingSpy).toBeCalledTimes(1);
      expect(setIsLoadingSpy.mock.calls).toEqual([[true]]);

      expect(loginApiCall).toBeCalledTimes(1);
      expect(loginApiCall).toBeCalledWith({
        email: 'email@example.com',
        password: 'myPassword',
      });
      expect(loginApiCall).toReturnWith(
        expect.objectContaining({_W: mockUserToken}),
      );

      expect(saveTokenSpy).toBeCalledTimes(1);
      expect(saveTokenSpy).toBeCalledWith(mockUserToken);

      expect(replaceSpy).toBeCalledTimes(1);
      expect(replaceSpy).toBeCalledWith('HomeStack', {screen: 'Home'});

      expect(handleErrorSpy).toBeCalledTimes(0);
    });

    it('should set the credentials error when the inputs does not match', async () => {
      loginApiCall.mockImplementation(
        () =>
          new Promise((_, rejected) =>
            rejected(
              new InvalidInputValuesError({
                success: false,
                errors: {credentials: 'unvalid credenatials,please try again'},
              }),
            ),
          ),
      );

      const instance = render(
        <LoginForm
          setIsLoading={setIsLoadingSpy}
          globalNavigation={globalNavigation}
        />,
      );

      const [emailInput, passwordInput] =
        instance.UNSAFE_queryAllByType(TextInput);
      const loginButton = await instance.findByTestId('loginButton');

      fireEvent(emailInput, 'onChangeText', 'email@example.com');
      fireEvent(passwordInput, 'onChangeText', 'myPassord');

      await act(async () => {
        await fireEvent(loginButton, 'onPress');
      });

      expect(setIsLoadingSpy).toBeCalledTimes(2);
      expect(setIsLoadingSpy.mock.calls).toEqual([[true], [false]]);

      expect(loginApiCall).toBeCalledTimes(1);
      expect(loginApiCall).toBeCalledWith({
        email: 'email@example.com',
        password: 'myPassord',
      });

      expect(saveTokenSpy).toBeCalledTimes(0);
      expect(replaceSpy).toBeCalledTimes(0);
      expect(handleErrorSpy).toBeCalledTimes(0);

      await instance.findByText('unvalid credenatials,please try again');
    });

    it('should set the inputs errorwhen the input values are uncorrect', async () => {
      loginApiCall.mockImplementation(
        () =>
          new Promise((_, rejected) =>
            rejected(
              new InvalidInputValuesError({
                success: false,
                errors: {
                  email: 'unvalid email',
                  password: 'must have at least 8 characters',
                },
              }),
            ),
          ),
      );

      const instance = render(
        <LoginForm
          setIsLoading={setIsLoadingSpy}
          globalNavigation={globalNavigation}
        />,
      );

      const [emailInput, passwordInput] =
        instance.UNSAFE_queryAllByType(TextInput);
      const loginButton = await instance.findByTestId('loginButton');

      fireEvent(emailInput, 'onChangeText', 'email.com');
      fireEvent(passwordInput, 'onChangeText', 'myPrd');

      await act(async () => {
        await fireEvent(loginButton, 'onPress');
      });

      expect(setIsLoadingSpy).toBeCalledTimes(2);
      expect(setIsLoadingSpy.mock.calls).toEqual([[true], [false]]);

      expect(loginApiCall).toBeCalledTimes(1);
      expect(loginApiCall).toBeCalledWith({
        email: 'email.com',
        password: 'myPrd',
      });

      expect(saveTokenSpy).toBeCalledTimes(0);
      expect(replaceSpy).toBeCalledTimes(0);
      expect(handleErrorSpy).toBeCalledTimes(0);

      await instance.findByText('unvalid email');
      await instance.findByText('must have at least 8 characters');
    });

    it('should call the handleError method when the error is not an InputsError', async () => {
      loginApiCall.mockImplementation(
        () => new Promise((_, rejected) => rejected('something went wrong')),
      );

      const instance = render(
        <LoginForm
          setIsLoading={setIsLoadingSpy}
          globalNavigation={globalNavigation}
        />,
      );

      const [emailInput, passwordInput] =
        instance.UNSAFE_queryAllByType(TextInput);
      const loginButton = await instance.findByTestId('loginButton');

      fireEvent(emailInput, 'onChangeText', 'email@example.com');
      fireEvent(passwordInput, 'onChangeText', 'mysdfqsdfPrd');

      await act(async () => {
        await fireEvent(loginButton, 'onPress');
      });

      expect(setIsLoadingSpy).toBeCalledTimes(2);
      expect(setIsLoadingSpy.mock.calls).toEqual([[true], [false]]);

      expect(loginApiCall).toBeCalledTimes(1);
      expect(loginApiCall).toBeCalledWith({
        email: 'email@example.com',
        password: 'mysdfqsdfPrd',
      });

      expect(saveTokenSpy).toBeCalledTimes(0);
      expect(replaceSpy).toBeCalledTimes(0);

      expect(handleErrorSpy).toBeCalledTimes(1);
      expect(handleErrorSpy).toBeCalledWith('something went wrong');
    });
  });
});
