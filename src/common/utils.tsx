import {message as antdMessage} from 'antd';
import {FormItemProps} from 'antd/lib/form/FormItem';
import {Rule} from 'antd/lib/form';
import fastEqual from 'fast-deep-equal';

export function extract<T, K extends keyof T, U extends K[], P extends ExtractArray<U>>(target: T, ...args: U): Pick<T, P> & {$: OmitSelf<T, P>} {
  const clone = {...target};
  const result: any = (args as string[]).reduce((prev, cur) => {
    prev[cur] = target[cur];
    delete clone[cur];
    return prev;
  }, {});
  result.$ = clone;
  return result;
}

export function uniqueKey(): string {
  return Math.random().toString(16).substr(2);
}

export function pickEqual<T, P extends T, K extends keyof T>(obj1: T, obj2: P, props: K[]): boolean {
  for (let i = 0, k = props.length; i < k; i += 1) {
    const key = props[i];
    if (!fastEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

export interface FormDecorator<D> {
  dependencies?: D[];
  rules?: Rule[];
  valuePropName?: string;
}

export interface FromItem<D> {
  name: D;
  formItem: FormItemProps['children'];
  label: string;
  rules?: Rule[];
  col?: number;
  cite?: number;
}
export type FromItemList<FormData> = FromItem<Extract<keyof FormData, string>>[];

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
  Object.entries(items).forEach(([key, item]: [string, any]) => {
    item.name = key;
  });
  return items as any;
}

export function pick<T extends {[key: string]: any}, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((prev, cur) => {
    prev[cur] = obj[cur];
    return prev;
  }, {} as any);
}

export function arrayToMap<T>(arr: T[], key = 'id'): {[key: string]: T} {
  return arr.reduce((pre, cur) => {
    pre[cur[key]] = cur;
    return pre;
  }, {});
}

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

export function reference(..._args: any) {
  return true;
}

// export const safeCheckd = Symbol();
// export type SafeChecked = typeof safeCheckd;

export type ExcludeNull<T> = {[K in keyof T]-?: T[K] extends null ? never : K}[keyof T];
export type ExtractArray<T extends any[]> = T[Extract<keyof T, number>];
export type OmitSelf<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// eslint-disable-next-line @typescript-eslint/ban-types
export type PickOptional<T> = Pick<T, {[K in keyof T]-?: {} extends {[P in K]: T[K]} ? K : never}[keyof T]>;

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
