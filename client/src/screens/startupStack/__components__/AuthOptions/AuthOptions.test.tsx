import 'react-native';
import React from 'react';
import {Image, Text} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';

import {AuthOptions} from './AuthOptions';
import {ICONS} from '../../../../utils/constants';
import {APICalls} from '../../../../apis';
import {UserToken} from '../../__utils__/UserToken';
import * as handleError from '../../../../utils/helpers/handleError/handleError';
import {NetworkError} from '../../../../apis/__utils__/Errors';

describe('AuthOptions component', () => {
  const mockUserToken = '(lksdjfqpoiazjfk:jsqpoifjknxckjvq.lijslfdkj';

  let setIsLoadingMock: jest.Mock<any, any>;
  let saveTokenLocallySpy: jest.SpyInstance;
  let handleErrorSpy: jest.SpyInstance;
  let replaceMock: jest.Mock<any, any>;
  let globalNavigation: any;

  beforeEach(() => {
    setIsLoadingMock = jest.fn();
    handleErrorSpy = jest
      .spyOn(handleError, 'handleError')
      .mockImplementation(() => {});
    saveTokenLocallySpy = jest
      .spyOn(UserToken, 'save')
      .mockImplementation(() => new Promise(resolve => resolve()));

    replaceMock = jest.fn();
    globalNavigation = {
      replace: replaceMock,
    };
  });

  afterEach(() => {
    setIsLoadingMock.mockReset();
    handleErrorSpy.mockRestore();
    saveTokenLocallySpy.mockRestore();
    replaceMock.mockRestore();
  });

  it('should render a facebookAuth and googleAuth button with the icons', () => {
    const instance: RenderAPI = render(
      <AuthOptions
        variant="Login"
        setIsLoading={setIsLoadingMock}
        globalNavigation={globalNavigation}
      />,
    );

    const googleAuthButton: ReactTestInstance =
      instance.getByTestId('googleAuthButton');
    const facebookAuthButton: ReactTestInstance =
      instance.getByTestId('facebookAuthButton');

    const googleLogo: ReactTestInstance = googleAuthButton.findByType(Image);
    const facebookLogo: ReactTestInstance =
      facebookAuthButton.findByType(Image);

    expect(googleLogo.props).toHaveProperty('source', ICONS.googleLogo);
    expect(facebookLogo.props).toHaveProperty('source', ICONS.facebookLogo);
  });

  describe('GoogleAuthButton', () => {
    let mockGoogleTokenId: any = {idToken: 'sdlfkq:nxclkjhsd;:f,lksjdoifreo'};

    let hasGoogleServicesSpy: jest.SpyInstance;
    let googleSignInSpy: jest.SpyInstance;
    let googleAuthLocalApiSpy: jest.SpyInstance;

    beforeEach(() => {
      hasGoogleServicesSpy = jest
        .spyOn(GoogleSignin, 'hasPlayServices')
        .mockImplementation(() => new Promise(resolve => resolve(true)));

      googleSignInSpy = jest
        .spyOn(GoogleSignin, 'signIn')
        .mockImplementation(
          () => new Promise(resolve => resolve(mockGoogleTokenId)),
        );

      googleAuthLocalApiSpy = jest
        .spyOn(APICalls, 'googleAuth')
        .mockImplementation(
          () => new Promise(resolve => resolve(mockUserToken)),
        );
    });

    afterEach(() => {
      hasGoogleServicesSpy.mockRestore();
      googleSignInSpy.mockRestore();
      googleAuthLocalApiSpy.mockRestore();
    });

    it('should render the button text depending of the variant prop of the parent Component', () => {
      const loginAuthOptions: RenderAPI = render(
        <AuthOptions
          variant="Login"
          setIsLoading={setIsLoadingMock}
          globalNavigation={globalNavigation}
        />,
      );

      const signupAuthOptions: RenderAPI = render(
        <AuthOptions
          variant="Signup"
          setIsLoading={setIsLoadingMock}
          globalNavigation={globalNavigation}
        />,
      );

      const googleLoginButton =
        loginAuthOptions.getByTestId('googleAuthButton');
      const googleLoginText = googleLoginButton.findByType(Text);

      const googleSignupButton =
        signupAuthOptions.getByTestId('googleAuthButton');
      const googleSignupText = googleSignupButton.findByType(Text);

      expect(googleLoginText.props.children[0]).toMatch(/Login/g);
      expect(googleSignupText.props.children[0]).toMatch(/Signup/g);
    });

    it('should call the right methods to log the user with google when pressing the button', async () => {
      const loginAuthOptions: RenderAPI = render(
        <AuthOptions
          variant="Login"
          setIsLoading={setIsLoadingMock}
          globalNavigation={globalNavigation}
        />,
      );

      const googleAuthButton = loginAuthOptions.getByTestId('googleAuthButton');

      await fireEvent(googleAuthButton, 'onPress');

      expect(hasGoogleServicesSpy).toBeCalledTimes(1);
      expect(googleSignInSpy).toBeCalledTimes(1);
      expect(googleSignInSpy).toReturnWith(
        expect.objectContaining({_W: mockGoogleTokenId}), // we use _W to get the real return (try to use toReturnWith(mockGoogleTokenId) and you will get an error and look at the received object)
      );

      expect(setIsLoadingMock).toBeCalledTimes(1);
      expect(setIsLoadingMock.mock.calls).toEqual([[true]]);

      expect(googleAuthLocalApiSpy).toBeCalledTimes(1);
      expect(googleAuthLocalApiSpy).toBeCalledWith(mockGoogleTokenId.idToken);
      expect(googleAuthLocalApiSpy).toReturnWith(
        expect.objectContaining({_W: mockUserToken}),
      );

      expect(saveTokenLocallySpy).toBeCalledTimes(1);
      expect(saveTokenLocallySpy).toBeCalledWith(mockUserToken);

      expect(replaceMock).toBeCalledTimes(1);
      expect(replaceMock).toBeCalledWith('HomeStack', {screen: 'Home'});
    });

    it('onPress method should return when there is not idToken returned from GoogleSignin.signIn()', async () => {
      googleSignInSpy.mockImplementation(
        () => new Promise(resolve => resolve({})),
      );

      const loginAuthOptions: RenderAPI = render(
        <AuthOptions
          variant="Login"
          setIsLoading={setIsLoadingMock}
          globalNavigation={globalNavigation}
        />,
      );

      const googleAuthButton = loginAuthOptions.getByTestId('googleAuthButton');

      await fireEvent(googleAuthButton, 'onPress');

      expect(hasGoogleServicesSpy).toBeCalledTimes(1);
      expect(googleSignInSpy).toBeCalledTimes(1);
      expect(setIsLoadingMock).toBeCalledTimes(0);

      expect(googleAuthLocalApiSpy).toBeCalledTimes(0);
      expect(saveTokenLocallySpy).toBeCalledTimes(0);
      expect(replaceMock).toBeCalledTimes(0);
    });

    it('onPress method should return when the error has a signin_canceled code', async () => {
      googleSignInSpy.mockImplementation(
        () =>
          new Promise((resolve, rejected) =>
            rejected({code: statusCodes.SIGN_IN_CANCELLED}),
          ),
      );

      const loginAuthOptions: RenderAPI = render(
        <AuthOptions
          variant="Login"
          setIsLoading={setIsLoadingMock}
          globalNavigation={globalNavigation}
        />,
      );

      const googleAuthButton = loginAuthOptions.getByTestId('googleAuthButton');

      await fireEvent(googleAuthButton, 'onPress');

      expect(hasGoogleServicesSpy).toBeCalledTimes(1);
      expect(googleSignInSpy).toBeCalledTimes(1);
      expect(setIsLoadingMock).toBeCalledTimes(1);
      expect(setIsLoadingMock).toBeCalledWith(false);

      expect(googleAuthLocalApiSpy).toBeCalledTimes(0);
      expect(saveTokenLocallySpy).toBeCalledTimes(0);
      expect(handleErrorSpy).toBeCalledTimes(0);
      expect(replaceMock).toBeCalledTimes(0);
    });

    it('onPress method should call the handleError when the error is not a signin_canceled error', async () => {
      googleAuthLocalApiSpy.mockImplementation(
        () =>
          new Promise((resolve, rejected) => rejected(new NetworkError(''))),
      );

      const loginAuthOptions: RenderAPI = render(
        <AuthOptions
          variant="Login"
          setIsLoading={setIsLoadingMock}
          globalNavigation={globalNavigation}
        />,
      );

      const googleAuthButton = loginAuthOptions.getByTestId('googleAuthButton');

      await fireEvent(googleAuthButton, 'onPress');

      expect(hasGoogleServicesSpy).toBeCalledTimes(1);
      expect(googleSignInSpy).toBeCalledTimes(1);

      expect(setIsLoadingMock).toBeCalledTimes(2);
      expect(setIsLoadingMock.mock.calls).toEqual([[true], [false]]);

      expect(googleAuthLocalApiSpy).toBeCalledTimes(1);
      expect(saveTokenLocallySpy).toBeCalledTimes(0);
      expect(replaceMock).toBeCalledTimes(0);

      expect(handleErrorSpy).toBeCalledTimes(1);
    });
  });

  describe('FacebookAuthButton', () => {
    const mockAccessToken = 'lksdjfmlkqsuzlak,fd:xw,:vpqodfj€«→ø¶';

    let loginWithPermissinosSpy: jest.SpyInstance;
    let getCurrentAccessTokenSpy: jest.SpyInstance;
    let facebookAuthApiSpy: jest.SpyInstance;

    beforeEach(() => {
      loginWithPermissinosSpy = jest
        .spyOn(LoginManager, 'logInWithPermissions')
        .mockImplementation(() => new Promise(resolve => resolve({} as any)));
      getCurrentAccessTokenSpy = jest
        .spyOn(AccessToken, 'getCurrentAccessToken')
        .mockImplementation(
          () =>
            new Promise(resolve =>
              resolve({accessToken: mockAccessToken} as any),
            ),
        );
      facebookAuthApiSpy = jest
        .spyOn(APICalls, 'facebookAuth')
        .mockImplementation(
          () => new Promise(resolve => resolve(mockUserToken)),
        );
    });

    afterEach(() => {
      loginWithPermissinosSpy.mockRestore();
      getCurrentAccessTokenSpy.mockRestore();
      facebookAuthApiSpy.mockRestore();
    });

    it('should render the button text depending of the variant prop of the parent Component', () => {
      const loginAuthOptions: RenderAPI = render(
        <AuthOptions
          variant="Login"
          setIsLoading={setIsLoadingMock}
          globalNavigation={globalNavigation}
        />,
      );

      const signupAuthOptions: RenderAPI = render(
        <AuthOptions
          variant="Signup"
          setIsLoading={setIsLoadingMock}
          globalNavigation={globalNavigation}
        />,
      );

      const facebookLoginButton =
        loginAuthOptions.getByTestId('facebookAuthButton');
      const facebookLoginText = facebookLoginButton.findByType(Text);

      const facebookSignupButton =
        signupAuthOptions.getByTestId('facebookAuthButton');
      const facebookSignupText = facebookSignupButton.findByType(Text);

      expect(facebookLoginText.props.children[0]).toMatch(/Login/g);
      expect(facebookSignupText.props.children[0]).toMatch(/Signup/g);
    });

    it('should call the right methods to log the user with facebook when pressing the button', async () => {
      const loginAuthOptions: RenderAPI = render(
        <AuthOptions
          variant="Login"
          setIsLoading={setIsLoadingMock}
          globalNavigation={globalNavigation}
        />,
      );

      const facebookAuthButton =
        loginAuthOptions.getByTestId('facebookAuthButton');

      await fireEvent(facebookAuthButton, 'onPress');

      expect(loginWithPermissinosSpy).toBeCalledTimes(1);
      expect(loginWithPermissinosSpy).toBeCalledWith([
        'public_profile',
        'email',
      ]);

      expect(getCurrentAccessTokenSpy).toBeCalledTimes(1);
      expect(getCurrentAccessTokenSpy).toReturnWith(
        expect.objectContaining({
          _W: {
            accessToken: mockAccessToken,
          },
        }),
      );

      expect(facebookAuthApiSpy).toBeCalledTimes(1);
      expect(facebookAuthApiSpy).toBeCalledWith(mockAccessToken);
      expect(facebookAuthApiSpy).toReturnWith(
        expect.objectContaining({_W: mockUserToken}),
      );

      expect(setIsLoadingMock).toBeCalledTimes(1);
      expect(setIsLoadingMock.mock.calls).toEqual([[true]]);

      expect(saveTokenLocallySpy).toBeCalledTimes(1);
      expect(saveTokenLocallySpy).toBeCalledWith(mockUserToken);

      expect(replaceMock).toBeCalledTimes(1);
      expect(replaceMock).toBeCalledWith('HomeStack', {screen: 'Home'});
    });

    it('onPress method should return when the user canceled the sigin process', async () => {
      loginWithPermissinosSpy.mockImplementation(
        () => new Promise(resolve => resolve({isCancelled: true})),
      );

      const loginAuthOptions: RenderAPI = render(
        <AuthOptions
          variant="Login"
          setIsLoading={setIsLoadingMock}
          globalNavigation={globalNavigation}
        />,
      );

      const facebookAuthButton =
        loginAuthOptions.getByTestId('facebookAuthButton');

      await fireEvent(facebookAuthButton, 'onPress');

      expect(loginWithPermissinosSpy).toBeCalledTimes(1);
      expect(loginWithPermissinosSpy).toBeCalledWith([
        'public_profile',
        'email',
      ]);
      expect(setIsLoadingMock).toBeCalledTimes(0);

      expect(getCurrentAccessTokenSpy).toBeCalledTimes(0);
      expect(facebookAuthApiSpy).toBeCalledTimes(0);
      expect(saveTokenLocallySpy).toBeCalledTimes(0);
      expect(replaceMock).toBeCalledTimes(0);
      expect(handleErrorSpy).toBeCalledTimes(0);
    });

    it('onPress method should return when the there is no accessToken', async () => {
      getCurrentAccessTokenSpy.mockImplementation(
        () => new Promise(resolve => resolve({})),
      );

      const loginAuthOptions: RenderAPI = render(
        <AuthOptions
          variant="Login"
          setIsLoading={setIsLoadingMock}
          globalNavigation={globalNavigation}
        />,
      );

      const facebookAuthButton =
        loginAuthOptions.getByTestId('facebookAuthButton');

      await fireEvent(facebookAuthButton, 'onPress');

      expect(loginWithPermissinosSpy).toBeCalledTimes(1);
      expect(loginWithPermissinosSpy).toBeCalledWith([
        'public_profile',
        'email',
      ]);
      expect(getCurrentAccessTokenSpy).toBeCalledTimes(1);

      expect(setIsLoadingMock).toBeCalledTimes(0);
      expect(facebookAuthApiSpy).toBeCalledTimes(0);
      expect(saveTokenLocallySpy).toBeCalledTimes(0);
      expect(replaceMock).toBeCalledTimes(0);
      expect(handleErrorSpy).toBeCalledTimes(0);
    });

    it('onPress method should call the handleError() when there is any errors', async () => {
      facebookAuthApiSpy.mockImplementation(
        () => new Promise((_, rejected) => rejected({})),
      );

      const loginAuthOptions: RenderAPI = render(
        <AuthOptions
          variant="Login"
          setIsLoading={setIsLoadingMock}
          globalNavigation={globalNavigation}
        />,
      );

      const facebookAuthButton =
        loginAuthOptions.getByTestId('facebookAuthButton');

      await fireEvent(facebookAuthButton, 'onPress');

      expect(loginWithPermissinosSpy).toBeCalledTimes(1);
      expect(loginWithPermissinosSpy).toBeCalledWith([
        'public_profile',
        'email',
      ]);
      expect(getCurrentAccessTokenSpy).toBeCalledTimes(1);
      expect(setIsLoadingMock).toBeCalledTimes(2);
      expect(setIsLoadingMock.mock.calls).toEqual([[true], [false]]);

      expect(facebookAuthApiSpy).toBeCalledTimes(1);
      expect(saveTokenLocallySpy).toBeCalledTimes(0);
      expect(replaceMock).toBeCalledTimes(0);
      expect(handleErrorSpy).toBeCalledTimes(1);
    });
  });
});
