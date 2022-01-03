import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

// types
import {MainStackScreens} from './MainStack.types';

// stacks
import StartupStack from './startupStack/StartupStack';
import HomeStack from './homeStack/HomeStack';

const Stack = createNativeStackNavigator<MainStackScreens>();

const MainStack: React.FC = () => {
  const screensOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={screensOptions}>
      <Stack.Screen name="StartupStack" component={StartupStack} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
