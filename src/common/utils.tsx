import {ExtractArray, OmitSelf} from 'common';

import {FormItemProps} from 'antd/lib/form/FormItem';
import {Rule} from 'antd/lib/form';

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
  return Math.random()
    .toString(16)
    .substr(2);
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
export function pickEqual<T, P extends T, K extends keyof T>(obj1: T, obj2: P, props: K[]): boolean {
  for (let i = 0, k = props.length; i < k; i++) {
    const key = props[i];
    if (!simpleEqual(obj1[key], obj2[key])) {
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

export function arrayToMap<T>(arr: T[], key: string = 'id'): {[key: string]: T} {
  return arr.reduce((pre, cur) => {
    pre[cur[key]] = cur;
    return pre;
  }, {});
}

export function enumOptions<T extends {[key: string]: any}>(data: T) {
  const options: {key: string; name: string}[] = [];
  const nameToKey: {[key in keyof T]: T[key]} = {} as any;
  const keyToName: {[key in T[keyof T]]: string} = {} as any;
  Object.keys(data).forEach(name => {
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

export function reference(...args: any) {
  return true;
}
