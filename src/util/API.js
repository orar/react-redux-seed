// @flow
import axios from 'axios';
import config from '../config/index';

/**
 * The definition of an API response.
 *
 * Needed to return always the same structure from a API method.
 */
export class APIResponse {
  code: string;

  description: string;

  data: any;

  constructor(code: string, description: string, data: any = []) {
    this.code = code;
    this.description = description;
    this.data = data;
  }
}


const server = axios.create({
  baseURL: `${config.apiBaseUrl}/api/`,
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
  withCredentials: true,
  xsrfCookieName: config.csrfCookieName,
  xsrfHeaderName: 'X-XSRF-TOKEN',
});


const transformResponse = (response) => {
  const { data, description, code } = response.data;
  response.description = description;
  response.code = code;
  response.data = data;
  return response;
};


/**
 * Provides helpers for the API implementations.
 */
export default class API {
  /**
   * The default error message which will be displayed in production mode for an unexpected error.
   */
  errorMessage = 'An error occurred, please try again later!';

  /**
   * Executes a request without a body.
   *
   * @param route  The API route.
   * @param params The request params.
   * @return A resolved or rejected promise.
   * @see http://www.redotheweb.com/2015/11/09/api-security.html
   */
  get(route: string, params: Object = {}): Promise<Response> {
    const requestOptions = {
      params,
    };
    return this.statusHandler(server.get(route, requestOptions));
  }

  /**
   * Executes a request with a JSON body.
   *
   * @param route The API route.
   * @param data  The JSON data to post.
   * @param headers The request headers.
   * @return A resolved or rejected promise.
   * @see http://www.redotheweb.com/2015/11/09/api-security.html
   */
  post(route: string, data: *, headers: Object = {}): Promise<Response> {
    const requestOptions = {
      headers,
    };

    return this.statusHandler(server.post(route, data, requestOptions));
  }

  /**
   * Executes a request with a application/x-www-form-urlencoded or multipart/form-data body.
   *
   * The `Content-Type` headers will automatically be added based on the passed content:
   * - URLSearchParams -> application/x-www-form-urlencoded
   * - FormData -> multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
   *
   * @param route  The API route.
   * @param body   The body to post.
   * @return A resolved or rejected promise.
   * @see http://www.redotheweb.com/2015/11/09/api-security.html
   */
  formRequest(route: string, body: URLSearchParams | FormData): Promise<Response> {
    return this.statusHandler(server.post(route, body));
  }

  /**
   * Handles the status of a response in a unified manner.
   *
   * All 2xx responses wil be returned directly, so that the caller can extract the body as required. All other
   * responses will be rejected with an APIError.
   *
   * @param promise The result from a fetch call.
   * @return A resolved or rejected promise.
   */
  statusHandler(promise: Promise<*>): Promise<Response> {
    const self = this;
    return promise
      .then(response => transformResponse(response))
      .catch((e) => {
        if (e.response) {
          e.response = transformResponse(e.response);

          return Promise.reject(e);
        }

        const msg = config.env === 'production'
          ? self.errorMessage
          : `Cannot process request; Got exception: ${e.message}`;
        e.response = new APIResponse('fatal.error', msg);
        return Promise.reject(e);
      });
  }
}
