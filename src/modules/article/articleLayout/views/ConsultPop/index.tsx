import {Input, Modal} from 'antd';
import React, {useCallback} from 'react';

import {connect} from 'react-redux';
import styles from './index.m.less';

interface StoreProps {
  showPop?: boolean;
}

const Component: React.FC<StoreProps & DispatchProp> = ({showPop, dispatch}) => {
  const onCancel = useCallback(() => {
    dispatch(actions.articleLayout.closeConsult());
  }, [dispatch]);

  return (
    <Modal visible={showPop} width={450} onCancel={onCancel}>
      <div className={styles.root}>
        <h3>请输入您要咨询的问题：</h3>
        <Input.TextArea rows={5} placeholder="留言..." />
      </div>
    </Modal>
  );
};

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  return {
    showPop: state.articleLayout!.showConsult,
  };
};
export default connect(mapStateToProps)(React.memo(Component));
