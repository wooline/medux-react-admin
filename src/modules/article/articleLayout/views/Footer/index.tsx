import {Link} from 'react-router-dom';
import QRcode from 'assets/imgs/qr-code.jpg';
import React from 'react';
import styles from './index.m.less';

interface StoreProps {}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    return (
      <footer className={styles.root}>
        <div className="g-doc">
          <dl>
            <dt>Medux框架系列</dt>
            <dd>
              <Link to="/">medux/core</Link>
            </dd>
            <dd>
              <Link to="/">medux/web</Link>
            </dd>
            <dd>
              <Link to="/">medux/react</Link>
            </dd>
          </dl>
          <dl>
            <dt>资源推荐</dt>
            <dd>
              <Link to="/">Ant Design</Link>
            </dd>
            <dd>
              <Link to="/">Ant Design Pro</Link>
            </dd>
            <dd>
              <Link to="/">Typescript</Link>
            </dd>
          </dl>
          <dl>
            <dt>意见反馈</dt>
            <dd>
              <Link to="/">Bug报告</Link>
            </dd>
            <dd>
              <Link to="/">在线留言反馈</Link>
            </dd>
            <dd>
              <Link to="/">新手入门手册</Link>
            </dd>
          </dl>
          <dl>
            <dt>联系我们</dt>
            <dd>
              <Link to="/">wooline@qq.com</Link>
            </dd>
            <dd>
              <Link to="/">QQ群号929696953</Link>
            </dd>
          </dl>
          <dl>
            <dt>QQ交流群</dt>
            <dd>
              <img src={QRcode} width="103" height="103" />
            </dd>
          </dl>
          <div className="copyright">
            © 2019 wooline@qq.com. All Rights Reserved. <span>粤ICP备9531688号-1</span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Component;
