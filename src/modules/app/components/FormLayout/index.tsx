import {DingdingOutlined} from '@ant-design/icons';
import {Link} from '@medux/react-web-router';
import React from 'react';
import styles from './index.m.less';

interface Props {}

const Component: React.FC<Props> = ({children}) => {
  return (
    <div className={styles.root}>
      <div className="warp">
        <div className="panel">
          <div className="welcome">
            <div className="hd">
              <DingdingOutlined className="logo" /> <Link href={metaKeys.ArticleHomePathname}>帮助中心 &gt;</Link>
            </div>
            <h2>欢迎使用 Medux</h2>
            <p>服务于企业级产品的设计体系，基于确定和自然的设计价值观上的模块化解决方案，让设计者和开发者专注于更好的用户体验。</p>
          </div>
          <div className="form">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Component);
