import {ListItem, ListSearch, ItemDetail} from 'entity/member';
import React, {useCallback} from 'react';

import {ItemView} from 'entity';
import {Modal} from 'antd';
import {connect} from 'react-redux';
import SelectorTable from './SelectorTable';
import Detail from './Detail';
import Search from './Search';

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
        <Modal wrapClassName="g-noBorderHeader" visible onCancel={onHideCurrent} footer={null} title="用户详情" width={900}>
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
    currentItem: thisModule[itemView]?.itemDetail,
    listSearch: thisModule.routeParams!.listSearch,
    itemView,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
