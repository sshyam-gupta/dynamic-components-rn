import {UrlHandler} from './url-handler';

/**
 * @param {string} url
 */

export default function getURLQueryParamsObject(urlQueryString: string) {
  const result = UrlHandler.getJsonFromUrl(urlQueryString);
  return result ? result.params : {};
}
