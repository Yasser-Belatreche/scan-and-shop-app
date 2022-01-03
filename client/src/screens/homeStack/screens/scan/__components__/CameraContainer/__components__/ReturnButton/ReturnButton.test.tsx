import 'react-native';
import React from 'react';
import {Image, Pressable} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';
import Native from '@react-navigation/native';

import {ReturnButton} from './ReturnButton';
import {ICONS} from '../../../../../../../../utils/constants';
import * as Context from '../../../../__context__/context';

describe('Scan screen, CameraComponent - ReturnButton', () => {
  let selectedPicMock: string | undefined;
  let setSelectedPicMock: jest.Mock<any, any>;
  let setIsPicConfirmedMock: jest.Mock<any, any>;
  let goBackMock: jest.Mock<any, any>;
  let addListenerMock: jest.Mock<any, any>;
  let useNavigationSpy: jest.SpyInstance;
  let useContextSpy: jest.SpyInstance;

  beforeEach(() => {
    selectedPicMock = 'lksdf';
    setSelectedPicMock = jest.fn();
    setIsPicConfirmedMock = jest.fn();
    goBackMock = jest.fn();
    addListenerMock = jest.fn();

    useNavigationSpy = jest
      .spyOn(Native, 'useNavigation')
      .mockImplementation(() => ({
        goBack: goBackMock,
        addListener: addListenerMock,
      }));

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
    useNavigationSpy.mockRestore();
    useContextSpy.mockRestore();
    goBackMock.mockReset();
    addListenerMock.mockReset();
  });

  it('should render correctly with the UI', () => {
    const instance = render(<ReturnButton />);

    const Icon = instance.UNSAFE_getByType(Image);

    expect(Icon).toHaveProp('source', ICONS.returnWhite);
  });

  it('should call setSelectedPic with undefined when pressing the button and there is a selectedPic', () => {
    selectedPicMock = 'lkqsdf';
    useContextSpy.mockImplementation(
      () =>
        ({
          selectedPic: selectedPicMock,
          setSelectedPic: setSelectedPicMock,
          setIsPicConfirmed: setIsPicConfirmedMock,
        } as any),
    );

    const instance = render(<ReturnButton />);

    const Button = instance.UNSAFE_getByType(Pressable);

    expect(useNavigationSpy).toBeCalledTimes(1);

    fireEvent(Button, 'onPress');

    expect(setSelectedPicMock).toBeCalledTimes(1);
    expect(setSelectedPicMock).toBeCalledWith(undefined);

    expect(setIsPicConfirmedMock).toBeCalledTimes(1);
    expect(setIsPicConfirmedMock).toBeCalledWith(false);

    expect(goBackMock).toBeCalledTimes(0);
  });

  it('should call goBack pressing the button and there is a no selectedPic', () => {
    selectedPicMock = undefined;
    useContextSpy.mockImplementation(
      () =>
        ({
          selectedPic: selectedPicMock,
          setSelectedPic: setSelectedPicMock,
          setIsPicConfirmed: setIsPicConfirmedMock,
        } as any),
    );

    const instance = render(<ReturnButton />);

    const Button = instance.UNSAFE_getByType(Pressable);

    expect(useNavigationSpy).toBeCalledTimes(1);

    fireEvent(Button, 'onPress');

    expect(goBackMock).toBeCalledTimes(1);
    expect(setSelectedPicMock).toBeCalledTimes(0);
    expect(setIsPicConfirmedMock).toBeCalledTimes(0);
  });

  it('should call the addListener with the beforeRemove argument when rendering', () => {
    const screenInstance = render(<ReturnButton />);

    expect(addListenerMock).toBeCalledTimes(1);
    expect(addListenerMock.mock.calls[0][0]).toEqual('beforeRemove');
  });
});
