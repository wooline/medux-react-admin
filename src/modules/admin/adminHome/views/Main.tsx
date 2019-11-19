import {Breadcrumb, Icon} from 'antd';

import React from 'react';
import {connect} from 'react-redux';
import styles from './index.m.less';

interface StoreProps {}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    return (
      <div className={styles.root + ' g-adminPage'}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Icon type="home" />
            <span>Home</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Application Center</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Application List</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
        <article>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
          <p>adminHome</p>
        </article>
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {};
};

export default connect(mapStateToProps)(Component);
