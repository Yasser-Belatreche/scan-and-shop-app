import 'react-native';
import React from 'react';
import {ActivityIndicator, Image, TouchableHighlight} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';

import {TakePicButton} from './TakePicButton';
import {COLORS} from '../../../../../../../../theme';
import {ICONS} from '../../../../../../../../utils/constants';
import * as Context from '../../../../__context__/context';
import * as ErrorHandler from '../../../../../../../../utils/helpers/handleError/handleError';

describe('Scan screen, ActionButtons - TakePicButton component', () => {
  let selectedPicMock: string | undefined = 'file://lksjdf';
  let setSelectedPicMock: jest.Mock<any, any>;
  let isPicConfirmedMock: boolean = false;
  let setIsPicConfirmedMock: jest.Mock<any, any>;
  let takePicAsyncMock: jest.Mock<any, any>;
  let cameraRefMock: any;
  let useContextSpy: jest.SpyInstance;
  let handleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    setSelectedPicMock = jest.fn();
    takePicAsyncMock = jest.fn();
    setIsPicConfirmedMock = jest.fn();

    cameraRefMock = {
      current: {
        takePictureAsync: takePicAsyncMock.mockReturnValue(
          Promise.resolve({
            res: {uri: selectedPicMock},
          }),
        ),
      },
    };

    useContextSpy = jest
      .spyOn(Context, 'useScanScreenContext')
      .mockImplementation(
        () =>
          ({
            isPicConfirmed: isPicConfirmedMock,
            selectedPic: selectedPicMock,
            setSelectedPic: setSelectedPicMock,
            cameraRef: cameraRefMock,
            setIsPicConfirmed: setIsPicConfirmedMock,
          } as any),
      );

    handleErrorSpy = jest
      .spyOn(ErrorHandler, 'handleError')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    setSelectedPicMock.mockReset();
    takePicAsyncMock.mockReset();
    useContextSpy.mockRestore();
    handleErrorSpy.mockRestore();
  });

  describe('UI behaviours', () => {
    it('should render the correct icon when the selectedPic in defined and isPicConfirmed is false', () => {
      const instance = render(<TakePicButton />);

      const Button = instance.UNSAFE_getByType(TouchableHighlight);
      const Icon = instance.UNSAFE_getByType(Image);

      expect(Icon).toHaveProp('source', ICONS.correct);
      expect(Button).toHaveStyle({
        backgroundColor: COLORS.primary,
        borderRadius: 40,
      });
    });

    it('should render the ActivityIndicator when the selectedPic in defined and isPicConfirmed is true', () => {
      isPicConfirmedMock = true;

      useContextSpy.mockImplementation(
        () =>
          ({
            isPicConfirmed: isPicConfirmedMock,
            selectedPic: selectedPicMock,
            setSelectedPic: setSelectedPicMock,
            cameraRef: cameraRefMock,
            setIsPicConfirmed: setIsPicConfirmedMock,
          } as any),
      );

      const instance = render(<TakePicButton />);

      const Icon = instance.UNSAFE_queryByType(Image);
      const ActityIncdicator = instance.UNSAFE_getByType(ActivityIndicator);

      expect(Icon).toBeNull();
      expect(ActityIncdicator).toBeDefined();
    });

    it('should not render the correct icon neither the loader when the selectedPic in undefined', () => {
      selectedPicMock = undefined;
      isPicConfirmedMock = false;

      useContextSpy.mockImplementation(
        () =>
          ({
            isPicConfirmed: isPicConfirmedMock,
            selectedPic: selectedPicMock,
            setSelectedPic: setSelectedPicMock,
            cameraRef: cameraRefMock,
            setIsPicConfirmed: setIsPicConfirmedMock,
          } as any),
      );

      const instance = render(<TakePicButton />);

      const Icon = instance.UNSAFE_queryByType(Image);

      expect(Icon).toBeNull();
    });
  });

  describe('onPress method', () => {
    it('should take a pic and store it in selectedPic when the button is pressed and no pic is selected or confirmed', async () => {
      const instance = render(<TakePicButton />);

      const Button = instance.UNSAFE_getByType(TouchableHighlight);

      await fireEvent(Button, 'onPress');

      expect(takePicAsyncMock).toBeCalledTimes(1);
      expect(setSelectedPicMock).toBeCalledTimes(1);
      expect(setSelectedPicMock).toBeCalledWith(selectedPicMock);

      expect(setIsPicConfirmedMock).toBeCalledTimes(0);
      expect(handleErrorSpy).toBeCalledTimes(0);
    });

    it('should call setIsPicConfirmed when there is a pic selected', async () => {
      selectedPicMock = 'file://lsdjfoi.lskdjf';
      isPicConfirmedMock = false;

      useContextSpy.mockImplementation(
        () =>
          ({
            isPicConfirmed: isPicConfirmedMock,
            selectedPic: selectedPicMock,
            setSelectedPic: setSelectedPicMock,
            cameraRef: cameraRefMock,
            setIsPicConfirmed: setIsPicConfirmedMock,
          } as any),
      );

      const instance = render(<TakePicButton />);

      const Button = instance.UNSAFE_getByType(TouchableHighlight);

      await fireEvent(Button, 'onPress');

      expect(setIsPicConfirmedMock).toBeCalledTimes(1);
      expect(setIsPicConfirmedMock).toBeCalledWith(true);

      expect(takePicAsyncMock).toBeCalledTimes(0);
      expect(setSelectedPicMock).toBeCalledTimes(0);
      expect(handleErrorSpy).toBeCalledTimes(0);
    });

    it('should return when the pic is confirmed', async () => {
      isPicConfirmedMock = true;

      useContextSpy.mockImplementation(
        () =>
          ({
            isPicConfirmed: isPicConfirmedMock,
            selectedPic: selectedPicMock,
            setSelectedPic: setSelectedPicMock,
            cameraRef: cameraRefMock,
            setIsPicConfirmed: setIsPicConfirmedMock,
          } as any),
      );

      const instance = render(<TakePicButton />);

      const Button = instance.UNSAFE_getByType(TouchableHighlight);

      await fireEvent(Button, 'onPress');

      expect(setIsPicConfirmedMock).toBeCalledTimes(0);
      expect(takePicAsyncMock).toBeCalledTimes(0);
      expect(setSelectedPicMock).toBeCalledTimes(0);
      expect(handleErrorSpy).toBeCalledTimes(0);
    });

    it('should call handleError when something went wrong', async () => {
      const error = 'something went wrong';

      isPicConfirmedMock = false;
      selectedPicMock = undefined;

      cameraRefMock = {
        current: {
          takePictureAsync: takePicAsyncMock.mockReturnValue(
            Promise.reject(error),
          ),
        },
      };

      useContextSpy = jest
        .spyOn(Context, 'useScanScreenContext')
        .mockImplementation(
          () =>
            ({
              isPicConfirmed: isPicConfirmedMock,
              selectedPic: selectedPicMock,
              setSelectedPic: setSelectedPicMock,
              cameraRef: cameraRefMock,
              setIsPicConfirmed: setIsPicConfirmedMock,
            } as any),
        );

      const instance = render(<TakePicButton />);

      const Button = instance.UNSAFE_getByType(TouchableHighlight);

      await fireEvent(Button, 'onPress');

      expect(setIsPicConfirmedMock).toBeCalledTimes(0);
      expect(setSelectedPicMock).toBeCalledTimes(0);

      expect(takePicAsyncMock).toBeCalledTimes(1);
      expect(handleErrorSpy).toBeCalledTimes(1);
      expect(handleErrorSpy).toBeCalledWith(error);
    });
  });
});
