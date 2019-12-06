import {Alert, Button, Dropdown, Icon, Menu, Modal, Table} from 'antd';
import {ColumnProps as BaseColumnProps, TableProps} from 'antd/lib/table';
import {BaseListSearch, BaseListSummary} from 'entity/common';

import DateTime from 'components/DateTime';
import EllipsisText from 'components/EllipsisText';
import React from 'react';
import {reference} from 'common/utils';

reference(Alert);

interface BatchAction {
  key: string;
  label: string;
  confirm?: boolean | string;
}

export type ColumnProps<T> = BaseColumnProps<T> & {timestamp?: boolean; no?: boolean; disable?: boolean};
interface Props<T> extends TableProps<T> {
  batchActions?: {actions: BatchAction[]; onClick: (target: BatchAction) => void};
  topArea?: React.ReactNode;
  bottomArea?: React.ReactNode;
  listSummary?: BaseListSummary;
  listSearch?: BaseListSearch;
  rowSelection?: TableProps<T>['rowSelection'] & {selectedRows?: T[]; onClear?: () => void; selectLimit?: number | [number, number]};
  columns: ColumnProps<T>[];
}

interface State {
  dataSource?: any[];
  showConfirmModal?: boolean;
  confirmModal?: {context: React.ReactNode; callback: Function};
  reviewSelectedMode?: boolean;
}

