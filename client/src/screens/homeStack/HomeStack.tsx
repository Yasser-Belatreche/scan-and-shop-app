import React from 'react';
import {Image, View} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

// screens
import Home from './screens/home/Home';
import Favourites from './screens/favourites/Favourites';
import Scan from './screens/scan/Scan';
import Cart from './screens/cart/Cart';
import Profile from './screens/profile/Profile';

// types
import {HomeStackScreens} from './HomeStack.types';

const Stack = createNativeStackNavigator<HomeStackScreens>();

const StartupStack: React.FC = () => {
  const screensOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={screensOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Favourites" component={Favourites} />
      <Stack.Screen name="Scan" component={Scan} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default StartupStack;
