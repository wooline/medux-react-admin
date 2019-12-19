import Detail from './Detail';
import {ListItem} from 'entity/role';
import {Modal} from 'antd';
import React from 'react';
import Search from './Search';
import SelectorTable from './SelectorTable';
import {connect} from 'react-redux';

interface StoreProps {
  currentOperation?: 'detail' | 'edit' | 'create';
}
interface OwnProps {
  limit?: number | [number, number];
  value?: ListItem[];
  onChange?: (items: ListItem[]) => void;
}

class Component extends React.PureComponent<StoreProps & DispatchProp & OwnProps> {
  onHideCurrent = () => {
    this.props.dispatch(actions.adminRole.execCurrentItem());
  };
  public render() {
    const {currentOperation, onChange, limit, value} = this.props;
    return (
      <div className="g-selector">
        <Search disableRoute={true} />
        <SelectorTable onSelectdChange={onChange} selectedRows={value} selectLimit={limit} />
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
    currentOperation: thisModule.routeParams!.currentOperation,
  };
};

export default connect(mapStateToProps)(Component);
