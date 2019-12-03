import {Button, Divider} from 'antd';
import {DGender, DStatus, ListItem, ListSearch, ListSummary} from 'entity/member';
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
          <a onClick={() => this.onShowDetail(record)}>禁用</a>
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
  onSelectedRows = (selectedRowKeys: string[] | number[], selectedRows: ListItem[]) => {
    this.props.dispatch(actions.adminMember.putSelectedRows(selectedRows));
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
    actions: [{key: 'delete', label: '批量删除', confirm: true}],
    onClick: (item: {key: string}) => {
      if (item.key === 'delete') {
        this.onDeleteList();
      }
    },
  };
  render() {
    const {list, listSummary, listSearch, selectedRows = []} = this.props;
    const selectedRowKeys = selectedRows.map(item => item.id);

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
            selectedRowKeys,
            onChange: this.onSelectedRows,
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
      this.props.dispatch(actions.adminMember.searchList({}, 'default'));
    }
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminMember!;
  const {list, listSummary, selectedRows} = thisModule;
  return {list, listSummary, selectedRows, listSearch: thisModule.preRouteParams?.listSearch};
};

export default connect(mapStateToProps)(Component);
