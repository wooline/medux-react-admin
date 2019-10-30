import {Input, Modal} from 'antd';

import React from 'react';
import {connect} from 'react-redux';
import styles from './index.m.less';

interface StoreProps {
  showPop?: boolean;
}

class Component extends React.PureComponent<StoreProps & DispatchProp> {
  onCancel = () => {
    this.props.dispatch(actions.articleLayout.closeConsult());
  };
  public render() {
    return (
      <Modal visible={this.props.showPop} width={450} onCancel={this.onCancel}>
        <div className={styles.root}>
          <h3>请输入您要咨询的问题：</h3>
          <Input.TextArea rows={5} placeholder="留言..." />
        </div>
      </Modal>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {
    showPop: state.articleLayout!.showConsult,
  };
};
export default connect(mapStateToProps)(Component);
