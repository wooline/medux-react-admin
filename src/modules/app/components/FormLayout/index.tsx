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
            <p>本项目主要用来展示如何将 @medux 应用于 web 后台管理系统，你可能看不到丰富的后台 UI 控件及界面，因为这不是重点，网上这样的轮子已经很多了，而本项目想着重表达的是“通用化解题思路”</p>
          </div>
          <div className="form">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Component);
