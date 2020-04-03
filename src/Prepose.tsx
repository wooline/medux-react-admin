// 某些全局变量必须前置引入
import React from 'react';
import {SyncOutlined} from '@ant-design/icons';
import {loadView as baseLoadView} from '@medux/react-web-router';
import {metaKeys} from './common';

const DefLoading = () => (
  <div className="g-viewLoader">
    <SyncOutlined spin />
  </div>
);
const DefError = () => <div className="g-viewLoader">error</div>;
const loadView = (moduleName: string, viewName: never, options?: any, loading: React.ComponentType<any> = DefLoading, error: React.ComponentType<any> = DefError) =>
  baseLoadView(moduleName, viewName, options, loading, error);

if (initEnv.production) {
  (window as any).console = {
    log: () => void 0,
    info: () => void 0,
    error: () => void 0,
    warn: () => void 0,
  };
}

((data: {[key: string]: any}) => {
  Object.keys(data).forEach((key) => {
    window[key] = data[key];
  });
})({metaKeys, loadView});
