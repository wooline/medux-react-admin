import {DStatus, ListItem, ListSearch, ListSummary} from 'entity/member';
import MTable, {ColumnProps} from 'components/MTable';
import React, {useMemo} from 'react';

import {connect} from 'react-redux';
import useSelector from 'hooks/useSelector';

interface StoreProps {
  listSearch: ListSearch;
  list?: ListItem[];
  listSummary?: ListSummary;
}

interface OwnProps {
  defaultSearch?: ListSearch;
  selectLimit?: number | [number, number];
  selectedRows?: ListItem[];
  onSelectdChange?: (items: ListItem[]) => void;
}

const Component: React.FC<StoreProps & OwnProps & DispatchProp> = ({dispatch, onSelectdChange, selectLimit, selectedRows, list, listSearch, listSummary, defaultSearch}) => {
  const {onShowDetail, rowSelection, onChange} = useSelector(dispatch, actions.adminMember, listSearch, defaultSearch, selectedRows, onSelectdChange, selectLimit);
  const columns = useMemo<ColumnProps<ListItem>[]>(
    () => [
      {
        title: '用户名',
        dataIndex: 'username',
        width: '11%',
      },
      {
        title: '呢称',
        dataIndex: 'nickname',
        width: '11%',
      },
      {
        title: '角色',
        dataIndex: 'roleName',
        width: '12%',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        ellipsis: true,
      },
      {
        title: '最后登录',
        dataIndex: 'loginTime',
        width: '18%',
        sorter: true,
        timestamp: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: '6%',
        render: (status: string) => <span className={'status-' + status}>{DStatus.keyToName[status]}</span>,
      },
      {
        title: '操作',
        dataIndex: 'fixed',
        width: '9%',
        align: 'center',
        className: 'actions',
        render: (id: string, record) => <a onClick={() => onShowDetail(record.id)}>详细</a>,
      },
    ],
    [onShowDetail]
  );

  return (
    <div className="g-table">
      <MTable<ListItem> scroll={{y: 410}} onChange={onChange as any} listSearch={listSearch} rowSelection={rowSelection} columns={columns} dataSource={list} listSummary={listSummary} />
    </div>
  );
};

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminMember!;
  const {list, listSummary} = thisModule;
  return {list, listSummary, listSearch: thisModule.routeParams?.listSearch!};
};

export default connect(mapStateToProps)(React.memo(Component));
