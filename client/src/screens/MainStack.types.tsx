import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import {HomeStackScreens} from './homeStack/HomeStack.types';
import {StartupStackScreens} from './startupStack/StartupStack.types';

export type MainStackScreens = {
  HomeStack: NavigatorScreenParams<HomeStackScreens>;
  StartupStack: NavigatorScreenParams<StartupStackScreens>;
};

export type MainStackNavigation<CurrentScreen extends keyof MainStackScreens> =
  NativeStackScreenProps<MainStackScreens, CurrentScreen>;

export type MainStackNavigationProp<
  CurrentScreen extends keyof MainStackScreens,
> = {
  // add '| any' to make the tests pass
  globalNavigation: MainStackNavigation<CurrentScreen>['navigation'] | any;
};
