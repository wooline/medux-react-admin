import Detail from './Detail';
import Editor from './Editor';
import {Modal} from 'antd';
import React from 'react';
import Search from './Search';
import Table from './Table';
import {connect} from 'react-redux';

interface StoreProps {
  currentOperation?: 'detail' | 'edit' | 'create';
}

class Component extends React.PureComponent<StoreProps & DispatchProp> {
  onHideCurrent = () => {
    this.props.dispatch(actions.adminMember.execCurrentItem());
  };
  public render() {
    const {currentOperation} = this.props;
    return (
      <div className="g-adminPage">
        <h1>{pageNames[location.pathname]}</h1>
        <Search />
        <Table />
        <Modal visible={currentOperation === 'detail'} onCancel={this.onHideCurrent} footer={null} title="用户详情" width={900}>
          <Detail />
        </Modal>
        <Modal
          visible={currentOperation === 'edit' || currentOperation === 'create'}
          onCancel={this.onHideCurrent}
          footer={null}
          title={currentOperation === 'edit' ? '修改用户信息' : '新建用户信息'}
          width={600}
        >
          <Editor />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminMember!;
  return {
    currentOperation: thisModule.routeParams!.currentOperation,
  };
};

export default connect(mapStateToProps)(Component);
