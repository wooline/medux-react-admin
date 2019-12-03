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
  onShowDetail = (item: ListItem) => {
    this.props.dispatch(actions.adminRole.putCurrentItem('detail', item));
  };
  onSelectedRows = (selectedRowKeys: string[] | number[], selectedRows: ListItem[]) => {
    this.props.dispatch(actions.adminRole.putSelectedRows(selectedRows));
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
  render() {
    const {list, listSummary, selectedRows = []} = this.props;
    const selectedRowKeys = selectedRows.map(item => item.id);

    const columns: ColumnProps<ListItem>[] = [
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
        title: '备注',
        dataIndex: 'remark',
        ellipsis: true,
        width: '14%',
      },
      {
        title: '操作',
        dataIndex: 'fixed',
        width: '9%',
        align: 'center',
        className: 'actions',
        render: (id: string, record) => (
          <>
            <a onClick={() => this.onShowDetail(record)}>详细</a>
          </>
        ),
      },
    ];
    return (
      <div className="g-table">
        <MTable<ListItem>
          topArea={<>请选择一项</>}
          onChange={this.onChange as any}
          rowSelection={{
            selectedRowKeys,
            onChange: this.onSelectedRows,
            getCheckboxProps: record => ({disabled: !!record.fixed}),
          }}
          columns={columns}
          dataSource={list}
          listSummary={listSummary}
        />
      </div>
    );
  }
  componentDidMount() {
    this.props.dispatch(actions.adminRole.searchList({}, 'default', true, true));
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const {list, listSummary, selectedRows} = state.adminRole!;
  return {list, listSummary, selectedRows};
};

export default connect(mapStateToProps)(Component);
