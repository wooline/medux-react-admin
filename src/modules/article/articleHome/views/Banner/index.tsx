import {Icon} from 'antd';
import {Link} from 'react-router-dom';
import React from 'react';
import styles from './index.m.less';

interface StoreProps {}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    return (
      <div className={`${styles.root} g-banner`}>
        <div className="g-doc">
          <h2>Ant Design of React</h2>
          <p>主要用于研发企业级中后台产品。服务于企业级产品的设计体系，基于确定和自然的设计价值观上的模块化解决方案，让设计者和开发者专注于更好的用户体验。</p>
          <Link className="primaryBtn" to={metaKeys.UserHomePathname}>
            马上咨询 <Icon type="right" />
          </Link>
        </div>
      </div>
    );
  }
}

export default Component;
