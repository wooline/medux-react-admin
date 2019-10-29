import {Icon} from 'antd';
import React from 'react';
import styles from './index.m.less';

interface StoreProps {
  title: string;
  content: string;
  bg: string;
  onConsult: () => void;
}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    const {title, content, onConsult, bg} = this.props;
    return (
      <div className={styles.root}>
        <img src={bg} />
        <div className="g-doc">
          <h2>{title}</h2>
          <p>{content}</p>
          <span className="primaryBtn" onClick={onConsult}>
            马上咨询 <Icon type="right" />
          </span>
        </div>
      </div>
    );
  }
}

export default Component;
