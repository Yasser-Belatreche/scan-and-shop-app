import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type HomeStackScreens = {
  Home: undefined;
  Favourites: undefined;
  Scan: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type HomeStackNavigation<CurrentScreen extends keyof HomeStackScreens> =
  NativeStackScreenProps<HomeStackScreens, CurrentScreen>;

export type HomeStackNavigationProp<
  CurrentScreen extends keyof HomeStackScreens,
> = HomeStackNavigation<CurrentScreen>['navigation'] | any;

export type HomeStackRouteProp<CurrentScreen extends keyof HomeStackScreens> =
  HomeStackNavigation<CurrentScreen>['route'];
