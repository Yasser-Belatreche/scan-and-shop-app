import 'react-native';
import React from 'react';
import {Image, Pressable} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';

import {FlipCameraButton} from './FlipCameraButton';
import {ICONS} from '../../../../../../../../utils/constants';
import * as Context from '../../../../__context__/context';

describe('Scan screen, ActionButtons - FlipCameraButton component', () => {
  let setCameraTypeMock: jest.Mock<any, any>;
  let useContextSpy: jest.SpyInstance;

  beforeEach(() => {
    setCameraTypeMock = jest.fn();
    useContextSpy = jest
      .spyOn(Context, 'useScanScreenContext')
      .mockImplementation(
        () =>
          ({
            setCameraType: setCameraTypeMock,
          } as any),
      );
  });

  afterEach(() => {
    setCameraTypeMock.mockReset();
    useContextSpy.mockRestore();
  });

  it('should render correctly with the right UI', () => {
    const instance = render(<FlipCameraButton />);

    const FlipIcon = instance.UNSAFE_getByType(Image);

    expect(FlipIcon).toHaveProp('source', ICONS.flipCamera);
  });

  it('should call the setCameraType with the right values when he pressed', () => {
    const instance = render(<FlipCameraButton />);

    const FlipButton = instance.UNSAFE_getByType(Pressable);

    fireEvent(FlipButton, 'onPress');

    const callbackArg = setCameraTypeMock.mock.calls[0][0];

    expect(setCameraTypeMock).toBeCalledTimes(1);
    expect(callbackArg('front')).toEqual('back');
    expect(callbackArg('back')).toEqual('front');
  });
});
