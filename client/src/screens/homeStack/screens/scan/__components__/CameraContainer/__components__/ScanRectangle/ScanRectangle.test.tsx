import 'react-native';
import React from 'react';
import {Animated, Image} from 'react-native';
import {render} from '@testing-library/react-native';

import {ScanRectangle} from './ScanRectangle';
import {ICONS} from '../../../../../../../../utils/constants';
import * as Context from '../../../../__context__/context';

describe('Scan screen, CameraContainer - ScanRectangle component', () => {
  let isConfirmed: boolean = false;
  let useContextSpy: jest.SpyInstance;

  beforeEach(() => {
    useContextSpy = jest
      .spyOn(Context, 'useScanScreenContext')
      .mockImplementation(
        () =>
          ({
            isPicConfirmed: isConfirmed,
          } as any),
      );
  });

  afterEach(() => {
    useContextSpy.mockRestore();
  });

  it('should render correctly with the right UI', () => {
    const instance = render(<ScanRectangle />);

    const Images = instance.UNSAFE_getAllByType(Image);

    expect(Images[0]).toHaveProp('source', ICONS.borderTopLeftCorner);
    expect(Images[1]).toHaveProp('source', ICONS.borderTopRightCorner);
    expect(Images[2]).toHaveProp('source', ICONS.borderBottomLeftCorner);
    expect(Images[3]).toHaveProp('source', ICONS.borderBottomRightCorner);
  });

  it('should render show the scan animated rectangle when isPicConfirmed is true', async () => {
    isConfirmed = true;
    useContextSpy.mockImplementation(
      () =>
        ({
          isPicConfirmed: isConfirmed,
        } as any),
    );

    const instance = render(<ScanRectangle />);

    const animatedRectangle = instance.UNSAFE_queryByType(Animated.View);

    expect(animatedRectangle).toBeDefined();
  });
});
