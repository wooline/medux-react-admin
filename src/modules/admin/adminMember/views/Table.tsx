import {Button, Divider} from 'antd';
import {DGender, DStatus, ListItem, ListSearch, ListSummary, Status} from 'entity/member';
import MTable, {ColumnProps} from 'components/MTable';

import React from 'react';
import {connect} from 'react-redux';

interface StoreProps {
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
      title: '用户名',
      dataIndex: 'username',
      width: '10%',
    },
    {
      title: '呢称',
      dataIndex: 'nickname',
      width: '10%',
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
      title: '年龄',
      dataIndex: 'age',
      align: 'center',
      width: '6%',
    },
    {
      title: 'email',
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
      width: '160px',
      className: 'actions',
      render: (id: string, record) => (
        <>
          <a onClick={() => this.onShowDetail(record)}>详细</a>
          <Divider type="vertical" />
          <a onClick={() => this.onShowDetail(record)}>{record.status === Status.启用 ? '禁用' : '启用'}</a>
          <Divider type="vertical" />
          <a onClick={() => this.onShowDetail(record)}>修改</a>
          <br />
          <a onClick={() => this.onShowDetail(record)}>重置密码</a>
        </>
      ),
    },
  ];
  onShowDetail = (item: ListItem) => {
    this.props.dispatch(actions.adminMember.putCurrentItem('detail', item));
  };
  onShowEditor = (item: ListItem) => {
    this.props.dispatch(actions.adminMember.putCurrentItem('edit', item));
  };
  onDeleteList = (ids?: string[]) => {
    this.props.dispatch(actions.adminMember.deleteList(ids));
  };
  onClearSelect = () => {
    this.props.dispatch(actions.adminMember.putSelectedRows([]));
  };
  onRowSelect = (record: ListItem) => {
    const {selectedRows = []} = this.props;
    const rows = selectedRows.filter(item => item.id !== record.id);
    if (rows.length === selectedRows.length) {
      rows.push(record);
    }
    this.props.dispatch(actions.adminMember.putSelectedRows(rows));
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
    this.props.dispatch(actions.adminMember.putSelectedRows(rows));
  };
  onChange = (pagination: {current: number; pageSize: number}, filter: any, sorter: {field: string; order: any}) => {
    const {current: pageCurrent, pageSize} = pagination;
    this.props.dispatch(
      actions.adminMember.searchList(
        {
          pageCurrent,
          pageSize,
          sorterField: sorter.order && sorter.field,
          sorterOrder: sorter.order,
        },
        'current'
      )
    );
  };
  batchActions = {
    actions: [
      {key: 'delete', label: '批量删除', confirm: true},
      {key: 'enable', label: '批量启用', confirm: true},
      {key: 'disable', label: '批量禁用', confirm: true},
    ],
    onClick: (item: {key: string}) => {
      if (item.key === 'delete') {
        this.onDeleteList();
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
              <Button type="primary" icon="plus">
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
          }}
          columns={this.columns}
          dataSource={list}
          listSummary={listSummary}
        />
      </div>
    );
  }
  componentDidMount() {
    if (!this.props.list) {
      this.props.dispatch(actions.adminMember.searchList({}, 'current'));
    }
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminMember!;
  const {list, listSummary, selectedRows} = thisModule;
  return {list, listSummary, selectedRows, listSearch: thisModule.preRouteParams?.listSearch};
};

export default connect(mapStateToProps)(Component);
