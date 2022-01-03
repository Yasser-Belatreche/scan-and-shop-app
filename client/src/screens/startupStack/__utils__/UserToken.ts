import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class UserToken {
  constructor() {}

  public static async save(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = token;
    } catch (error) {
      throw error;
    }
  }

  public static async delete(): Promise<void> {
    try {
      await AsyncStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
      throw error;
    }
  }
}

export {UserToken};
