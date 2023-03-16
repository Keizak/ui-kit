import { IGetParams } from '../../crud-reducer-creator/base-api/BaseApi';

export const typesUtils = {
  isObject(data: any) {
    return typeof data === 'object' && data !== null;
  },
  isArray(data: any) {
    return Array.isArray(data);
  },
};

export class QueryStringUtils {
  getQueryStr(params: IGetParams | null) {
    if (!params) return '';

    let keys = Object.keys(params);

    let pairs = keys
      .filter((k) => params[k] !== null && params[k] !== undefined) // has non nullable value
      .map((k) => {
        if (typesUtils.isArray(params[k])) {
          return this._getStringFromArrayOfObject(k, params[k] as any[]);
        }

        return this._getStringFromPare(k, params[k] as string);
      });

    let queryString = pairs.join('&');

    if (pairs.length) {
      queryString = '?' + queryString;
    }

    return queryString;
  }
  _getStringFromPare(key: string, value: string) {
    return `${key}=${encodeURIComponent(value)}`;
  }
  _getStringFromArrayOfObject(key: string, array: any[]) {
    let strings: string[] = [];

    array.forEach((o, index) => {
      let keys = Object.keys(o);

      keys.forEach((k) => {
        const value = o[k];

        strings.push(`${key}[${index}].${k}=${encodeURIComponent(value)}`);
      });
      //`${key}[${index}].${o}=${encodeURIComponent(value)}`
    });

    return strings.join('&');
  }
}
