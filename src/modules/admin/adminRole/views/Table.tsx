import {Button, Divider, Popconfirm} from 'antd';
import {ListItem, ListSummary, UpdateItem, purviewNames} from 'entity/role';
import MTable, {ColumnProps} from 'components/MTable';

import React from 'react';
import {connect} from 'react-redux';

const newItem: UpdateItem = {
  id: '',
  roleName: '',
  remark: '',
  purviews: [],
};
interface StoreProps {
  selectedRows?: ListItem[];
  list?: ListItem[];
  listSummary?: ListSummary;
}

interface State {
  confirmModal?: {context: React.ReactNode; callback: Function};
}
class Component extends React.PureComponent<StoreProps & DispatchProp> {
  state: State = {};
  columns: ColumnProps<ListItem>[] = [
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
      width: '10%',
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
          .map(item => purviewNames[item] + '模块')
          .join('，');
      },
    },
    {
      title: '人数',
      dataIndex: 'owner',
      align: 'center',
      width: '10%',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: '11%',
      timestamp: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      width: '15%',
    },
    {
      title: '操作',
      dataIndex: 'fixed',
      width: '13%',
      align: 'center',
      className: 'actions',
      render: (id: string, record) => (
        <>
          <a onClick={() => this.onShowDetail(record)}>详细</a>
          <Divider className={record.fixed ? 'disable' : ''} type="vertical" />
          <a onClick={() => this.onShowEditor(record)} className={record.fixed ? 'disable' : ''}>
            修改
          </a>
          <Divider className={record.fixed ? 'disable' : ''} type="vertical" />
          <Popconfirm placement="topRight" title="您确定要删除该条数据吗？" onConfirm={() => this.onDeleteList([record.id])}>
            <a className={record.fixed ? 'disable' : ''}>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];
  onCreate = () => {
    this.props.dispatch(actions.adminRole.putCurrentItem('create', newItem));
  };
  onShowDetail = (item: ListItem) => {
    this.props.dispatch(actions.adminRole.putCurrentItem('detail', item));
  };
  onShowEditor = (item: ListItem) => {
    this.props.dispatch(actions.adminRole.putCurrentItem('edit', item));
  };
  onDeleteList = (ids?: string[]) => {
    this.props.dispatch(actions.adminRole.deleteList(ids));
  };
  onClearSelect = () => {
    this.props.dispatch(actions.adminRole.putSelectedRows([]));
  };
  onRowSelect = (record: ListItem) => {
    const {selectedRows = []} = this.props;
    const rows = selectedRows.filter(item => item.id !== record.id);
    if (rows.length === selectedRows.length) {
      rows.push(record);
    }
    this.props.dispatch(actions.adminRole.putSelectedRows(rows));
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
    this.props.dispatch(actions.adminRole.putSelectedRows(rows));
  };
  onChange = (pagination: {current: number; pageSize: number}) => {
    const {current: pageCurrent, pageSize} = pagination;
    this.props.dispatch(
      actions.adminRole.searchList(
        {
          pageCurrent,
          pageSize,
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
    const {list, listSummary, selectedRows} = this.props;

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
  componentDidMount() {
    if (!this.props.list) {
      this.props.dispatch(actions.adminRole.searchList({}, 'current'));
    }
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const {list, listSummary, selectedRows} = state.adminRole!;
  return {list, listSummary, selectedRows};
};

export default connect(mapStateToProps)(Component);
