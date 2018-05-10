import { map, compact, uniqBy } from 'lodash';
import { VALID_PARAMS } from './constants';

export const generateQueryString = (params={}) => {
  const queryParams = map(params, (v, k) => {
    if (!!v) {
      // v = typeof v === 'object' ? v.id : v;
      return `${k}=${v}`;
    }
  });
  const compacted = compact(queryParams);
  const queryString = compacted.join('&');

  return queryString
}

export const parseQueryString = (queryString, params={}) => {
  VALID_PARAMS.map(paramKey => {
    const regex = new RegExp(`${paramKey}=(.+?)(?=&|$)`)
    const match = regex.exec(queryString)
    if (match) {
      const val = match[1]
      params[paramKey] = val;
    }
  })

  return params
}
