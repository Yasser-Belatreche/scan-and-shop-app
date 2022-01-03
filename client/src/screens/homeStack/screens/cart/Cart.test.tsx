import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import Cart from './Cart';

describe('Cart Screen', () => {
  it('should renders correctly', () => {
    const screenInstance = render(<Cart />);
  });
});
