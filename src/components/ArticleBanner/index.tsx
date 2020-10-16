import React from 'react';
import {RightOutlined} from '@ant-design/icons';
import styles from './index.m.less';

interface Props {
  title: string;
  content: string;
  bg: string;
  onConsult: () => void;
}

const Component: React.FC<Props> = (props) => {
  const {title, content, onConsult, bg} = props;
  return (
    <div className={styles.root}>
      <img alt={bg} src={bg} />
      <div className="g-doc">
        <h2>{title}</h2>
        <p>{content}</p>
        <span role="button" className="primaryBtn" onClick={onConsult}>
          马上咨询 <RightOutlined />
        </span>
      </div>
    </div>
  );
};

export default React.memo(Component);
