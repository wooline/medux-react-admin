import {ItemDetail, ListSearch} from 'entity/role';
import React, {useCallback} from 'react';

import Detail from './Detail';
import Editor from './Editor';
import {ItemView} from 'entity';
import {Modal} from 'antd';
import Search from './Search';
import Table from './Table';
import {connect} from 'react-redux';

interface StoreProps {
  listSearch: ListSearch;
  itemView: ItemView;
  currentItem?: ItemDetail;
}

const Component: React.FC<StoreProps & DispatchProp> = ({dispatch, listSearch, currentItem, itemView}) => {
  const onHideCurrent = useCallback(() => {
    dispatch(actions.adminRole.closeCurrentItem());
  }, [dispatch]);

  return (
    <div className="g-adminPage">
      <h1>角色列表</h1>
      <Search listSearch={listSearch} />
      <Table />
      {currentItem && itemView === 'detail' && (
        <Modal wrapClassName="g-noBorderHeader" visible={true} onCancel={onHideCurrent} footer={null} title="角色详情" width={900}>
          <Detail primaryMode={true} currentItem={currentItem} />
        </Modal>
      )}
      {currentItem && (itemView === 'edit' || itemView === 'create') && (
        <Modal visible={true} onCancel={onHideCurrent} footer={null} title={itemView === 'edit' ? '修改角色' : '新建角色'} width={900}>
          <Editor currentItem={currentItem} />
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  const thisModule = state.adminRole!;
  const itemView = thisModule.routeParams!.itemView;
  return {
    currentItem: thisModule.itemCase[itemView]?.itemDetail,
    listSearch: thisModule.routeParams!.listSearch,
    itemView,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
