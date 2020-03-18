import {Link} from 'react-router-dom';
import Logo from 'assets/imgs/logo.svg';
import React from 'react';
import styles from './index.m.less';

const Component: React.FC = () => {
  return (
    <div className={styles.root}>
      <Link to={metaKeys.UserHomePathname} className="panel g-clearfix">
        <img className="logo" width="50" src={Logo} alt="通用管理后台" />
        <h1>通用管理后台</h1>
        <span className="ver">V1.2.3</span>
      </Link>
    </div>
  );
};

export default React.memo(Component);
