import {useCallback, useEffect, useMemo} from 'react';

import {BaseListItem} from 'entity';
import {CommonResourceActions} from 'common/resource';
import useEventCallback from './useEventCallback';

export default function<ListItem extends BaseListItem>(
  dispatch: (action: any) => void,
  resourceActions: CommonResourceActions,
  selectedRows?: ListItem[],
  getCheckboxProps?: (record: ListItem) => {disabled: boolean}
) {
  const onCreate = useCallback(() => {
    dispatch(resourceActions.execCurrentItem('create'));
  }, [dispatch, resourceActions]);
  const onShowDetail = useCallback(
    (item: ListItem) => {
      dispatch(resourceActions.execCurrentItem('detail', item));
    },
    [dispatch, resourceActions]
  );
  const onShowEditor = useCallback(
    (item: ListItem) => {
      dispatch(resourceActions.execCurrentItem('edit', item));
    },
    [dispatch, resourceActions]
  );
  const onDeleteList = useCallback(
    (ids?: string[]) => {
      dispatch(resourceActions.deleteList(ids));
    },
    [dispatch, resourceActions]
  );
  const onClearSelect = useCallback(() => {
    dispatch(resourceActions.putSelectedRows([]));
  }, [dispatch, resourceActions]);

  const onRowSelect = useEventCallback(
    (record: ListItem) => {
      const selRows = selectedRows || [];
      const rows = selRows.filter(item => item.id !== record.id);
      if (rows.length === selRows.length) {
        rows.push(record);
      }
      dispatch(resourceActions.putSelectedRows(rows));
    },
    [dispatch, resourceActions, selectedRows]
  );
  const onAllSelect = useEventCallback(
    (checked: boolean, selectRows: ListItem[], changeRows: ListItem[]) => {
      const selRows = selectedRows || [];
      let rows: ListItem[] = [];
      if (checked) {
        rows = [...selRows, ...changeRows];
      } else {
        const changeRowsKeys: {[key: string]: boolean} = changeRows.reduce((pre, cur) => {
          pre[cur.id] = true;
          return pre;
        }, {});
        rows = selRows.filter(item => !changeRowsKeys[item.id]);
      }
      dispatch(resourceActions.putSelectedRows(rows));
    },
    [dispatch, resourceActions, selectedRows]
  );

  const onChange = useCallback(
    (pagination: {current: number; pageSize: number}, filter: any, sorter: {field: string; order: any}) => {
      const {current: pageCurrent, pageSize} = pagination;
      dispatch(
        resourceActions.searchList({
          pageCurrent,
          pageSize,
          sorterField: sorter.order && sorter.field,
          sorterOrder: sorter.order,
        })
      );
    },
    [dispatch, resourceActions]
  );

  const rowSelection = useMemo(
    () => ({
      selectedRows,
      onClear: onClearSelect,
      onSelect: onRowSelect,
      onSelectAll: onAllSelect,
      getCheckboxProps,
    }),
    [onAllSelect, onClearSelect, onRowSelect, selectedRows, getCheckboxProps]
  );
  useEffect(() => {
    return () => {
      dispatch(resourceActions.putSelectedRows());
    };
  }, [dispatch, resourceActions]);
  return {onChange, onAllSelect, onRowSelect, onClearSelect, onDeleteList, onShowEditor, onShowDetail, onCreate, rowSelection};
}
