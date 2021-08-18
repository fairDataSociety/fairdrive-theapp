import axios, { AxiosInstance, AxiosError } from 'axios';

const HTTPClient = (): AxiosInstance => {
  const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_FAIROSHOST,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default HTTPClient;
