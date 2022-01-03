import React from 'react';
import {storiesOf} from '@storybook/react-native';
import Input from './Input';

const inputStories = storiesOf('Input', module);

inputStories.add('Text Input', () => (
  <Input
    label="Text"
    name="test"
    setInputValues={() => {}}
    placeholder="placeholder"
    type="email-address"
  />
));

inputStories.add('With error', () => (
  <Input
    label="Text"
    name="test"
    setInputValues={() => {}}
    placeholder="placeholder"
    error="this is an error"
  />
));

inputStories.add('Password Input', () => (
  <Input label="password" name="password" setInputValues={() => {}} />
));
