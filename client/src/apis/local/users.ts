import {AxiosResponse} from 'axios';
import axios from '../axios';

interface LoginBody {
  email: string;
  password: string;
}

interface SignupBody {
  name: string;
  email: string;
  password: string;
}

const login = async (body: LoginBody) => {
  try {
    const res: AxiosResponse = await axios.post('/users/login', body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const signup = async (body: SignupBody) => {
  try {
    const res: AxiosResponse = await axios.post('/users/signup', body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const googleAuth = async (idToken: string) => {
  try {
    const res: AxiosResponse = await axios.post('/users/auth/google', {
      idToken,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const facebookAuth = async (accessToken: string) => {
  try {
    const res: AxiosResponse = await axios.post('/users/auth/facebook', {
      accessToken,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const sendVerificationEmail = async (email: string) => {
  try {
    const res = await axios.post('/users/sendVerificationEmail', {email});
    return res.data;
  } catch (error) {
    throw error;
  }
};

interface VerifyCodeParams {
  code: number;
  email: string;
}

const verifyCode = async (params: VerifyCodeParams) => {
  try {
    const res = await axios.post(`/users/verifyCode`, params);
    return res.data;
  } catch (error) {
    throw error;
  }
};

interface ResetPasswordBody {
  password: string;
  confirmPassword: string;
}

const resetPassword = async (body: ResetPasswordBody) => {
  try {
    const res = await axios.put('/users/resetPassword', body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export {
  login,
  signup,
  googleAuth,
  facebookAuth,
  sendVerificationEmail,
  verifyCode,
  resetPassword,
};
