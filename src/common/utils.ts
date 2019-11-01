import {Form, message as antdMessage} from 'antd';
import {FormComponentProps, GetFieldDecoratorOptions, WrappedFormInternalProps, WrappedFormUtils} from 'antd/lib/form/Form';

import {ComponentType} from 'react';

export type ExtractArray<T extends any[]> = T[Extract<keyof T, number>];
export type OmitSelf<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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
export const message = {
  success: (content: string) => {
    antdMessage.success(content);
  },
  error: (content: string) => {
    antdMessage.error(content);
  },
};
export const metaKeys = {
  LoginPathname: '/login',
  RegisterPathname: '/register',
  UserHomePathname: '/admin/home',
  ArticleHomePathname: '/article/home',
  ClientInitedAction: 'app/ClientInited',
  LoginRedirectSessionStorageKey: 'LoginRedirectTo',
  SessionIDSessionStorageKey: 'SessionID',
  FavoritesUrlStorageKey: 'FavoritesUrl',
};

export function getFormDecorators<D>(form: WrappedFormUtils, fields: {[key in keyof D]?: GetFieldDecoratorOptions}, initValues: {[key in keyof D]?: any} = {}) {
  type Keys = keyof typeof fields;
  const decorators = {};
  Object.keys(fields).forEach(key => {
    const item = fields[key];
    item.initialValue = initValues[key];
    decorators[key] = form.getFieldDecorator(key, fields[key]);
  });
  return decorators as {[K in Keys]: (node: React.ReactNode) => React.ReactNode};
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
