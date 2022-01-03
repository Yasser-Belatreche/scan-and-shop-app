import {AxiosResponse} from 'axios';
import axios from '../axios';

const imageRecognition = async (image: FormData) => {
  try {
    const result: AxiosResponse = await axios.post(
      '/products/imageRecognition',
      image,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return result.data;
  } catch (error) {
    throw error;
  }
};

export {imageRecognition};
