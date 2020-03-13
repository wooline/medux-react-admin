import Detail from './Detail';
import Editor from './Editor';
import {ItemDetail} from 'entity/role';
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
    this.props.dispatch(actions.adminRole.execCurrentItem());
  };
  public render() {
    const {currentOperation, currentItem} = this.props;

    return (
      <div className="g-adminPage">
        <h1>角色列表</h1>
        <Search />
        <Table />
        {currentOperation === 'detail' && currentItem && (
          <Modal wrapClassName="g-noBorderHeader" visible={currentOperation === 'detail'} onCancel={this.onHideCurrent} footer={null} title="角色详情" width={900}>
            <Detail />
          </Modal>
        )}
        {(currentOperation === 'edit' || currentOperation === 'create') && currentItem && (
          <Modal
            visible={currentOperation === 'edit' || currentOperation === 'create'}
            onCancel={this.onHideCurrent}
            footer={null}
            title={currentOperation === 'edit' ? '修改角色' : '新建角色'}
            width={900}
          >
            <Editor />
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminRole!;
  return {
    currentItem: thisModule.currentItem,
    currentOperation: thisModule.routeParams!.currentOperation,
  };
};

export default connect(mapStateToProps)(Component);
