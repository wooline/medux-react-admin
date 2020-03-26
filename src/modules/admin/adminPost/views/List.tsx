import {ItemDetail, ListSearch} from 'entity/post';
import React, {useCallback} from 'react';

import Detail from './Detail';
import Editor from './Editor';
import {Modal} from 'antd';
import Search from './Search';
import Table from './Table';
import {connect} from 'react-redux';

interface StoreProps {
  listSearch: ListSearch;
  itemView: 'detail' | 'edit' | 'create' | '';
  currentItem?: ItemDetail;
}

const Component: React.FC<StoreProps & DispatchProp> = ({dispatch, listSearch, currentItem, itemView}) => {
  const onHideCurrent = useCallback(() => {
    dispatch(actions.adminPost.closeCurrentItem());
  }, [dispatch]);

  return (
    <div className="g-adminPage">
      <h1>信息列表</h1>
      <Search listSearch={listSearch} />
      <Table />
      {currentItem && itemView === 'detail' && (
        <Modal wrapClassName="g-noBorderHeader" visible={true} onCancel={onHideCurrent} footer={null} title="信息详细" width={900}>
          <Detail primaryMode={true} currentItem={currentItem} />
        </Modal>
      )}
      {currentItem && (itemView === 'edit' || itemView === 'create') && (
        <Modal visible={true} onCancel={onHideCurrent} footer={null} title={itemView === 'edit' ? '修改信息' : '发布信息'} width={600}>
          <Editor currentItem={currentItem} />
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminPost!;
  return {
    currentItem: thisModule.currentItem,
    listSearch: thisModule.routeParams!.listSearch,
    itemView: thisModule.routeParams!.itemView,
  };
};

export default connect(mapStateToProps)(Component);
