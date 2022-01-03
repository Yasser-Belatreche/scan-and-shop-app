import React from 'react';
import {storiesOf} from '@storybook/react-native';
import TextButton from './TextButton';
import {ICONS} from '../../../utils/constants';

const headerStories = storiesOf('TextButton', module);

headerStories.add('primary', () => (
  <TextButton variant="primary" onPress={() => {}}>
    Hello
  </TextButton>
));

headerStories.add('secondary', () => (
  <TextButton variant="secondary" onPress={() => {}}>
    Hello
  </TextButton>
));

headerStories.add('with icon', () => (
  <TextButton variant="secondary" onPress={() => {}} icon={ICONS.facebookLogo}>
    Hello
  </TextButton>
));

headerStories.add('with icon in left', () => (
  <TextButton
    variant="secondary"
    iconPlacement="left"
    onPress={() => {}}
    icon={ICONS.googleLogo}>
    Hello
  </TextButton>
));
