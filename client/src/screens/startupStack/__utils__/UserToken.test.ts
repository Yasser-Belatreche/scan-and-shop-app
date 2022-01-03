import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {UserToken} from './UserToken';

describe('UserToken Class', () => {
  const mockToken = 'Bearer lksdfjklqjds.jksldjflkqsdfuezlirfsqlkdfj';

  describe('save method', () => {
    let setItemSpy: jest.SpyInstance;

    beforeEach(() => {
      setItemSpy = jest
        .spyOn(AsyncStorage, 'setItem')
        .mockImplementation(() => Promise.resolve());
    });

    afterEach(() => {
      setItemSpy.mockRestore();
    });

    it('should store the token in the local storage, and put it in the authorization headers of axios request', async () => {
      await UserToken.save(mockToken);

      expect(setItemSpy).toBeCalledTimes(1);
      expect(axios.defaults.headers.common['Authorization']).toEqual(mockToken);
    });

    it('should throw an error if anything wrong happend', async () => {
      const error = 'something went wrong';
      setItemSpy.mockImplementation(() => Promise.reject(error));

      await expect(UserToken.save(mockToken)).rejects.toEqual(error);
    });
  });

  describe('delete method', () => {
    let removeItemSpy: jest.SpyInstance;

    beforeEach(() => {
      removeItemSpy = jest
        .spyOn(AsyncStorage, 'removeItem')
        .mockImplementation(() => Promise.resolve());
    });

    afterEach(() => {
      removeItemSpy.mockRestore();
    });

    it('should store the token in the local storage, and put it in the authorization headers of axios request', async () => {
      await UserToken.delete();

      expect(removeItemSpy).toBeCalledTimes(1);
      expect(axios.defaults.headers.common['Authorization']).toBeUndefined();
    });

    it('should throw an error if anything wrong happend', async () => {
      const error = 'something went wrong';
      removeItemSpy.mockImplementation(() => Promise.reject(error));

      await expect(UserToken.delete()).rejects.toEqual(error);
    });
  });
});
