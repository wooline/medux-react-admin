import {Button, Divider, Popconfirm} from 'antd';
import {DGender, DStatus, ListItem, ListSearch, ListSummary, Status, UpdateItem} from 'entity/member';
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
  const {onChange, onDeleteList, onShowEditor, onShowDetail, onCreate, rowSelection, onChangeStatus} = useMTable(dispatch, actions.adminMember, listSearch, selectedRows, getCheckboxProps);
  const onShowPosts = useCallback(
    (author: string) => {
      dispatch(actions.adminPost.noneListSearch({author}));
    },
    [dispatch]
  );
  const columns = useMemo<ColumnProps<ListItem>[]>(
    () => [
      {
        title: '用户名',
        dataIndex: 'username',
        width: '10%',
      },
      {
        title: '呢称',
        dataIndex: 'nickname',
        width: '9%',
      },
      {
        title: '角色',
        dataIndex: 'roleName',
        width: '10%',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        align: 'center',
        width: '6%',
        render: (gender: string) => DGender.keyToName[gender],
      },
      {
        title: '信息',
        dataIndex: 'post',
        align: 'center',
        sorter: true,
        width: '8%',
        render: (postNum, record) => <a onClick={() => onShowPosts(record.id)}>{postNum}</a>,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        ellipsis: true,
      },
      {
        title: '注册时间',
        dataIndex: 'createdTime',
        width: '11%',
        sorter: true,
        timestamp: true,
      },
      {
        title: '最后登录',
        dataIndex: 'loginTime',
        width: '11%',
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
        width: '200px',
        className: 'actions',
        render: (fixed: string, record) => {
          const disabled = fixed ? 'disable' : '';
          return (
            <>
              <a onClick={() => onShowDetail(record.id)}>详细</a>
              <Divider className={disabled} type="vertical" />
              <a className={disabled} onClick={() => onChangeStatus(record.status === Status.启用 ? Status.禁用 : Status.启用, [record.id])}>
                {record.status === Status.启用 ? '禁用' : '启用'}
              </a>
              <Divider className={disabled} type="vertical" />
              <a className={disabled} onClick={() => onShowEditor(record.id)}>
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
    [onChangeStatus, onDeleteList, onShowDetail, onShowEditor, onShowPosts]
  );

  const batchActions = useMemo(
    () => ({
      actions: [
        {key: 'delete', label: '批量删除', confirm: true},
        {key: 'enable', label: '批量启用', confirm: true},
        {key: 'disable', label: '批量禁用', confirm: true},
      ],
      onClick: (item: {key: string}) => {
        if (item.key === 'delete') {
          onDeleteList();
        } else if (item.key === 'enable') {
          onChangeStatus(Status.启用);
        } else if (item.key === 'disable') {
          onChangeStatus(Status.禁用);
        }
      },
    }),
    [onDeleteList, onChangeStatus]
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
  const thisModule = state.adminMember!;
  const {list, listSummary, selectedRows} = thisModule;
  return {list, listSummary, selectedRows, listSearch: thisModule.routeParams?.listSearch!};
};

export default connect(mapStateToProps)(React.memo(Component));
