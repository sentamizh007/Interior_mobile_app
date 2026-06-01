import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Handle localhost for different environments
let BASE_URL = 'http://localhost:5000/api';
if (Platform.OS === 'android') {
  BASE_URL = 'http://10.0.2.2:5000/api'; // Android Emulator alias for localhost
}

// Replace BASE_URL with your actual WiFi IP (e.g. http://192.168.1.5:5000/api) 
// if you are testing on a PHYSICAL phone via Expo Go.

const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to add the JWT token to headers
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
