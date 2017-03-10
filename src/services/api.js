import axios from 'axios';
import { API_ROOT } from './constant';

// const ax = axios.create({
//   baseURL: API_ROOT,
//   timeout: 10000,
// });

const formOptions = (option, commonOption) => {
  const options = Object.assign({}, option, commonOption);
  const httpReg = new RegExp(/^http[s]?:\/\//);
  if (options && options.url) {
    if (!httpReg.test(options.url)) {
      options.url = `${API_ROOT}${options.url}`;
    }
  }

  return options;
};

const api = {
  get(selfConfig) {
    const option = formOptions(selfConfig, {
      method: 'GET',
    });
    console.log(option);
    return axios(option);
  },
  post(selfConfig) {
    const option = formOptions(selfConfig, {
      method: 'POST',
    });
    return axios(option);
  },
};

export default api;
