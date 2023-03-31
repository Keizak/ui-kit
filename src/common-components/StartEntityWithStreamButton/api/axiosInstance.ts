import { securityConstants } from '../../../constants/securityConstants';
import { BaseAxiosInstance } from '../../../helpers/api/baseAxiosInstance/BaseAxiosInstance';

export const axiosInstance = new BaseAxiosInstance({
  baseURL: `${securityConstants.apiBaseUrl}`,
  withCredentials: true,
  headers: {
    't-bot-url': securityConstants.botUrl,
  },
}).AxiosInstanceClient;
