import {ListItem, ListSearch} from 'entity/member';
import React, {useCallback} from 'react';

import Detail from './Detail';
import {ItemDetail} from 'entity/member';
import {ItemView} from 'entity';
import {Modal} from 'antd';
import Search from './Search';
import SelectorTable from './SelectorTable';
import {connect} from 'react-redux';

interface StoreProps {
  listSearch: ListSearch;
  itemView: ItemView;
  currentItem?: ItemDetail;
}
interface OwnProps {
  fixedSearchField?: Partial<ListSearch>;
  defaultSearch?: Partial<ListSearch>;
  limit?: number | [number, number];
  value?: ListItem[];
  onChange?: (items: ListItem[]) => void;
}

const Component: React.FC<StoreProps & OwnProps & DispatchProp> = ({dispatch, listSearch, currentItem, itemView, fixedSearchField, defaultSearch = fixedSearchField, limit, value, onChange}) => {
  const onHideCurrent = useCallback(() => {
    dispatch(actions.adminMember.closeCurrentItem());
  }, [dispatch]);

  return (
    <div className="g-selector">
      <Search listSearch={listSearch} fixedFields={fixedSearchField} defaultSearch={defaultSearch} />
      <SelectorTable onSelectdChange={onChange} selectedRows={value} selectLimit={limit} defaultSearch={defaultSearch} />
      {currentItem && itemView === 'summary' && (
        <Modal wrapClassName="g-noBorderHeader" visible={true} onCancel={onHideCurrent} footer={null} title="用户详情" width={900}>
          <Detail primaryMode={false} currentItem={currentItem} />
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  const thisModule = state.adminMember!;
  const itemView = thisModule.routeParams!.itemView;
  return {
    currentItem: thisModule.itemCase[itemView]?.itemDetail,
    listSearch: thisModule.routeParams!.listSearch,
    itemView,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
