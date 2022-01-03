import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import Salutation from './Salutation';

describe('Login Screen, Salutation Component', () => {
  it('should render correctlly with the right text', async () => {
    const instance = render(<Salutation />);

    await instance.findByText('hi 👋');
    await instance.findByText('welcom back');
  });
});
