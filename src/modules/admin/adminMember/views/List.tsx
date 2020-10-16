import {ItemDetail, ListSearch} from 'entity/member';
import React, {useCallback} from 'react';

import {ItemView} from 'entity';
import {Modal} from 'antd';
import {connect} from 'react-redux';
import Detail from './Detail';
import Editor from './Editor';
import Search from './Search';
import Table from './Table';

interface StoreProps {
  listSearch: ListSearch;
  itemView: ItemView;
  currentItem?: ItemDetail;
}

const Component: React.FC<StoreProps & DispatchProp> = ({dispatch, listSearch, currentItem, itemView}) => {
  const onHideCurrent = useCallback(() => {
    dispatch(actions.adminMember.closeCurrentItem());
  }, [dispatch]);

  return (
    <div className="g-adminPage">
      <h1>用户列表</h1>
      <Search listSearch={listSearch} />
      <Table />
      {currentItem && itemView === 'detail' && (
        <Modal wrapClassName="g-noBorderHeader" visible onCancel={onHideCurrent} footer={null} title="用户详情" width={900}>
          <Detail primaryMode currentItem={currentItem} />
        </Modal>
      )}
      {currentItem && (itemView === 'edit' || itemView === 'create') && (
        <Modal visible onCancel={onHideCurrent} footer={null} title={itemView === 'edit' ? '修改用户信息' : '新建用户信息'} width={600}>
          <Editor currentItem={currentItem} />
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  const thisModule = state.adminMember!;
  const itemView = thisModule.routeParams!.itemView;
  return {
    currentItem: thisModule[itemView]?.itemDetail,
    listSearch: thisModule.routeParams!.listSearch,
    itemView,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
