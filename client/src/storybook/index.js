// if you use expo remove this line
import React from 'react';
import {AppRegistry, View} from 'react-native';

import {getStorybookUI, configure, addDecorator} from '@storybook/react-native';
import {loadStories} from './storyLoader';
import {withKnobs} from '@storybook/addon-knobs';
import {name as appName} from '../../app.json';

import './rn-addons';

// enables knobs for all stories
addDecorator(withKnobs);
addDecorator(Elem => (
  <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
    <Elem />
  </View>
));

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage:
    require('@react-native-async-storage/async-storage').default ||
    require('react-native').AsyncStorage ||
    null,
});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you should remove this line.
AppRegistry.registerComponent(appName, () => StorybookUIRoot);

export default StorybookUIRoot;
