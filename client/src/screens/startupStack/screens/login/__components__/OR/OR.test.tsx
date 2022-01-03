import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import OR from './OR';

describe('Login screen, OR component', () => {
  it('should render correctelly with the right UI', async () => {
    const instance = render(<OR />);

    await instance.findByText('or');
  });
});
