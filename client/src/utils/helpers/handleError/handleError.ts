import {
  InvalidInputValuesError,
  NetworkError,
} from '../../../apis/__utils__/Errors';
import {showToast} from '../showToast/showToast';

const handleError = (error: any) => {
  if (error instanceof NetworkError) {
    showToast(
      'No internet connection, please check you internet and try again',
      5000,
    );
  } else if (error instanceof InvalidInputValuesError) {
    showToast('Invalid Inputs, please try again', 5000);
  } else {
    showToast('Something went wrong, please try again', 5000);
    console.log(error);
  }
};

export {handleError};
