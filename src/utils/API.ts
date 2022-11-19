import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
// const authToken = localStorage.getItem('authToken');

if (baseURL) {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
}

// if (authToken) {
// axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
// }

export class API {
  // static async get(url: string, authToken?: string) {
  static async get(url: string) {
    const response = await axios.get(url, {
      withCredentials: true,
      // ...(authToken && { headers: { Authorization: `Bearer ${authToken}` } }),
    });
    return response.data;
  }
  // static async post(url: string, data?: any, params?: object, authToken?: string) {
  static async post(url: string, data?: any, params?: object) {
    const response = await axios.post(url, data, {
      withCredentials: true,
      // ...(authToken && { headers: { Authorization: `Bearer ${authToken}` } }),
      ...(params && { params }),
    });
    return response.data;
  }
}
