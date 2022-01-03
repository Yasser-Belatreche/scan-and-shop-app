import 'react-native';
import React from 'react';
import {ActivityIndicator, Animated, Image} from 'react-native';
import {act, fireEvent, render} from '@testing-library/react-native';
import {RNCamera} from 'react-native-camera';
import Native from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';

import Scan from './Scan';

describe('Scan Screen', () => {
  const mockImageUri = 'files://kslduoiz/ksdlif.png';

  let launchImageLibrarySpy: jest.SpyInstance;
  let takePicSpy: jest.SpyInstance;
  let addListenerMock: jest.Mock<any, any>;
  let useNavigationSpy: jest.SpyInstance;

  beforeEach(() => {
    launchImageLibrarySpy = jest
      .spyOn(ImagePicker, 'launchImageLibrary')
      .mockImplementation(() =>
        Promise.resolve({assets: [{uri: mockImageUri}]} as any),
      );

    takePicSpy = jest
      .spyOn(RNCamera.prototype, 'takePictureAsync')
      .mockImplementation(() => Promise.resolve({uri: mockImageUri} as any));

    addListenerMock = jest.fn();
    useNavigationSpy = jest
      .spyOn(Native, 'useNavigation')
      .mockImplementation(() => ({
        addListener: addListenerMock,
      }));
  });

  afterEach(() => {
    launchImageLibrarySpy.mockRestore();
    takePicSpy.mockRestore();
    addListenerMock.mockReset();
    useNavigationSpy.mockRestore();
  });

  it('should renders correctly with the right UI', () => {
    // ! not complete yet
    const screenInstance = render(<Scan />);

    screenInstance.getByTestId('takePicButton');
    screenInstance.getByTestId('flipCameraButton');
    screenInstance.getByTestId('allPicsButton');
    screenInstance.getByTestId('camera');
    screenInstance.getByTestId('returnButton');
    screenInstance.getByTestId('scanRectangle');
  });

  it('should show the selected pic on the screen when taking a picture', async () => {
    const screenInstance = render(<Scan />);

    const takePicButton = screenInstance.getByTestId('takePicButton');

    await act(async () => {
      await fireEvent(takePicButton, 'onPress');
    });

    expect(takePicSpy).toBeCalledTimes(1);

    const selectedImg = screenInstance.getByTestId('selectedImage');

    expect(screenInstance.UNSAFE_queryByType(RNCamera)).toBeNull();
    expect(selectedImg.findAllByType(Image)[0]).toHaveProp('source', {
      uri: mockImageUri,
    });
  });

  it('should show the selected pic on the screen when selecting a pic from the gellery', async () => {
    const screenInstance = render(<Scan />);

    const allPicsButton = screenInstance.getByTestId('allPicsButton');

    await act(async () => {
      await fireEvent(allPicsButton, 'onPress');
    });

    expect(launchImageLibrarySpy).toBeCalledTimes(1);

    const selectedImg = screenInstance.getByTestId('selectedImage');

    expect(screenInstance.UNSAFE_queryByType(RNCamera)).toBeNull();
    expect(selectedImg.findAllByType(Image)[0]).toHaveProp('source', {
      uri: mockImageUri,
    });
  });

  it('should flip the camera when clicking the flipCamera button', async () => {
    const screenInstance = render(<Scan />);

    const flipCameraButton = screenInstance.getByTestId('flipCameraButton');

    await act(async () => {
      await fireEvent(flipCameraButton, 'onPress');
    });

    expect(screenInstance.UNSAFE_getByType(RNCamera)).toHaveProp(
      'type',
      'front',
    );

    await act(async () => {
      await fireEvent(flipCameraButton, 'onPress');
    });

    expect(screenInstance.UNSAFE_getByType(RNCamera)).toHaveProp(
      'type',
      'back',
    );
  });

  it('should show the ActivityLoader and the scanner animation when confirming the image', async () => {
    const screenInstance = render(<Scan />);

    const takePicButton = screenInstance.getByTestId('takePicButton');

    expect(screenInstance.UNSAFE_queryByType(Animated.View)).toBeNull();

    await act(async () => {
      await fireEvent(takePicButton, 'onPress');
      await fireEvent(takePicButton, 'onPress');
    });

    screenInstance.UNSAFE_getByType(Animated.View);
    screenInstance.UNSAFE_getByType(ActivityIndicator);
  });

  it('should remove the selected pic from the screen and show the camera when clicking return button and the pic in confirmed', async () => {
    const screenInstance = render(<Scan />);

    const takePicButton = screenInstance.getByTestId('takePicButton');
    const returnButton = screenInstance.getByTestId('returnButton');

    expect(screenInstance.queryByTestId('selectedImage')).toBeNull();
    screenInstance.UNSAFE_getByType(RNCamera);

    await act(async () => {
      await fireEvent(takePicButton, 'onPress');
      await fireEvent(takePicButton, 'onPress');
    });

    screenInstance.getByTestId('selectedImage');
    expect(screenInstance.UNSAFE_queryByType(RNCamera)).toBeNull();

    await act(async () => {
      await fireEvent(returnButton, 'onPress');
    });

    expect(screenInstance.queryByTestId('selectedImage')).toBeNull();
    screenInstance.UNSAFE_getByType(RNCamera);
  });
});
