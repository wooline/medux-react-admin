import {Anchor} from 'antd';
import React from 'react';
import styles from './index.m.less';

const {Link} = Anchor;
interface Props {
  navs: string[][];
}

const Component: React.FC<Props> = (props) => {
  const {navs} = props;
  return (
    <Anchor className={styles.root}>
      {navs.map((item, idx) => (
        <Link key={item[1]} href={`#${item[1]}`} title={item[0]} />
      ))}
    </Anchor>
  );
};

export default React.memo(Component);