class MTable<T> extends React.PureComponent<Props<T>> {
  static getDerivedStateFromProps<T>(nextProps: Props<T>, prevState: State): State | null {
    if (nextProps.dataSource !== prevState.dataSource) {
      return {...prevState, reviewSelectedMode: false, dataSource: nextProps.dataSource};
    }
    return null;
  }
  state: State = {};
  formatColumns = (columns: ColumnProps<T>[], noID: number, sorterField?: string, sorterOrder?: 'descend' | 'ascend'): ColumnProps<T>[] => {
    const transFormText = (text?: string | string[]) => {
      if (!text) return '';
      return typeof text === 'string' ? text : text.join(',');
    };

    return columns
      .filter(col => !col.disable)
      .map(col => {
        /**排序状态受控 */
        if (col.sorter && typeof col.sorter === 'boolean' && !col.sortOrder) {
          col = {...col};
          col.sortOrder = sorterField === col.dataIndex && sorterOrder;
        }
        /**超出一行省略 */
        if (col.ellipsis && !col.render) {
          col = {...col};
          col.render = (text: string) => <EllipsisText>{transFormText(text)}</EllipsisText>;
        }
        /**时间戳转换 */
        if (col.timestamp && !col.render) {
          col = {...col};
          col.render = (text: string) => <DateTime date={text} />;
        }
        /**自动生成序号 */
        if (col.no) {
          col = {...col};
          col.render = (text, record, index: number) => noID + index;
        }
        return col;
      });
  };
  returnTotal = (total: number) => {
    return `共${total}条`;
  };
  cancelConfirm = () => {
    this.setState({showConfirmModal: false});
  };
  executeConfirm = () => {
    this.state.confirmModal!.callback();
  };
  genLimitTips = (limit: number) => {
    return (
      <>
        还可选择 <em>{limit}</em> 项，
      </>
    );
  };
  onReviewSelected = () => {
    this.setState({reviewSelectedMode: true});
  };
  onCloseReviewSelected = () => {
    this.setState({reviewSelectedMode: false});
  };
  onBatchAction = (key: string, selectedRowCount: number) => {
    const {batchActions} = this.props;
    const {actions, onClick} = batchActions!;
    const target = actions.find(item => item.key === key);
    if (target!.confirm) {
      this.setState({
        showConfirmModal: true,
        confirmModal: {
          context: (
            <div className="g-em">
              您确认要 <cite>{target!.label}</cite> 所选择的 <em>{selectedRowCount}</em> 项吗？
              {typeof target!.confirm === 'string' ? <div>{target!.confirm}</div> : null}
            </div>
          ),
          callback: () => {
            this.cancelConfirm();
            onClick(target!);
          },
        },
      });
    } else {
      onClick(target!);
    }
  };
  onClearSelected = () => {
    const {rowSelection = {}} = this.props;
    this.setState({reviewSelectedMode: false});
    rowSelection.onClear && rowSelection.onClear();
  };
  render() {
    const defaultListSummary: BaseListSummary = {pageCurrent: 1, pageSize: 10, totalItems: 0, totalPages: 0};
    const defaultListSearch: BaseListSearch = {sorterOrder: 'ascend', sorterField: ''};
    const {reviewSelectedMode, showConfirmModal, confirmModal} = this.state;
    const {listSummary = defaultListSummary, listSearch = defaultListSearch, rowKey = 'id', bottomArea, batchActions, dataSource, topArea, rowSelection, columns, ...props} = this.props;
    const {pageCurrent, pageSize, totalItems} = listSummary;
    const {sorterField, sorterOrder} = listSearch;
    const {selectLimit = 0, selectedRows = []} = rowSelection || {};
    const limitMax = typeof selectLimit === 'number' ? selectLimit : selectLimit[1];
    if (rowSelection) {
      rowSelection.columnWidth = 60;
      rowSelection.type = limitMax === 1 ? 'radio' : 'checkbox';
      if (!rowSelection.selectedRowKeys) {
        rowSelection.selectedRowKeys = selectedRows.map(item => item[rowKey as string] || item['id']);
      }
    }
    const selectedCount = selectedRows.length;
    let batchMenu: React.ReactNode = null;

    if (batchActions) {
      if (batchActions.actions.length === 1) {
        batchMenu = (
          <Button icon="align-left" onClick={() => this.onBatchAction(batchActions.actions[0].key, selectedCount)}>
            {batchActions.actions[0].label}
          </Button>
        );
      } else {
        batchMenu = (
          <Dropdown
            overlay={
              <Menu onClick={({key}) => this.onBatchAction(key, selectedCount)}>
                {batchActions.actions.map(action => (
                  <Menu.Item key={action.key}>{action.label}</Menu.Item>
                ))}
              </Menu>
            }
          >
            <Button>
              批量操作 <Icon type="down" />
            </Button>
          </Dropdown>
        );
      }
    }
    const cols = this.formatColumns(columns, (pageCurrent - 1) * pageSize + 1, sorterField, sorterOrder);

    return (
      <>
        <div className="tableHeader">
          {topArea}
          {batchMenu && selectedCount > 0 && batchMenu}
          {reviewSelectedMode && (
            <Button onClick={this.onCloseReviewSelected} type="dashed" icon="left">
              返回列表
            </Button>
          )}
          {selectedCount > 0 && (
            <div className="ant-alert-info">
              <Icon type="info-circle" /> 已选择{' '}
              <a onClick={this.onReviewSelected} style={{fontWeight: 'bold'}}>
                {selectedCount}
              </a>{' '}
              项，
              {limitMax !== 0 && limitMax !== 1 ? this.genLimitTips(limitMax - selectedCount) : ''}
              <a onClick={reviewSelectedMode ? this.onCloseReviewSelected : this.onReviewSelected}>{reviewSelectedMode ? '返回' : '查看'}</a> 或 <a onClick={this.onClearSelected}>清空选择</a>
            </div>
          )}
        </div>
        <Table<T>
          pagination={
            reviewSelectedMode
              ? false
              : {
                  showTotal: this.returnTotal,
                  showQuickJumper: true,
                  pageSizeOptions: ['10', '50', '100'],
                  showSizeChanger: true,
                  current: pageCurrent,
                  pageSize,
                  total: totalItems,
                }
          }
          rowSelection={rowSelection}
          dataSource={reviewSelectedMode ? selectedRows : dataSource}
          rowKey={rowKey}
          columns={cols}
          {...props}
        />
        {bottomArea && <div className="tableFooter">{bottomArea}</div>}
        <Modal visible={!!showConfirmModal} onOk={this.executeConfirm} onCancel={this.cancelConfirm}>
          {confirmModal && confirmModal!.context}
        </Modal>
      </>
    );
  }
}

export default MTable;
