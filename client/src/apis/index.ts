import {imageRecognition} from './local/products';
import {
  facebookAuth,
  googleAuth,
  login,
  signup,
  resetPassword,
  sendVerificationEmail,
  verifyCode,
} from './local/users';

export const APICalls = {
  login,
  signup,
  googleAuth,
  facebookAuth,
  verifyCode,
  sendVerificationEmail,
  resetPassword,
  imageRecognition,
};
