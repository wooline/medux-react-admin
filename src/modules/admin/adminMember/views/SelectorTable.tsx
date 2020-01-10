import {DStatus, ListItem, ListSearch, ListSummary} from 'entity/member';
import MTable, {ColumnProps} from 'components/MTable';

import React from 'react';
import {connect} from 'react-redux';

interface StoreProps {
  listSearch?: ListSearch;
  list?: ListItem[];
  listSummary?: ListSummary;
}

interface OwnProps {
  selectLimit?: number | [number, number];
  selectedRows?: ListItem[];
  onSelectdChange?: (items: ListItem[]) => void;
}

class Component extends React.PureComponent<StoreProps & DispatchProp & OwnProps> {
  columns: ColumnProps<ListItem>[] = [
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
      render: (id: string, record) => <a onClick={() => this.onShowDetail(record)}>详细</a>,
    },
  ];
  onShowDetail = (item: ListItem) => {
    this.props.dispatch(actions.adminMember.execCurrentItem('detail', item, undefined, true));
  };
  onClearSelect = () => {
    this.props.onSelectdChange && this.props.onSelectdChange([]);
  };
  onRowSelect = (record: ListItem) => {
    const {selectedRows = []} = this.props;
    const rows = selectedRows.filter(item => item.id !== record.id);
    if (rows.length === selectedRows.length) {
      rows.push(record);
    }
    this.props.onSelectdChange && this.props.onSelectdChange(rows);
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
    this.props.onSelectdChange && this.props.onSelectdChange(rows);
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
        'current',
        'Selector',
        true
      )
    );
  };
  render() {
    const {list, listSummary, selectLimit, selectedRows, listSearch} = this.props;

    return (
      <div className="g-table">
        <MTable<ListItem>
          scroll={{y: 410}}
          onChange={this.onChange as any}
          listSearch={listSearch}
          rowSelection={{
            selectedRows,
            selectLimit,
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
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminMember!;
  const {list, listSummary} = thisModule;
  return {list, listSummary, listSearch: thisModule.routeParams?.listSearch};
};

export default connect(mapStateToProps)(Component);
