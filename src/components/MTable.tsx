import {Alert, Button, Dropdown, Menu, Modal, Table} from 'antd';
import {AlignLeftOutlined, DownOutlined, InfoCircleOutlined, LeftOutlined} from '@ant-design/icons';
import {ColumnProps as BaseColumnProps, TableProps} from 'antd/lib/table';
import {BaseListSearch, BaseListSummary} from 'entity';
import React, {useCallback, useMemo, useState} from 'react';

import DateTime from 'components/DateTime';
import EllipsisText from 'components/EllipsisText';
import {reference} from 'common/utils';
import useEventCallback from 'hooks/useEventCallback';

reference(Alert);

const alignLeftOutlined = <AlignLeftOutlined />;
const leftOutlined = <LeftOutlined />;

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

const formatColumns = (columns: ColumnProps<any>[], noID: number, sorterField?: string, sorterOrder?: 'descend' | 'ascend'): ColumnProps<any>[] => {
  const transFormText = (text?: string | string[]) => {
    if (!text) return '';
    return typeof text === 'string' ? text : text.join(',');
  };

  return columns
    .filter((col) => !col.disable)
    .map((col) => {
      /**排序状态受控 */
      if (col.sorter && typeof col.sorter === 'boolean' && !col.sortOrder) {
        col = {...col};
        col.sortOrder = (sorterField === col.dataIndex && sorterOrder) || null;
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
const returnTotal = (total: number) => {
  return `共${total}条`;
};
const genLimitTips = (limit: number) => {
  return (
    <>
      还可选择 <em>{limit}</em> 项，
    </>
  );
};
function Component<T extends object>(props: Props<T>) {
  const defaultListSummary: BaseListSummary = {pageCurrent: 1, pageSize: 10, totalItems: 0, totalPages: 0};
  const defaultListSearch: BaseListSearch = {sorterOrder: 'ascend', sorterField: '', pageSize: 10, pageCurrent: 1};
  const {listSummary = defaultListSummary, listSearch = defaultListSearch, dataSource, rowKey = 'id', bottomArea, batchActions, topArea, rowSelection, columns, ...otherPops} = props;
  const {pageCurrent, pageSize, totalItems} = listSummary;
  const {sorterField, sorterOrder} = listSearch;
  const {selectLimit = 0, selectedRows} = rowSelection || {};
  const limitMax = typeof selectLimit === 'number' ? selectLimit : selectLimit[1];
  const selectedCount = (selectedRows || []).length;
  const selectedRowKeys = useMemo(() => (selectedRows || []).map((item) => item[rowKey as string] || item['id']), [rowKey, selectedRows]);
  if (rowSelection) {
    rowSelection.columnWidth = 60;
    rowSelection.type = limitMax === 1 ? 'radio' : 'checkbox';
    rowSelection.selectedRowKeys = selectedRowKeys;
  }

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{context: React.ReactNode; callback: Function}>();
  const cancelConfirm = useCallback(() => {
    setShowConfirmModal(false);
  }, []);
  const executeConfirm = useEventCallback(() => {
    confirmModal!.callback();
  }, [confirmModal]);
  const onReviewSelected = useCallback(() => {
    setReviewMode(true);
  }, []);
  const onCloseReviewSelected = useCallback(() => {
    setReviewMode(false);
  }, []);
  const onClearSelected = useEventCallback(() => {
    rowSelection && rowSelection.onClear && rowSelection.onClear();
  }, [rowSelection]);
  const onBatchAction = useEventCallback(
    (key: string, selectedRowCount: number) => {
      const {actions, onClick} = batchActions!;
      const target = actions.find((item) => item.key === key);
      if (target!.confirm) {
        setShowConfirmModal(true);
        setConfirmModal({
          context: (
            <div className="g-em">
              您确认要 <cite>{target!.label}</cite> 所选择的 <em>{selectedRowCount}</em> 项吗？
              {typeof target!.confirm === 'string' ? <div>{target!.confirm}</div> : null}
            </div>
          ),
          callback: () => {
            setShowConfirmModal(false);
            onClick(target!);
          },
        });
      } else {
        onClick(target!);
      }
    },
    [batchActions]
  );
  const onSigleBatchAction = useEventCallback(() => onBatchAction(batchActions!.actions[0].key, selectedCount), [batchActions, onBatchAction, selectedCount]);
  const onMultBatchAction = useEventCallback(({key}) => onBatchAction(key, selectedCount), [onBatchAction, selectedCount]);

  const batchMenu: React.ReactNode = useMemo(() => {
    if (batchActions) {
      if (batchActions.actions.length === 1) {
        return (
          <Button icon={alignLeftOutlined} onClick={onSigleBatchAction}>
            {batchActions.actions[0].label}
          </Button>
        );
      } else {
        return (
          <Dropdown
            overlay={
              <Menu onClick={onMultBatchAction}>
                {batchActions.actions.map((action) => (
                  <Menu.Item key={action.key}>{action.label}</Menu.Item>
                ))}
              </Menu>
            }
          >
            <Button>
              批量操作 <DownOutlined />
            </Button>
          </Dropdown>
        );
      }
    } else {
      return null;
    }
  }, [batchActions, onMultBatchAction, onSigleBatchAction]);
  const [prevDataSource, setPrevDataSource] = useState<any[]>();
  if (prevDataSource !== dataSource) {
    setPrevDataSource(dataSource);
    setReviewMode(false);
  }
  const reviewSelectedMode = selectedRows && selectedRows.length > 0 && reviewMode;
  const cols = useMemo(() => formatColumns(columns, (pageCurrent - 1) * pageSize + 1, sorterField, sorterOrder), [columns, pageCurrent, pageSize, sorterField, sorterOrder]);
  return (
    <>
      <div className="tableHeader">
        {topArea}
        {batchMenu && selectedCount > 0 && batchMenu}
        {reviewSelectedMode && (
          <Button onClick={onCloseReviewSelected} type="dashed" icon={leftOutlined}>
            返回列表
          </Button>
        )}
        {selectedCount > 0 && (
          <div className="ant-alert-info">
            <InfoCircleOutlined /> 已选择{' '}
            <a onClick={onReviewSelected} style={{fontWeight: 'bold'}}>
              {selectedCount}
            </a>{' '}
            项，
            {limitMax !== 0 && limitMax !== 1 ? genLimitTips(limitMax - selectedCount) : ''}
            <a onClick={reviewSelectedMode ? onCloseReviewSelected : onReviewSelected}>{reviewSelectedMode ? '返回' : '查看'}</a> 或 <a onClick={onClearSelected}>清空选择</a>
          </div>
        )}
      </div>
      <Table<T>
        pagination={
          reviewSelectedMode
            ? false
            : {
                showTotal: returnTotal,
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
        {...otherPops}
      />
      {bottomArea && <div className="tableFooter">{bottomArea}</div>}
      <Modal visible={!!showConfirmModal} onOk={executeConfirm} onCancel={cancelConfirm}>
        {confirmModal && confirmModal!.context}
      </Modal>
    </>
  );
}

export default React.memo(Component) as typeof Component;
