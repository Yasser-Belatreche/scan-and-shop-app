import Toast from 'react-native-simple-toast';

const showToast = (message: string, duration?: number) => {
  return Toast.show(message, duration || 3000);
};

export {showToast};
