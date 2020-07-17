import {FormItemProps} from 'antd/lib/form/FormItem';
import {Rule} from 'antd/lib/form';
import {message as antdMessage} from 'antd';
export interface FromItem<D> {
  name: D;
  formItem: FormItemProps['children'];
  label: string;
  rules?: Rule[];
  col?: number;
}
export const metaKeys = {
  LoginPathname: '/login',
  RegisterPathname: '/register',
  UserHomePathname: '/admin/home',
  ArticleHomePathname: '/article/home',
  LoginRedirectSessionStorageKey: 'LoginRedirectTo',
  FavoritesUrlStorageKey: 'FavoritesUrl',
};
export const message = {
  success: (content: string) => {
    antdMessage.success(content);
  },
  error: (content: string) => {
    const initLoading = document.getElementById('g-init-loading');
    antdMessage.error(content, initLoading ? 9999999 : 3);
  },
};
export type ExcludeNull<T> = {[K in keyof T]-?: T[K] extends null ? never : K}[keyof T];
export type ExtractArray<T extends any[]> = T[Extract<keyof T, number>];
export type OmitSelf<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PickOptional<T> = Pick<T, {[K in keyof T]-?: {} extends {[P in K]: T[K]} ? K : never}[keyof T]>;
export interface FormDecorator<D> {
  dependencies?: D[];
  rules?: Rule[];
  valuePropName?: string;
}
export function reference(...args: any) {
  return true;
}
export function getFormDecorators<FormData>(items: {[key in keyof FormData]: FormDecorator<keyof FormData>}): {[key in keyof FormData]: FormDecorator<keyof FormData> & {name: string}} {
  // return new Proxy(
  //   {},
  //   {
  //     get: (target: {}, key: string) => {
  //       const item = items[key] || {};
  //       item['name'] = key;
  //       return item;
  //     },
  //     set: () => {
  //       return true;
  //     },
  //   }
  // ) as any;
  for (const key in items) {
    if (items.hasOwnProperty(key)) {
      const item = items[key]!;
      item['name'] = key;
    }
  }
  return items as any;
}

export function pick<T extends {[key: string]: any}, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((prev, cur) => {
    prev[cur] = obj[cur];
    return prev;
  }, {} as any);
}
export type FromItemList<FormData> = FromItem<Extract<keyof FormData, string>>[];
export function enumOptions<T extends {[key: string]: any}>(data: T) {
  const options: {key: string; name: string}[] = [];
  const nameToKey: {[key in keyof T]: T[key]} = {} as any;
  const keyToName: {[key in T[keyof T]]: string} = {} as any;
  Object.keys(data).forEach((name) => {
    options.push({name, key: data[name]});
    (nameToKey as any)[name] = data[name];
    keyToName[data[name]] = name;
  });
  return {
    keyToName,
    nameToKey,
    options,
  };
}
export function arrayToMap<T>(arr: T[], key: string = 'id'): {[key: string]: T} {
  return arr.reduce((pre, cur) => {
    pre[cur[key]] = cur;
    return pre;
  }, {});
}
export function simpleEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true;
  } else if (typeof obj1 !== typeof obj2 || typeof obj1 !== 'object') {
    return false;
  } else {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    } else {
      for (const key of keys1) {
        if (!simpleEqual(obj1[key], obj2[key])) {
          return false;
        }
      }
      return true;
    }
  }
}
