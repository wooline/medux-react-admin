import Detail from './Detail';
import Editor from './Editor';
import {ItemDetail} from 'entity/post';
import {Modal} from 'antd';
import React from 'react';
import Search from './Search';
import Table from './Table';
import {connect} from 'react-redux';

interface StoreProps {
  currentOperation?: 'detail' | 'edit' | 'create';
  currentItem?: ItemDetail;
}

class Component extends React.PureComponent<StoreProps & DispatchProp> {
  onHideCurrent = () => {
    this.props.dispatch(actions.adminPost.execCurrentItem());
  };
  public render() {
    const {currentOperation, currentItem} = this.props;
    return (
      <div className="g-adminPage">
        <h1>信息列表</h1>
        <Search />
        <Table />
        {currentOperation === 'detail' && currentItem && (
          <Modal wrapClassName="g-noBorderHeader" visible={true} onCancel={this.onHideCurrent} footer={null} title="信息详细" width={900}>
            <Detail />
          </Modal>
        )}
        {(currentOperation === 'edit' || currentOperation === 'create') && currentItem && (
          <Modal visible={true} onCancel={this.onHideCurrent} footer={null} title={currentOperation === 'edit' ? '修改信息' : '发布信息'} width={600}>
            <Editor />
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminPost!;
  return {
    currentItem: thisModule.currentItem,
    currentOperation: thisModule.routeParams!.currentOperation,
  };
};

export default connect(mapStateToProps)(Component);
