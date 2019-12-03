import Detail from './Detail';
import {ListItem} from 'entity/role';
import {Modal} from 'antd';
import React from 'react';
import Search from './Search';
import Table from './SelectorTable';
import {connect} from 'react-redux';

interface StoreProps {
  currentOperation?: 'detail' | 'edit' | 'create';
}
interface OwnProps {
  onChange: (items?: ListItem[]) => void;
}

class Component extends React.PureComponent<StoreProps & DispatchProp & OwnProps> {
  onHideCurrent = () => {
    this.props.dispatch(actions.adminRole.putCurrentItem());
  };
  public render() {
    const {currentOperation} = this.props;
    return (
      <div className="g-selector">
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
  const thisModule = state.adminRole!;
  return {
    currentOperation: thisModule.currentOperation,
  };
};

export default connect(mapStateToProps)(Component);
