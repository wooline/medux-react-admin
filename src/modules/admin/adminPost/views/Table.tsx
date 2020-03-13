import {Button, Divider, Dropdown, Icon, Menu, Popconfirm} from 'antd';
import {DStatus, ListItem, ListSearch, ListSummary, Status, UpdateItem} from 'entity/post';
import MTable, {ColumnProps} from 'components/MTable';

import React from 'react';
import {connect} from 'react-redux';

const newItem: Partial<UpdateItem> = {
  id: undefined,
  title: undefined,
  content: undefined,
  editors: undefined,
  editorIds: undefined,
};
interface StoreProps {
  userid: string;
  selectedRows?: ListItem[];
  listSearch?: ListSearch;
  list?: ListItem[];
  listSummary?: ListSummary;
}

interface State {
  confirmModal?: {context: React.ReactNode; callback: Function};
}

class Component extends React.PureComponent<StoreProps & DispatchProp> {
  state: State = {};

  private columns: ColumnProps<ListItem>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '作者',
      dataIndex: 'author',
      width: '9%',
      render: (author: {id: string; name: string}) => <a onClick={() => this.onShowMembers(author.id)}>{author.name}</a>,
    },
    {
      title: '责任编辑',
      dataIndex: 'editors',
      width: '11%',
      className: 'g-items',
      render: (editors: {id: string; name: string}[]) =>
        editors.map(editor => (
          <a key={editor.id} onClick={() => this.onShowMembers(editor.id)}>
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
            <a onClick={() => this.onShowDetail(record)}>详细</a>
            <Divider className={disabled} type="vertical" />
            <a className={disabled} onClick={() => this.onEdit(record)}>
              修改
            </a>
            <Divider className={disabled} type="vertical" />
            <Popconfirm placement="topRight" title="您确定要删除该条数据吗？" onConfirm={() => this.onDeleteList([record.id])}>
              <a className={disabled}>删除</a>
            </Popconfirm>
            <Divider className={disabled} type="vertical" />
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <a onClick={() => this.onChangeStatus(Status.审核通过, [record.id])}>审核通过</a>
                  </Menu.Item>
                  <Menu.Item>
                    <a onClick={() => this.onChangeStatus(Status.审核拒绝, [record.id])}>审核拒绝</a>
                  </Menu.Item>
                </Menu>
              }
            >
              <a className={disabled} onClick={e => e.preventDefault()}>
                审核 <Icon type="down" />
              </a>
            </Dropdown>
          </>
        );
      },
    },
  ];
  onCreate = () => {
    this.props.dispatch(actions.adminPost.execCurrentItem('create', newItem));
  };
  onEdit = (item: ListItem) => {
    this.props.dispatch(actions.adminPost.execCurrentItem('edit', item));
  };
  onShowDetail = (item: ListItem) => {
    this.props.dispatch(actions.adminPost.execCurrentItem('detail', item.id));
  };
  onShowEditor = (item: ListItem) => {
    this.props.dispatch(actions.adminPost.execCurrentItem('edit', item));
  };
  onDeleteList = (ids?: string[]) => {
    this.props.dispatch(actions.adminPost.deleteList(ids));
  };
  onChangeStatus = (status: Status, ids?: string[]) => {
    this.props.dispatch(actions.adminPost.changeListStatus({ids, status}));
  };
  onClearSelect = () => {
    this.props.dispatch(actions.adminPost.putSelectedRows([]));
  };
  onShowMembers = (username: string) => {
    this.props.dispatch(actions.adminMember.searchList({username}, 'none'));
  };
  onRowSelect = (record: ListItem) => {
    const {selectedRows = []} = this.props;
    const rows = selectedRows.filter(item => item.id !== record.id);
    if (rows.length === selectedRows.length) {
      rows.push(record);
    }
    this.props.dispatch(actions.adminPost.putSelectedRows(rows));
  };
  onAllSelect = (checked: boolean, selectRows: ListItem[], changeRows: ListItem[]) => {
    const {selectedRows = []} = this.props;
    let rows: ListItem[] = [];
    if (checked) {
      rows = [...selectedRows, ...changeRows];
    } else {
      const changeRowsKeys: {[key: string]: boolean} = changeRows.reduce((pre, cur) => {
        pre[cur.id] = true;
        return pre;
      }, {});
      rows = selectedRows.filter(item => !changeRowsKeys[item.id]);
    }
    this.props.dispatch(actions.adminPost.putSelectedRows(rows));
  };
  onChange = (pagination: {current: number; pageSize: number}, filter: any, sorter: {field: string; order: any}) => {
    const {current: pageCurrent, pageSize} = pagination;
    this.props.dispatch(
      actions.adminPost.searchList({
        pageCurrent,
        pageSize,
        sorterField: sorter.order && sorter.field,
        sorterOrder: sorter.order,
      })
    );
  };
  batchActions = {
    actions: [
      {key: 'delete', label: '批量删除', confirm: true},
      {key: 'enable', label: '批量审核通过', confirm: true},
      {key: 'disable', label: '批量审核拒绝', confirm: true},
    ],
    onClick: (item: {key: string}) => {
      if (item.key === 'delete') {
        this.onDeleteList();
      } else if (item.key === 'enable') {
        this.onChangeStatus(Status.审核通过);
      } else if (item.key === 'disable') {
        this.onChangeStatus(Status.审核拒绝);
      }
    },
  };
  render() {
    const {list, listSummary, listSearch, selectedRows} = this.props;

    return (
      <div className="g-table">
        <MTable<ListItem>
          topArea={
            <>
              <Button type="primary" icon="plus" onClick={this.onCreate}>
                新建
              </Button>
            </>
          }
          batchActions={this.batchActions}
          onChange={this.onChange as any}
          listSearch={listSearch}
          rowSelection={{
            selectedRows,
            onClear: this.onClearSelect,
            onSelect: this.onRowSelect,
            onSelectAll: this.onAllSelect,
            getCheckboxProps: record => ({disabled: !!record.fixed}),
          }}
          columns={this.columns}
          dataSource={list}
          listSummary={listSummary}
        />
      </div>
    );
  }
  componentWillUnmount() {
    this.props.dispatch(actions.adminPost.putSelectedRows());
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const userid = state.app!.curUser!.id;
  const thisModule = state.adminPost!;
  const {list, listSummary, selectedRows} = thisModule;
  return {userid, list, listSummary, selectedRows, listSearch: thisModule.routeParams?.listSearch};
};

export default connect(mapStateToProps)(Component);
