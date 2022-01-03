import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import Profile from './Profile';

describe('Profile Screen', () => {
  it('should renders correctly', () => {
    const screenInstance = render(<Profile />);
  });
});
