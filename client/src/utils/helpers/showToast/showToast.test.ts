import Toast from 'react-native-simple-toast';
import {showToast} from './showToast';

describe('showToast() function', () => {
  let showMock: jest.SpyInstance;

  beforeEach(() => {
    showMock = jest.spyOn(Toast, 'show').mockImplementation(() => {});
  });

  afterEach(() => {
    showMock.mockRestore();
  });

  it('should call the show method from the "react-native-simple-toast" package with the correct params', () => {
    showToast('my message', 2000);

    expect(showMock).toBeCalledTimes(1);
    expect(showMock).toBeCalledWith('my message', 2000);
  });

  it('should call the show method from the "react-native-simple-toast" package with a 3000 duration when no duration arg provided', () => {
    showToast('my message');

    expect(showMock).toBeCalledTimes(1);
    expect(showMock).toBeCalledWith('my message', 3000);
  });
});
