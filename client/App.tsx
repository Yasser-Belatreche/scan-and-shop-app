import React from 'react';
import {Settings} from 'react-native-fbsdk-next';
import {NavigationContainer} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_WEB_CLIENT_ID} from '@env';

import AppContainer from './src/index';

Settings.initializeSDK();

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
});

const App = () => {
  return (
    <NavigationContainer>
      <AppContainer />
    </NavigationContainer>
  );
};

export default App;
