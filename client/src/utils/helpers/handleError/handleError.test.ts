import {handleError} from './handleError';
import Toast from 'react-native-simple-toast';
import {
  InternalServerError,
  InvalidInputValuesError,
  NetworkError,
  NotAuthorizeError,
} from '../../../apis/__utils__/Errors';

describe('handleNetworkError', () => {
  let showToastSpy: jest.SpyInstance;

  beforeEach(() => {
    showToastSpy = jest.spyOn(Toast, 'show').mockImplementation(() => {});
  });

  afterEach(() => {
    showToastSpy.mockRestore();
  });

  it('should call the show method from Toast with no connection message and 5000 duration when we have a NetworkError', () => {
    const error = new NetworkError('netword error');

    handleError(error);

    expect(showToastSpy).toBeCalledTimes(1);
    expect(showToastSpy).toBeCalledWith(
      'No internet connection, please check you internet and try again',
      5000,
    );
  });

  it('should call the show method from Toast with an invalid inputs message and 5000 duration when we have an InvalidInputsError', () => {
    const error = new InvalidInputValuesError({
      success: false,
      errors: '',
    });

    handleError(error);

    expect(showToastSpy).toBeCalledTimes(1);
    expect(showToastSpy).toBeCalledWith(
      'Invalid Inputs, please try again',
      5000,
    );
  });

  it('should call the show methode from Toast with a Something went wrong message and 5000 duration when we have other errors', () => {
    const serverError = new InternalServerError({success: false, errors: ''});
    handleError(serverError);

    expect(showToastSpy).toBeCalledTimes(1);
    expect(showToastSpy).toBeCalledWith(
      'Something went wrong, please try again',
      5000,
    );

    showToastSpy.mockReset();

    const notAuthorizeError = new NotAuthorizeError({
      success: false,
      errors: '',
    });
    handleError(notAuthorizeError);

    expect(showToastSpy).toBeCalledTimes(1);
    expect(showToastSpy).toBeCalledWith(
      'Something went wrong, please try again',
      5000,
    );

    showToastSpy.mockReset();

    const anotherRandomError = 'lskdjf';
    handleError(anotherRandomError);

    expect(showToastSpy).toBeCalledTimes(1);
    expect(showToastSpy).toBeCalledWith(
      'Something went wrong, please try again',
      5000,
    );
  });
});
