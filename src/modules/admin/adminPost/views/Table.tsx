import {Button, Divider, Dropdown, Menu, Popconfirm} from 'antd';
import {DStatus, ListItem, ListSearch, ListSummary, Status, UpdateItem} from 'entity/post';
import {DownOutlined, PlusOutlined} from '@ant-design/icons';
import MTable, {ColumnProps} from 'components/MTable';
import React, {useCallback, useMemo} from 'react';

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
  const {onChange, onDeleteList, onShowEditor, onShowDetail, onCreate, rowSelection, onChangeStatus} = useMTable(dispatch, actions.adminPost, listSearch, selectedRows, getCheckboxProps);
  const onShowMembers = useCallback(
    (username: string) => {
      dispatch(actions.adminMember.noneListSearch({username}));
    },
    [dispatch]
  );
  const columns = useMemo<ColumnProps<ListItem>[]>(
    () => [
      {
        title: '标题',
        dataIndex: 'title',
        ellipsis: true,
      },
      {
        title: '作者',
        dataIndex: 'author',
        width: '9%',
        render: (author: {id: string; name: string}) => <a onClick={() => onShowMembers(author.id)}>{author.name}</a>,
      },
      {
        title: '责任编辑',
        dataIndex: 'editors',
        width: '11%',
        className: 'g-items',
        render: (editors: {id: string; name: string}[]) =>
          editors.map(editor => (
            <a key={editor.id} onClick={() => onShowMembers(editor.id)}>
              {editor.name}
            </a>
          )),
      },
      {
        title: '发表时间',
        dataIndex: 'createdTime',
        width: '16%',
        sorter: true,
        timestamp: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: '8%',
        render: (status: string) => <span className={'status-' + status}>{DStatus.keyToName[status]}</span>,
      },
      {
        title: '操作',
        dataIndex: 'fixed',
        width: '215px',
        className: 'actions',
        render: (fixed: string, record) => {
          const disabled = fixed ? 'disable' : '';

          return (
            <>
              <a onClick={() => onShowDetail(record)}>详细</a>
              <Divider className={disabled} type="vertical" />
              <a className={disabled} onClick={() => onShowEditor(record)}>
                修改
              </a>
              <Divider className={disabled} type="vertical" />
              <Popconfirm placement="topRight" title="您确定要删除该条数据吗？" onConfirm={() => onDeleteList([record.id])}>
                <a className={disabled}>删除</a>
              </Popconfirm>
              <Divider className={disabled} type="vertical" />
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <a onClick={() => onChangeStatus(Status.审核通过, [record.id])}>审核通过</a>
                    </Menu.Item>
                    <Menu.Item>
                      <a onClick={() => onChangeStatus(Status.审核拒绝, [record.id])}>审核拒绝</a>
                    </Menu.Item>
                  </Menu>
                }
              >
                <a className={disabled} onClick={e => e.preventDefault()}>
                  审核 <DownOutlined />
                </a>
              </Dropdown>
            </>
          );
        },
      },
    ],
    [onChangeStatus, onDeleteList, onShowDetail, onShowEditor, onShowMembers]
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
          onChangeStatus(Status.审核通过);
        } else if (item.key === 'disable') {
          onChangeStatus(Status.审核拒绝);
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

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminPost!;
  const {list, listSummary, selectedRows} = thisModule;
  return {list, listSummary, selectedRows, listSearch: thisModule.routeParams?.listSearch!};
};

export default connect(mapStateToProps)(React.memo(Component));
