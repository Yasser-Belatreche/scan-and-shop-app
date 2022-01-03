import React from 'react';
import {storiesOf} from '@storybook/react-native';
import IconButton from './IconButton';
import {ICONS} from '../../../utils/constants';

const headerStories = storiesOf('IconButton', module);

headerStories.add('normal button', () => (
  <IconButton icon={ICONS.cart} onPress={() => {}} />
));

headerStories.add('floten button', () => (
  <IconButton icon={ICONS.cart} floten />
));

headerStories.add('center floten button', () => (
  <IconButton icon={ICONS.cart} floten flotenPositioning="center" />
));

headerStories.add('left floten button', () => (
  <IconButton icon={ICONS.cart} floten flotenPositioning="left" />
));
