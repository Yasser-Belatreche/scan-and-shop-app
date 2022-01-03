import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import {LastVisited} from './LastVisited';

describe('Home screen, LastVisited component', () => {
  it('should render correctly with the right UI', async () => {
    const instance = render(<LastVisited />);

    await instance.findByText('latest visited');
  });
});
