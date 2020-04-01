import {Button, Divider, Popconfirm} from 'antd';
import {ListItem, ListSearch, ListSummary, purviewNames} from 'entity/role';
import MTable, {ColumnProps} from 'components/MTable';
import React, {useCallback, useMemo} from 'react';

import {PlusOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import useMTable from 'hooks/useMTable';

const plusOutlined = <PlusOutlined />;

const getCheckboxProps = (record: ListItem) => ({disabled: !!record.fixed});
interface StoreProps {
  listSearch: ListSearch;
  selectedRows?: ListItem[];
  list?: ListItem[];
  listSummary?: ListSummary;
}

const Component: React.FC<StoreProps & DispatchProp> = ({dispatch, listSearch, selectedRows, list, listSummary}) => {
  const {onChange, onDeleteList, onShowEditor, onShowDetail, onCreate, rowSelection} = useMTable(dispatch, actions.adminRole, listSearch, selectedRows, getCheckboxProps);
  const onShowMembers = useCallback(
    (item: ListItem) => {
      dispatch(actions.adminMember.noneListSearch({role: {id: item.id, name: item.roleName}}));
    },
    [dispatch]
  );
  const columns = useMemo<ColumnProps<ListItem>[]>(
    () => [
      {
        title: 'No.',
        dataIndex: 'id',
        width: '5%',
        align: 'center',
        no: true,
      },
      {
        title: '角色名称',
        dataIndex: 'roleName',
        width: '15%',
      },
      {
        title: '拥有权限',
        dataIndex: 'purviews',
        ellipsis: true,
        render: (items: string[]) => {
          const resources = items.reduce((pre, cur) => {
            pre[cur.split('.')[0]] = true;
            return pre;
          }, {});
          return Object.keys(resources)
            .map((item) => purviewNames[item] + '模块')
            .join('，');
        },
      },
      {
        title: '人数',
        dataIndex: 'owner',
        align: 'center',
        width: '10%',
        render: (val: number, record) => <a onClick={() => onShowMembers(record)}>{val}</a>,
      },
      {
        title: '创建时间',
        dataIndex: 'createdTime',
        width: '11%',
        sorter: true,
        timestamp: true,
      },
      {
        title: '备注',
        dataIndex: 'remark',
        ellipsis: true,
        width: '15%',
        render: (text: string) => text,
      },
      {
        title: '操作',
        dataIndex: 'fixed',
        width: '13%',
        align: 'center',
        className: 'actions',
        render: (fixed: string, record) => {
          const disabled = fixed ? 'disable' : '';
          return (
            <>
              <a onClick={() => onShowDetail(record)}>详细</a>
              <Divider className={disabled} type="vertical" />
              <a onClick={() => onShowEditor(record)} className={disabled}>
                修改
              </a>
              <Divider className={disabled} type="vertical" />
              <Popconfirm placement="topRight" title="您确定要删除该条数据吗？" onConfirm={() => onDeleteList([record.id])}>
                <a className={disabled}>删除</a>
              </Popconfirm>
            </>
          );
        },
      },
    ],
    [onDeleteList, onShowDetail, onShowEditor, onShowMembers]
  );

  const batchActions = useMemo(
    () => ({
      actions: [{key: 'delete', label: '批量删除', confirm: true}],
      onClick: (item: {key: string}) => {
        if (item.key === 'delete') {
          onDeleteList();
        }
      },
    }),
    [onDeleteList]
  );
  const topArea = useMemo(
    () => (
      <>
        <Button type="primary" icon={plusOutlined} onClick={onCreate}>
          新建
        </Button>
      </>
    ),
    [onCreate]
  );

  return (
    <div className="g-table">
      <MTable<ListItem>
        topArea={topArea}
        batchActions={batchActions}
        onChange={onChange as any}
        listSearch={listSearch}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={list}
        listSummary={listSummary}
      />
    </div>
  );
};

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  const thisModule = state.adminRole!;
  const {list, listSummary, selectedRows} = thisModule;
  return {list, listSummary, selectedRows, listSearch: thisModule.routeParams?.listSearch!};
};

export default connect(mapStateToProps)(React.memo(Component));
