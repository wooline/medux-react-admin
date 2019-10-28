import {Anchor} from 'antd';
import React from 'react';
import styles from './index.m.less';

const Link = Anchor.Link;
interface StoreProps {
  navs: string[][];
}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    return (
      <Anchor className={styles.root}>
        {this.props.navs.map((item, idx) => (
          <Link key={idx} href={`#${item[1]}`} title={item[0]} />
        ))}
      </Anchor>
    );
  }
}

export default Component;
