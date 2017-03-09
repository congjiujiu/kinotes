import axios from 'axios';
import { API_ROOT } from './constant';

const ax = axios.create({
  baseURL: API_ROOT,
  timeout: 10000,
});

const api = {
  get(selfConfig) {
    ax.get(selfConfig);
  },
  post(selfConfig) {
    return axios({
      method: 'POST',
      url: `${API_ROOT}${selfConfig.url}`,
      data: selfConfig.data,
    });
  },
};

export default api;
