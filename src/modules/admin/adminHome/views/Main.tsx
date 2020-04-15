import React from 'react';
import ReactMarkdown from 'react-markdown';
import {connect} from 'react-redux';
import engineeringArticle from './engineering.md';
import styles from './index.m.less';
import summaryArticle from './summary.md';

const Component: React.FC = () => {
  return (
    <div className={`g-adminPage ${styles.root}`}>
      <h1>关于本项目</h1>
      <div className="panel">
        <div>
          <ReactMarkdown className="g-markdown" source={summaryArticle} />
        </div>
        <div>
          <ReactMarkdown className="g-markdown" source={engineeringArticle} />
        </div>
      </div>
    </div>
  );
};

export default connect()(React.memo(Component));
