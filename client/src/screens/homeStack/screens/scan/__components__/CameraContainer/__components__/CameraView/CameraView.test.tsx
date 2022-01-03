import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import {CameraView} from './CameraView';
import * as Context from '../../../../__context__/context';
import {RNCamera} from 'react-native-camera';

describe('Scan screen, CameraComponent - CameraView', () => {
  let cameraRefMock = jest.fn();
  let cameraTypeMock: 'back' | 'front' = 'back';
  let useContextSpy: jest.SpyInstance;

  beforeEach(() => {
    useContextSpy = jest
      .spyOn(Context, 'useScanScreenContext')
      .mockImplementation(
        () =>
          ({
            cameraType: cameraTypeMock,
            cameraRef: cameraRefMock,
          } as any),
      );
  });

  afterEach(() => {
    cameraRefMock.mockReset();
    useContextSpy.mockRestore();
  });

  it('should render correctly with the right UI', () => {
    const instance = render(<CameraView />);

    const camera = instance.container.findByType(RNCamera);

    expect(camera).toHaveProp('type', cameraTypeMock);
  });
});
