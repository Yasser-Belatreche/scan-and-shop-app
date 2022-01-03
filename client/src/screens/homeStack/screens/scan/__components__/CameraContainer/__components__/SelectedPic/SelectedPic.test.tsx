import 'react-native';
import React from 'react';
import {Image, Pressable} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';

import {SelectedPic} from './SelectedPic';
import {ICONS} from '../../../../../../../../utils/constants';
import * as Context from '../../../../__context__/context';

describe('Scan screen, CameraContainer - SelectedPic', () => {
  const selectedPicMock = 'file://klsduflk';

  let setSelectedPicMock: jest.Mock<any, any>;
  let setIsPicConfirmedMock: jest.Mock<any, any>;
  let useContextSpy: jest.SpyInstance;

  beforeEach(() => {
    setSelectedPicMock = jest.fn();
    setIsPicConfirmedMock = jest.fn();
    useContextSpy = jest
      .spyOn(Context, 'useScanScreenContext')
      .mockImplementation(
        () =>
          ({
            selectedPic: selectedPicMock,
            setSelectedPic: setSelectedPicMock,
            setIsPicConfirmed: setIsPicConfirmedMock,
          } as any),
      );
  });

  afterEach(() => {
    setSelectedPicMock.mockReset();
    setIsPicConfirmedMock.mockReset();
    useContextSpy.mockRestore();
  });

  it('should render correctly with the right UI', () => {
    const instance = render(<SelectedPic />);

    const [selectedImage, closeButton] = instance.UNSAFE_getAllByType(Image);

    expect(selectedImage).toHaveProp('source', {uri: selectedPicMock});
    expect(closeButton).toHaveProp('source', ICONS.closeWhite);
  });

  it('should call setSelectedPic with undefined and setIsPicConfirmed with false when clicking the closeButton', () => {
    const instance = render(<SelectedPic />);

    const Button = instance.UNSAFE_getByType(Pressable);

    fireEvent(Button, 'onPress');

    expect(setSelectedPicMock).toBeCalledTimes(1);
    expect(setSelectedPicMock).toBeCalledWith(undefined);

    expect(setIsPicConfirmedMock).toBeCalledTimes(1);
    expect(setIsPicConfirmedMock).toBeCalledWith(false);
  });
});
