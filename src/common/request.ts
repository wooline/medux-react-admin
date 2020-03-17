import axios, {AxiosError, AxiosResponse, Method} from 'axios';

import {CustomError} from 'common';

const request = axios.create();

request.interceptors.request.use(request => {
  return request;
});

request.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response;
  },
  (error: AxiosError<{message: string}>) => {
    const httpErrorCode = error.response ? error.response.status : 0;
    const statusText = error.response ? error.response.statusText : '';
    const responseData = error.response ? error.response.data : '';

    const errorMessage = responseData && responseData.message ? responseData.message : `${statusText}, failed to call ${error.config.url}`;
    throw new CustomError(httpErrorCode.toString(), errorMessage, responseData);
  }
);

export default function ajax<T>(method: Method, url: string, params: {[key: string]: any} = {}, data: {[key: string]: any} = {}): Promise<T> {
  url = url.replace(/:\w+/g, flag => {
    const key = flag.substr(1);
    if (params[key]) {
      const val: string = params[key];
      delete params[key];
      return encodeURIComponent(val);
    } else {
      return '';
    }
  });
  Object.keys(initEnv.apiServerPath).some(key => {
    const reg = new RegExp(key);
    if (reg.test(url)) {
      url = url.replace(reg, initEnv.apiServerPath[key]);
      return true;
    } else {
      return false;
    }
  });

  return request.request({method, url, params, data}).then(response => response.data);
}
