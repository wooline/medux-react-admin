import {Button, Divider, Popconfirm} from 'antd';
import {DStatus, ListItem, ListSearch, ListSummary, Status, UpdateItem} from 'entity/article';
import MTable, {ColumnProps} from 'components/MTable';

import React from 'react';
import {connect} from 'react-redux';

const newItem: Partial<UpdateItem> = {
  id: undefined,
  title: undefined,
  cover: undefined,
  content: undefined,
  photos: undefined,
  editors: undefined,
  editorIds: undefined,
};
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
      width: '200px',
      className: 'actions',
      render: (id: string, record) => (
        <>
          <a onClick={() => this.onShowDetail(record)}>详细</a>
          <Divider type="vertical" />
          <a>审核</a>
          <Divider type="vertical" />
          <a onClick={() => this.onEdit(record)}>修改</a>
          <Divider type="vertical" />
          <Popconfirm placement="topRight" title="您确定要删除该条数据吗？" onConfirm={() => this.onDeleteList([record.id])}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];
  onCreate = () => {
    this.props.dispatch(actions.adminArticle.execCurrentItem('create', newItem));
  };
  onEdit = (item: ListItem) => {
    this.props.dispatch(actions.adminArticle.execCurrentItem('edit', item));
  };
  onShowDetail = (item: ListItem) => {
    this.props.dispatch(actions.adminArticle.execCurrentItem('detail', item.id));
  };
  onShowEditor = (item: ListItem) => {
    this.props.dispatch(actions.adminArticle.execCurrentItem('edit', item));
  };
  onDeleteList = (ids?: string[]) => {
    this.props.dispatch(actions.adminArticle.deleteList(ids));
  };
  onChangeStatus = (status: Status, ids?: string[]) => {
    this.props.dispatch(actions.adminArticle.changeListStatus({ids, status}));
  };
  onClearSelect = () => {
    this.props.dispatch(actions.adminArticle.putSelectedRows([]));
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
    this.props.dispatch(actions.adminArticle.putSelectedRows(rows));
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
    this.props.dispatch(actions.adminArticle.putSelectedRows(rows));
  };
  onChange = (pagination: {current: number; pageSize: number}, filter: any, sorter: {field: string; order: any}) => {
    const {current: pageCurrent, pageSize} = pagination;
    this.props.dispatch(
      actions.adminArticle.searchList({
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
          }}
          columns={this.columns}
          dataSource={list}
          listSummary={listSummary}
        />
      </div>
    );
  }
  componentWillUnmount() {
    this.props.dispatch(actions.adminArticle.putSelectedRows());
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminArticle!;
  const {list, listSummary, selectedRows} = thisModule;
  return {list, listSummary, selectedRows, listSearch: thisModule.routeParams?.listSearch};
};

export default connect(mapStateToProps)(Component);
