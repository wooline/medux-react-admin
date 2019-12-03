import {Form, message as antdMessage} from 'antd';
import {FormComponentProps, GetFieldDecoratorOptions, WrappedFormInternalProps, WrappedFormUtils} from 'antd/lib/form/Form';

import {ComponentType} from 'react';

export type ExcludeNull<T> = {[K in keyof T]-?: T[K] extends null ? never : K}[keyof T];
export type ExtractArray<T extends any[]> = T[Extract<keyof T, number>];
export type OmitSelf<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PickOptional<T> = Pick<T, {[K in keyof T]-?: {} extends {[P in K]: T[K]} ? K : never}[keyof T]>;

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
export function filterEmpty<T extends {[key: string]: any}>(params: T): T {
  return Object.keys(params).reduce((pre, cur) => {
    const value = params[cur];
    const ntype = typeof value;
    if (Array.isArray(value) && value.length === 0) {
      pre[cur] = undefined;
      return pre;
    }
    if (ntype === 'number' || ntype === 'boolean' || params[cur]) {
      pre[cur] = params[cur];
    } else {
      pre[cur] = undefined;
    }
    return pre;
  }, {}) as T;
}
export const message = {
  success: (content: string) => {
    antdMessage.success(content);
  },
  error: (content: string) => {
    const initLoading = document.getElementById('g-init-loading');
    antdMessage.error(content, initLoading ? 9999999 : 3);
  },
};
export const metaKeys = {
  LoginPathname: '/login',
  RegisterPathname: '/register',
  UserHomePathname: '/admin/home',
  ArticleHomePathname: '/article/home',
  ClientInitedAction: 'app/ClientInited',
  LoginRedirectSessionStorageKey: 'LoginRedirectTo',
  FavoritesUrlStorageKey: 'FavoritesUrl',
};

export function getFormDecorators<D>(form: WrappedFormUtils, fields: {[key in keyof D]?: GetFieldDecoratorOptions} = {}, initValues: {[key in keyof D]?: any} = {}) {
  const decorators = new Proxy(
    {},
    {
      get: (target: {}, key: string) => {
        const item = fields[key] || {};
        if (initValues[key]) {
          item.initialValue = initValues[key];
        }
        return form.getFieldDecorator(key, item);
      },
      set: () => {
        return true;
      },
    }
  );
  return decorators as {[K in keyof typeof fields]-?: (node: React.ReactNode) => React.ReactNode};
}

type OmitForm<C> = C extends ComponentType<infer F> ? ComponentType<Omit<F, keyof WrappedFormInternalProps>> : never;

export function createForm<P, C extends ComponentType<any>>(searchForm: C, fieldsMap: (props: P) => {[key: string]: any}): OmitForm<C> {
  return Form.create({
    mapPropsToFields(props: P & FormComponentProps) {
      const fields = fieldsMap(props);
      return Object.keys(fields).reduce((pre, cur) => {
        pre[cur] = Form.createFormField({value: fields[cur]});
        return pre;
      }, {});
    },
  })(searchForm) as any;
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
