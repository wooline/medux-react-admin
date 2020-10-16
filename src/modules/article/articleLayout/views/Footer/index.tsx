import {Link} from '@medux/react-web-router';
import QRcode from 'assets/imgs/qq.png';
import React from 'react';
import styles from './index.m.less';

const Component: React.FC = () => {
  return (
    <footer className={styles.root}>
      <div className="g-doc">
        <dl>
          <dt>Medux框架系列</dt>
          <dd>
            <Link href="/">medux/core</Link>
          </dd>
          <dd>
            <Link href="/">medux/web</Link>
          </dd>
          <dd>
            <Link href="/">medux/react</Link>
          </dd>
        </dl>
        <dl>
          <dt>资源推荐</dt>
          <dd>
            <Link href="/">Ant Design</Link>
          </dd>
          <dd>
            <Link href="/">Ant Design Pro</Link>
          </dd>
          <dd>
            <Link href="/">Typescript</Link>
          </dd>
        </dl>
        <dl>
          <dt>意见反馈</dt>
          <dd>
            <Link href="/">Bug报告</Link>
          </dd>
          <dd>
            <Link href="/">在线留言反馈</Link>
          </dd>
          <dd>
            <Link href="/">新手入门手册</Link>
          </dd>
        </dl>
        <dl>
          <dt>联系我们</dt>
          <dd>
            <Link href="/">wooline@qq.com</Link>
          </dd>
          <dd>
            <Link href="/">QQ群号929696953</Link>
          </dd>
        </dl>
        <dl>
          <dt>QQ交流群</dt>
          <dd>
            <img alt="logo" src={QRcode} width="103" height="103" />
          </dd>
        </dl>
        <div className="copyright">
          © 2019 wooline@qq.com. All Rights Reserved. <span>粤ICP备9531688号-1</span>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Component);
