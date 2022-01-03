import '@testing-library/jest-native/extend-expect';
import '@testing-library/jest-dom/extend-expect';
// import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    hasPlayServices: () => {},
    signIn: () => {},
  },
  statusCodes: {
    SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
    IN_PROGRESS: 'IN_PROGRESS',
    PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
    SIGN_IN_REQUIRED: 'SIGN_IN_REQUIRED',
  },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: (key: string, value: any) => {},
  getItem: (key: string) => {},
  removeItem: (key: string) => {},
}));

jest.mock('react-native-fbsdk-next', () => ({
  AccessToken: {
    getCurrentAccessToken: () => {},
  },
  LoginManager: {
    logInWithPermissions: () => {},
  },
}));

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: (screen: string, params?: any) => {},
      replace: (key: string) => {},
      goBack: () => {},
      addListener: () => {},
    }),
    useRoute: () => ({
      params: '',
    }),
  };
});
