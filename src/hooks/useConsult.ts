import {useCallback} from 'react';
export default function useEventCallback(dispatch: (action: any) => void) {
  return useCallback(() => {
    dispatch(actions.articleLayout.showConsult());
  }, [dispatch]);
}
