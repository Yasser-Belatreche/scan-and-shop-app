import React from 'react';
import {storiesOf} from '@storybook/react-native';
import Header from './Header';

const headerStories = storiesOf('Header', module);

headerStories.add('h1', () => <Header variant="h1">Hello</Header>);

headerStories.add('h2', () => <Header variant="h2">Hello</Header>);

headerStories.add('h3', () => <Header variant="h3">Hello</Header>);

headerStories.add('h4', () => <Header variant="h4">Hello</Header>);

headerStories.add('h5', () => <Header variant="h5">Hello</Header>);

headerStories.add('h6 - default', () => <Header>Hello</Header>);
