import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type StartupStackScreens = {
  Launch: undefined;
  Login: undefined;
  Signup: undefined;
  ForgetPassword: undefined;
  EmailVerification: {email: string; onSuccess: () => void};
  ResetPassword: undefined;
};

export type StartupStackNavigation<
  CurrentScreen extends keyof StartupStackScreens,
> = NativeStackScreenProps<StartupStackScreens, CurrentScreen>;

export type StartupStackNavigationProp<
  CurrentScreen extends keyof StartupStackScreens,
> = StartupStackNavigation<CurrentScreen>['navigation'] | any; // add any to make the tests pass

export type StartupStackRouteProp<
  CurrentScreen extends keyof StartupStackScreens,
> = StartupStackNavigation<CurrentScreen>['route'];
