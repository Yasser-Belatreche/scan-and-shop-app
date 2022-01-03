import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import Favourites from './Favourites';

describe('Favourites Screen', () => {
  it('should renders correctly', () => {
    const screenInstance = render(<Favourites />);
  });
});
