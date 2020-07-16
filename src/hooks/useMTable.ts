import {BaseListItem, BaseListSearch} from 'entity';
import {useCallback, useEffect, useMemo} from 'react';

import {CommonResourceActions} from 'common/resource';
import useEventCallback from './useEventCallback';

export default function <ListItem extends BaseListItem>(
  dispatch: (action: any) => void,
  resourceActions: CommonResourceActions,
  listSearch: BaseListSearch,
  selectedRows?: ListItem[],
  getCheckboxProps?: (record: ListItem) => {disabled: boolean}
) {
  const sorterStr = [listSearch?.sorterField, listSearch?.sorterOrder].join('');
  const onCreate = useCallback(() => {
    dispatch(resourceActions.openCurrentItem('0', 'create'));
  }, [dispatch, resourceActions]);

  const onShowDetail = useCallback(
    (item: ListItem | string) => {
      dispatch(resourceActions.openCurrentItem(item, 'detail'));
    },
    [dispatch, resourceActions]
  );
  const onShowEditor = useCallback(
    (item: ListItem | string) => {
      dispatch(resourceActions.openCurrentItem(item, 'edit'));
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
      const rows = selRows.filter((item) => item.id !== record.id);
      if (rows.length === selRows.length) {
        rows.push(record);
      }
      dispatch(resourceActions.putSelectedRows(rows));
    },
    [dispatch, resourceActions, selectedRows]
  );
  const onAllSelect = useEventCallback(
    (checked: boolean, curRows: ListItem[], changeRows: ListItem[]) => {
      const selRows = selectedRows || [];

      let rows: ListItem[] = [];
      if (checked) {
        rows = [...selRows, ...changeRows];
      } else {
        const changeRowsKeys: {[key: string]: boolean} = changeRows.reduce((pre, cur) => {
          pre[cur.id] = true;
          return pre;
        }, {});
        rows = selRows.filter((item) => !changeRowsKeys[item.id]);
      }
      dispatch(resourceActions.putSelectedRows(rows));
    },
    [dispatch, resourceActions, selectedRows]
  );

  const onChange = useCallback(
    (pagination: {current: number; pageSize: number}, filter: any, sorter: {field: string; order: 'ascend' | 'descend' | undefined}) => {
      const {current, pageSize} = pagination;
      const sorterField = (sorter.order && sorter.field) || undefined;
      const sorterOrder = sorter.order || undefined;
      const currentSorter = [sorterField, sorterOrder].join('');
      const pageCurrent = currentSorter !== sorterStr ? 1 : current;

      dispatch(
        resourceActions.searchList({
          params: {
            pageCurrent,
            pageSize,
            sorterField,
            sorterOrder,
          },
          extend: 'current',
        })
      );
    },
    [dispatch, resourceActions, sorterStr]
  );
  const onChangeStatus = useEventCallback(
    (status: string, ids?: string[]) => {
      dispatch(resourceActions.changeListStatus({ids, status}));
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
  return {onChange, onAllSelect, onRowSelect, onClearSelect, onDeleteList, onShowEditor, onChangeStatus, onShowDetail, onCreate, rowSelection};
}
