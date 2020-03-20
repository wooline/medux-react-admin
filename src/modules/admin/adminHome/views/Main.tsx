import {Breadcrumb} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import React from 'react';
import {connect} from 'react-redux';
import styles from './index.m.less';

const Component: React.FC = () => {
  return (
    <div className={styles.root + ' g-adminPage'}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <HomeOutlined />
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
};

export default connect()(React.memo(Component));
