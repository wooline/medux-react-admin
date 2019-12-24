import {ListItem, ListSearch, ListSummary, purviewNames} from 'entity/role';
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
      title: '创建时间',
      dataIndex: 'createdTime',
      width: '16%',
      sorter: true,
      timestamp: true,
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
      render: (items: string[] = []) => {
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
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      width: '14%',
      render: (text: string) => text,
    },
    {
      title: '操作',
      dataIndex: 'fixed',
      width: '9%',
      align: 'center',
      className: 'actions',
      render: (id: string, record) => record.purviews && <a onClick={() => this.onShowDetail(record)}>详细</a>,
    },
  ];
  onShowDetail = (item: ListItem) => {
    this.props.dispatch(actions.adminRole.execCurrentItem('detail', item));
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
      actions.adminRole.searchList(
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
  componentDidMount() {
    this.props.dispatch(actions.adminRole.searchList({}, 'default', undefined, true, true));
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminRole!;
  const {list, listSummary} = thisModule;
  return {list, listSummary, listSearch: thisModule.routeParams?.listSearch};
};

export default connect(mapStateToProps)(Component);
