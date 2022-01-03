import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import OR from './OR';

describe('Signup screen, OR component', () => {
  it('should render correctly with the right UI', async () => {
    const instance = render(<OR />);

    await instance.findByText('or');
  });
});
