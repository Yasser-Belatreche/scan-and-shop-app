import axios, {AxiosResponse} from 'axios';
import {
  ErrorResponse,
  InternalServerError,
  InvalidInputValuesError,
  NetworkError,
  NotAuthorizeError,
} from './__utils__/Errors';

axios.defaults.baseURL = 'http://192.168.1.104:5000/api';

axios.interceptors.response.use(
  (response: AxiosResponse<any>) => response.data,
  error => {
    if (error.message === 'Network Error') {
      return Promise.reject(new NetworkError(error.message));
    }

    if (error.response.status === 400) {
      return Promise.reject(new InvalidInputValuesError(error.response.data));
    }

    if (error.response.status === 401) {
      return Promise.reject(new NotAuthorizeError(error.response.data));
    }

    if (error.response.status === 500) {
      return Promise.reject(new InternalServerError(error.response.data));
    }

    return Promise.reject(
      new ErrorResponse(error.response.status, error.response.data),
    );
  },
);

export default axios;
