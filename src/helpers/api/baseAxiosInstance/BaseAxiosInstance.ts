import axios, { AxiosInstance } from 'axios';
const tokenKey = 'auth-token';
const courseIdKey = 'course-id';

export const getToken = () => {
  return sessionStorage.getItem(tokenKey);
};

export const saveToken = (token: string) => {
  sessionStorage.setItem(tokenKey, token);
};

export let getCourseId = () => Number(sessionStorage.getItem(courseIdKey));

type OptionsType = {
  baseURL: string;
  withCredentials?: boolean;
  headers?: { [key: string]: string };
};

export class BaseAxiosInstance {
  public AxiosInstanceClient: AxiosInstance;

  constructor(options: OptionsType) {
    this.AxiosInstanceClient = axios.create(options);

    this.AxiosInstanceClient.interceptors.request.use(
      async (config) => {
        let token = getToken();

        if (token) {
          // obsolete key name
          config.headers!.token = token;
          // correct header key name
          config.headers!['auth-token'] = token;
        }

        // @ts-ignore
        config.headers!['course-id'] = getCourseId();

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.AxiosInstanceClient.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
