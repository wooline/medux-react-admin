import {Icon} from 'antd';
import {Link} from 'react-router-dom';
import React from 'react';
import styles from './index.m.less';

interface Props {}

class Component extends React.PureComponent<Props> {
  public render() {
    return (
      <div className={styles.root}>
        <div className="warp">
          <div className="panel">
            <div className="welcome">
              <div className="hd">
                <Icon className="logo" type="dingding" /> <Link to={metaKeys.ArticleHomePathname}>帮助中心 &gt;</Link>
              </div>
              <h2>欢迎使用 Medux</h2>
              <p>服务于企业级产品的设计体系，基于确定和自然的设计价值观上的模块化解决方案，让设计者和开发者专注于更好的用户体验。</p>
            </div>
            <div className="form">{this.props.children}</div>
          </div>
          {/* <Icon type="reconciliation" className="pattern" />
          <Icon type="reconciliation" className="pattern" /> */}
        </div>
      </div>
    );
  }
}

export default Component;
