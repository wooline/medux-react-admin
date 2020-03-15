import {Icon} from 'antd';
// 某些全局变量必须前置引入
import React from 'react';
import {loadView as baseLoadView} from '@medux/react-web-router';
import {metaKeys} from './common/utils';

const DefLoading = () => (
  <div className="g-viewLoader">
    <Icon type="sync" spin />
  </div>
);
const loadView = (moduleName: string, viewName: never, options?: any, loading: React.ComponentType<any> = DefLoading) => baseLoadView(moduleName, viewName, options, loading);

if (initEnv.production) {
  (window as any).console = {
    log: () => void 0,
    info: () => void 0,
    error: () => void 0,
    warn: () => void 0,
  };
}

((data: {[key: string]: any}) => {
  Object.keys(data).forEach(key => {
    window[key] = data[key];
  });
})({metaKeys, loadView});
