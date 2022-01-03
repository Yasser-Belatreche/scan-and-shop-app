import 'react-native';
import React from 'react';
import {RNCamera} from 'react-native-camera';
import {render} from '@testing-library/react-native';

import * as Context from '../../__context__/context';
import {CameraContainer} from './CameraContainer';

describe('Scan screen, CameraContainerComponent', () => {
  let useContextSpy: jest.SpyInstance;

  beforeEach(() => {
    useContextSpy = jest
      .spyOn(Context, 'useScanScreenContext')
      .mockImplementation(
        () =>
          ({
            selectedPic: undefined,
          } as any),
      );
  });

  afterEach(() => {
    useContextSpy.mockRestore();
  });

  describe('UI elements', () => {
    it('should render the camera view when the selectedPic is undefined', () => {
      const instance = render(<CameraContainer />);

      instance.getByTestId('returnButton');
      instance.getByTestId('scanRectangle');
      instance.getByTestId('camera');

      expect(instance.queryByTestId('selectedImage')).toBeNull();
    });

    it('should render the pic when the selectedPic is defined', () => {
      useContextSpy.mockImplementation(
        () =>
          ({
            selectedPic: 'files://somePath',
          } as any),
      );

      const instance = render(<CameraContainer />);

      instance.getByTestId('returnButton');
      instance.getByTestId('scanRectangle');
      instance.getByTestId('selectedImage');

      expect(instance.UNSAFE_queryByType(RNCamera)).toBeNull();
    });
  });
});
