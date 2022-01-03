import 'react-native';
import React from 'react';
import {Animated} from 'react-native';
import {render} from '@testing-library/react-native';

import {Overlay} from './Overlay';
import {COLORS} from '../../../../../../../../theme';

describe('Scan screen, SearchResult - Overlay component', () => {
  it('should render correctly with the right UI', () => {
    const instance = render(<Overlay />);

    expect(instance.UNSAFE_getByType(Animated.View)).toHaveStyle({
      position: 'absolute',
      backgroundColor: COLORS.white,
    });
  });

  it('should change the bg color and the opacity when passing the backgroundColor and opacity prop', () => {
    const instance = render(<Overlay backgroundColor="black" opacity={0.2} />);

    expect(instance.UNSAFE_getByType(Animated.View)).toHaveStyle({
      position: 'absolute',
      backgroundColor: COLORS.black,
    });
  });
});
