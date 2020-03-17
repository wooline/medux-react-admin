import {LoadingState} from '@medux/react-web-router';
import React from 'react';
import {Spin} from 'antd';
import {connect} from 'react-redux';
import styles from './index.m.less';
interface StoreProps {
  globalLoading: LoadingState;
}

const Component: React.FC<StoreProps> = ({globalLoading}) => {
  return globalLoading === LoadingState.Start || globalLoading === LoadingState.Depth ? (
    <div className={styles.root + ' ' + globalLoading}>
      <div className="loadingIcon">
        <Spin />
      </div>
    </div>
  ) : null;
};

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {
    globalLoading: state.app!.loading.global,
  };
};
export default connect(mapStateToProps)(React.memo(Component));
