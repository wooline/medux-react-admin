import {ListItem, ListSearch} from 'entity/member';

import Detail from './Detail';
import {ItemDetail} from 'entity/member';
import {Modal} from 'antd';
import React from 'react';
import Search from './Search';
import SelectorTable from './SelectorTable';
import {connect} from 'react-redux';

interface StoreProps {
  currentItem?: ItemDetail;
  currentOperation?: 'detail' | 'edit' | 'create';
}
interface OwnProps {
  fixedSearchField?: Partial<ListSearch>;
  defaultSearch?: Partial<ListSearch>;
  limit?: number | [number, number];
  value?: ListItem[];
  onChange?: (items: ListItem[]) => void;
}

class Component extends React.PureComponent<StoreProps & DispatchProp & OwnProps> {
  onHideCurrent = () => {
    this.props.dispatch(actions.adminMember.execCurrentItem());
  };
  public render() {
    const {currentOperation, fixedSearchField, defaultSearch = fixedSearchField, onChange, limit, value, currentItem} = this.props;
    return (
      <div className="g-selector">
        <Search disableRoute={true} fixedFields={fixedSearchField} defaultSearch={defaultSearch} />
        <SelectorTable onSelectdChange={onChange} selectedRows={value} selectLimit={limit} />
        {currentOperation === 'detail' && currentItem && (
          <Modal wrapClassName="g-noBorderHeader" visible={true} onCancel={this.onHideCurrent} footer={null} title="用户详情" width={900}>
            <Detail />
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminMember!;
  return {
    currentItem: thisModule.currentItem,
    currentOperation: thisModule.routeParams?.currentOperation,
  };
};

export default connect(mapStateToProps)(Component);
