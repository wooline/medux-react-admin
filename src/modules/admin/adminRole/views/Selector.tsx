import React, {useCallback} from 'react';
import ResourceSimpleSelector, {Props as ResourceSimpleSelectorProps} from 'components/ResourceSimpleSelector';

import {ListItem} from 'entity/role';
import {OmitSelf} from 'common';
import api from '../api';

export interface Item {
  id: string;
  name: string;
}
type OwnProps = OmitSelf<ResourceSimpleSelectorProps<ListItem>, 'fetch'>;

const Component: React.FC<OwnProps> = ({placeholder = '请选择角色', optionRender = 'roleName', ...props}) => {
  const fetch = useCallback((term: string, pageSize: number, pageCurrent: number) => {
    return api.searchList({term, pageSize, pageCurrent});
  }, []);

  return <ResourceSimpleSelector<ListItem> {...props} placeholder={placeholder} optionRender={optionRender} fetch={fetch} />;
};

export default React.memo(Component);
