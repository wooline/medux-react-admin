import {BaseListItem, BaseListSearch} from 'entity';
import {useCallback, useEffect, useMemo} from 'react';

import {CommonResourceActions} from 'common/resource';
import useEventCallback from './useEventCallback';

export default function<ListItem extends BaseListItem>(
  dispatch: (action: any) => void,
  resourceActions: CommonResourceActions,
  listSearch: BaseListSearch,
  defaultSearch?: BaseListSearch,
  selectedRows?: ListItem[],
  onSelectdChange?: (items: ListItem[]) => void,
  selectLimit?: number | [number, number]
) {
  const sorterStr = [listSearch?.sorterField, listSearch?.sorterOrder].join('');
  const onShowDetail = useCallback(
    (item: ListItem | string) => {
      dispatch(resourceActions.openCurrentItem('summary', item));
    },
    [dispatch, resourceActions]
  );
  const onClearSelect = useCallback(() => {
    onSelectdChange && onSelectdChange([]);
  }, [onSelectdChange]);

  const onRowSelect = useEventCallback(
    (record: ListItem) => {
      const selRows = selectedRows || [];
      const rows = selRows.filter(item => item.id !== record.id);
      if (rows.length === selRows.length) {
        rows.push(record);
      }
      onSelectdChange && onSelectdChange(rows);
    },
    [onSelectdChange, selectedRows]
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
        rows = selRows.filter(item => !changeRowsKeys[item.id]);
      }
      onSelectdChange && onSelectdChange(rows);
    },
    [onSelectdChange, selectedRows]
  );

  const onChange = useCallback(
    (pagination: {current: number; pageSize: number}, filter: any, sorter: {field: string; order: 'ascend' | 'descend' | undefined}) => {
      const {current, pageSize} = pagination;
      const sorterField = sorter.order && sorter.field;
      const sorterOrder = sorter.order;
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

  const rowSelection = useMemo(
    () => ({
      selectedRows,
      selectLimit,
      onClear: onClearSelect,
      onSelect: onRowSelect,
      onSelectAll: onAllSelect,
    }),
    [onAllSelect, onClearSelect, onRowSelect, selectedRows, selectLimit]
  );
  useEffect(() => {
    dispatch(resourceActions.resetListSearch(defaultSearch, 'selector'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {onChange, onAllSelect, onRowSelect, onClearSelect, onShowDetail, rowSelection};
}
