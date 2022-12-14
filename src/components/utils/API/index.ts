import axios, { AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
// const authToken = localStorage.getItem('authToken');

if (baseURL) {
  axios.defaults.baseURL = baseURL;
} else {
  throw new Error('No base URL provided');
}

// if (authToken) {
//   axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
// }

export class API {
  static async get(url: string, authToken?: string, signal?: AbortSignal) {
    try {
      const { data } = await axios.get(url, {
        withCredentials: true,
        ...(authToken && { headers: { Authorization: `Bearer ${authToken}` } }),
        ...(signal && { signal }),
      });
      return data;
    } catch (err) {
      return err as AxiosError;
    }
  }
  static async post(
    url: string,
    data?: unknown,
    params?: object,
    authToken?: string,
    signal?: AbortSignal
  ) {
    try {
      const { data: res_data } = await axios.post(url, data, {
        withCredentials: true,
        ...(authToken && { headers: { Authorization: `Bearer ${authToken}` } }),
        ...(params && { params }),
        ...(signal && { signal }),
      });
      return res_data;
    } catch (err) {
      return err as AxiosError;
    }
  }
}
