import Detail from './Detail';
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
        <Modal visible={currentOperation === 'detail'} onCancel={this.onHideCurrent} footer={null} title="角色详情" width={900}>
          <Detail />
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
