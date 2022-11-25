import axios, { AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
const authToken = localStorage.getItem('authToken');

if (baseURL) {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
}

if (authToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

export class API {
  static async get(url: string, signal?: AbortSignal, authToken?: string) {
    try {
      const response = await axios.get(url, {
        // withCredentials: true,
        ...(authToken && { headers: { Authorization: `Bearer ${authToken}` } }),
        ...(signal && { signal }),
      });
      return response.data;
    } catch (e) {
      const err = e as AxiosError;
      return err.response?.data;
    }
  }
  static async post(
    url: string,
    data?: any,
    params?: object,
    authToken?: string,
    signal?: AbortSignal
  ) {
    try {
      const response = await axios.post(url, data, {
        withCredentials: true,
        ...(authToken && { headers: { Authorization: `Bearer ${authToken}` } }),
        ...(params && { params }),
        ...(signal && { signal }),
      });
      return response.data;
    } catch (e) {
      const err = e as AxiosError;
      return err.response?.data;
    }
  }
}
