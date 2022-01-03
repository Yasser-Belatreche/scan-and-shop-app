import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import Salutation from './Salutation';

describe('Signup Screen, Salutation component', () => {
  it('should render correctly with the right UI', async () => {
    const instance = render(<Salutation />);

    await instance.findByText('hi 👋');
    await instance.findByText('Welcom to');
  });
});
