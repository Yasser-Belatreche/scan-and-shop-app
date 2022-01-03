import 'react-native';
import React from 'react';
import {Image, Pressable} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {act, fireEvent, render} from '@testing-library/react-native';

import {AllPicsButton} from './AllPicsButton';
import {ICONS} from '../../../../../../../../utils/constants';
import * as ErrorHandler from '../../../../../../../../utils/helpers/handleError/handleError';
import * as Context from '../../../../__context__/context';

describe('Scan screen, ActionButtons - AllPicsButton component', () => {
  const mockImageUri = 'files://kslduoiz/ksdlif.png';
  const mockImageType = 'image/png';
  const mockFileName = 'mockFileName';

  let setSelectedPicMock: jest.Mock<any, any>;
  let launchImageLibrarySpy: jest.SpyInstance;
  let handleErrorSpy: jest.SpyInstance;
  let useContextSpy: jest.SpyInstance;

  beforeEach(() => {
    setSelectedPicMock = jest.fn();

    launchImageLibrarySpy = jest
      .spyOn(ImagePicker, 'launchImageLibrary')
      .mockImplementation(() =>
        Promise.resolve({
          assets: [
            {uri: mockImageUri, type: mockImageType, fileName: mockFileName},
          ],
        } as any),
      );

    handleErrorSpy = jest
      .spyOn(ErrorHandler, 'handleError')
      .mockImplementation(() => {});

    useContextSpy = jest
      .spyOn(Context, 'useScanScreenContext')
      .mockImplementation(
        () =>
          ({
            setSelectedPic: setSelectedPicMock,
          } as any),
      );
  });

  afterEach(() => {
    setSelectedPicMock.mockReset();
    launchImageLibrarySpy.mockRestore();
    handleErrorSpy.mockRestore();
    useContextSpy.mockRestore();
  });

  it('should render correctly with the right UI', () => {
    const instance = render(<AllPicsButton />);

    const Icon = instance.UNSAFE_getByType(Image);

    expect(Icon).toHaveProp('source', ICONS.imageIcon);
  });

  describe('onPress method', () => {
    it('should call setSelectedPic when pressing the button and selecting a picture', async () => {
      const instance = render(<AllPicsButton />);

      const Button = instance.UNSAFE_getByType(Pressable);

      await act(async () => {
        await fireEvent(Button, 'onPress');
      });

      expect(launchImageLibrarySpy).toBeCalledTimes(1);
      expect(launchImageLibrarySpy).toBeCalledWith({
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.2,
      });

      expect(setSelectedPicMock).toBeCalledTimes(1);
      expect(setSelectedPicMock).toBeCalledWith({
        uri: mockImageUri,
        type: mockImageType,
        name: mockFileName,
      });

      expect(handleErrorSpy).toBeCalledTimes(0);
    });

    it('should return when the user canceled', async () => {
      launchImageLibrarySpy.mockImplementation(() =>
        Promise.resolve({didCancel: true}),
      );

      const instance = render(<AllPicsButton />);

      const Button = instance.UNSAFE_getByType(Pressable);

      await act(async () => {
        await fireEvent(Button, 'onPress');
      });

      expect(launchImageLibrarySpy).toBeCalledTimes(1);
      expect(launchImageLibrarySpy).toBeCalledWith({
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.2,
      });

      expect(handleErrorSpy).toBeCalledTimes(0);
      expect(setSelectedPicMock).toBeCalledTimes(0);
    });

    it('should call handleError when there is an error', async () => {
      const error = 'something went wrong';
      launchImageLibrarySpy.mockImplementation(() =>
        Promise.resolve({errorMessage: error}),
      );

      const instance = render(<AllPicsButton />);

      const Button = instance.UNSAFE_getByType(Pressable);

      await act(async () => {
        await fireEvent(Button, 'onPress');
      });

      expect(launchImageLibrarySpy).toBeCalledTimes(1);
      expect(launchImageLibrarySpy).toBeCalledWith({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      expect(handleErrorSpy).toBeCalledTimes(1);
      expect(handleErrorSpy).toBeCalledWith(error);

      expect(setSelectedPicMock).toBeCalledTimes(0);
    });

    it('should call handleError when no one of the needed image properties(type and uri) not returned from the launchImageLibrary', async () => {
      launchImageLibrarySpy.mockImplementation(() =>
        Promise.resolve({assets: [{type: mockImageType}]}),
      );

      const instance = render(<AllPicsButton />);

      const Button = instance.UNSAFE_getByType(Pressable);

      await act(async () => {
        await fireEvent(Button, 'onPress');
      });

      expect(launchImageLibrarySpy).toBeCalledTimes(1);
      expect(launchImageLibrarySpy).toBeCalledWith({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      expect(handleErrorSpy).toBeCalledTimes(1);
      expect(handleErrorSpy).toBeCalledWith(
        'something went wrong at handlePress of AllPicsButton',
      );

      expect(setSelectedPicMock).toBeCalledTimes(0);
    });
  });
});
