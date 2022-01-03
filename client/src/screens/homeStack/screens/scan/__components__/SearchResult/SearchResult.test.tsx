import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import {SearchResult} from './SearchResult';

describe('Scan screen, SearchResult component', () => {
  it('should render correctly with the right UI', () => {
    const instance = render(<SearchResult />);
  });
});
