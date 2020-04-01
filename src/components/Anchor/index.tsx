import {Anchor} from 'antd';
import React from 'react';
import styles from './index.m.less';

const Link = Anchor.Link;
interface Props {
  navs: string[][];
}

const Component: React.FC<Props> = (props) => {
  return (
    <Anchor className={styles.root}>
      {props.navs.map((item, idx) => (
        <Link key={idx} href={`#${item[1]}`} title={item[0]} />
      ))}
    </Anchor>
  );
};

export default React.memo(Component);
