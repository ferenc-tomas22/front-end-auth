import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export class API {
  static async get(url: string) {
    const response = await axios.get(url);
    return response.data;
  }
  static async post(url: string, body: any) {
    const response = await axios.post(url, body);
    return response.data;
  }
}
