import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Point to the live Railway production backend
let BASE_URL = 'https://backendinteriorapp-production.up.railway.app/api';

// If you want to switch back to local testing later, uncomment this:
// let BASE_URL = 'http://localhost:5000/api';
// if (Platform.OS === 'android') {
//   BASE_URL = 'http://10.0.2.2:5000/api';
// }

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
