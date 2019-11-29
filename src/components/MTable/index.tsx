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
  columns: ColumnProps<T>[];
}

interface State {
  showConfirmModal?: boolean;
  confirmModal?: {context: React.ReactNode; callback: Function};
}

class MTable<T> extends React.PureComponent<Props<T>> {
  state: State = {};
  formatColumns = (columns: ColumnProps<T>[], noID: number, sorterField?: string, sorterOrder?: 'descend' | 'ascend'): ColumnProps<T>[] => {
    const transFormText = (text?: string | string[]) => {
      if (!text) return '';
      return typeof text === 'string' ? text : text.join(',');
    };

    return columns.filter(col => {
      if (!col.disable) {
        /**排序状态受控 */
        if (col.sorter && typeof col.sorter === 'boolean' && !col.sortOrder) {
          col.sortOrder = sorterField === col.dataIndex && sorterOrder;
        }
        /**超出一行省略 */
        if (col.ellipsis && !col.render) {
          col.render = (text: string) => <EllipsisText>{transFormText(text)}</EllipsisText>;
        }
        /**时间戳转换 */
        if (col.timestamp && !col.render) {
          col.render = (text: string) => <DateTime date={text} />;
        }
        /**自动生成序号 */
        if (col.no) {
          col.render = (text, record, index: number) => noID + index;
        }
        return col;
      }
      return false;
    });
  };
  returnTotal = (total: number) => {
    return `共${total}条`;
  };
  clearSelection = () => {
    this.props.rowSelection!.onChange!([], []);
  };
  cancelConfirm = () => {
    this.setState({showConfirmModal: false});
  };
  executeConfirm = () => {
    this.state.confirmModal!.callback();
  };
  onBatchAction = (key: string, selectedRow: number) => {
    const {batchActions} = this.props;
    const {actions, onClick} = batchActions!;
    const target = actions.find(item => item.key === key);
    if (target!.confirm) {
      this.setState({
        showConfirmModal: true,
        confirmModal: {
          context: (
            <div className="g-em">
              您确认要 <cite>{target!.label}</cite> 所选择的 <em>{selectedRow}</em> 项吗？
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
  render() {
    const defaultListSummary: BaseListSummary = {pageCurrent: 1, pageSize: 10, totalItems: 0, totalPages: 0};
    const defaultListSearch: BaseListSearch = {sorterOrder: 'ascend', sorterField: ''};
    const {listSummary = defaultListSummary, listSearch = defaultListSearch, rowKey = 'id', bottomArea, batchActions, dataSource, topArea, rowSelection, columns, ...props} = this.props;
    const {pageCurrent, pageSize, totalItems} = listSummary;
    const {sorterField, sorterOrder} = listSearch;
    let selectedRow = 0;
    if (rowSelection && totalItems) {
      rowSelection.columnWidth = 60;
      selectedRow = rowSelection.selectedRowKeys!.length;
    }
    let batchMenu: React.ReactNode = null;
    if (batchActions) {
      if (batchActions.actions.length === 1) {
        batchMenu = (
          <Button icon="align-left" onClick={() => this.onBatchAction(batchActions.actions[0].key, selectedRow)}>
            {batchActions.actions[0].label}
          </Button>
        );
      } else {
        batchMenu = (
          <Dropdown
            overlay={
              <Menu onClick={({key}) => this.onBatchAction(key, selectedRow)}>
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

    return (
      <>
        <div className="tableHeader">
          {topArea}
          {batchMenu && selectedRow > 0 && batchMenu}
          {selectedRow > 0 && (
            <div className="ant-alert-info">
              <Icon type="info-circle" /> 已选择 <a style={{fontWeight: 'bold'}}>{selectedRow}</a> 项，<a onClick={this.clearSelection}>清空选择</a>
            </div>
          )}
        </div>
        <Table<T>
          pagination={{
            showTotal: this.returnTotal,
            showQuickJumper: true,
            pageSizeOptions: ['10', '50', '100'],
            showSizeChanger: true,
            current: pageCurrent,
            pageSize,
            total: totalItems,
          }}
          rowSelection={rowSelection}
          dataSource={dataSource}
          rowKey={rowKey}
          columns={this.formatColumns(columns, (pageCurrent - 1) * pageSize + 1, sorterField, sorterOrder)}
          {...props}
        />
        {bottomArea && <div className="tableFooter">{bottomArea}</div>}
        <Modal visible={!!this.state.showConfirmModal} onOk={this.executeConfirm} onCancel={this.cancelConfirm}>
          {this.state.confirmModal && this.state.confirmModal!.context}
        </Modal>
      </>
    );
  }
}

export default MTable;
