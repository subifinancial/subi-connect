import axios from 'axios';

export const BASE_URL = process.env.SUBI_CONNECT_PUBLIC_BASE_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  withCredentials: true,
});

export default axiosClient;
