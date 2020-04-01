import {useCallback, useEffect, useMemo} from 'react';

import {BaseListItem} from 'entity';
import {CommonResourceActions} from 'common/resource';
import useEventCallback from './useEventCallback';

export default function (dispatch: (action: any) => void, resourceActions: CommonResourceActions, currentItem: BaseListItem) {
  const {id} = currentItem;
  const onHide = useCallback(() => {
    dispatch(resourceActions.closeCurrentItem());
  }, [dispatch, resourceActions]);
  const onEdit = useCallback(() => {
    dispatch(resourceActions.openCurrentItem('edit', currentItem));
  }, [dispatch, resourceActions, currentItem]);
  const onDelete = useEventCallback(async () => {
    await dispatch(resourceActions.deleteList([id]));
    onHide();
  }, [id, dispatch, onHide, resourceActions]);
  return {onHide, onEdit, onDelete};
}
