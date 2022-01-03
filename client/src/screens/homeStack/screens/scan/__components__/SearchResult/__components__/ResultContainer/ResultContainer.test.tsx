import 'react-native';
import React from 'react';
import {Animated} from 'react-native';
import {render} from '@testing-library/react-native';

import {ResultContainer} from './ResultContainer';
import {COLORS} from '../../../../../../../../theme';

describe('Scan screen, SearchResult - ResultContainer component', () => {
  it('should render correctly with the right UI', () => {
    const instance = render(<ResultContainer />);
  });
});
