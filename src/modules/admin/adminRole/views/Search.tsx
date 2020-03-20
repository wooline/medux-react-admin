import React, {useCallback} from 'react';

import {FromItemList} from 'common/utils';
import {Input} from 'antd';
import {ListSearch} from 'entity/role';
import {ListSearchFormData} from 'entity';
import PurviewSelector from 'components/PurviewSelector';
import SearchForm from 'components/SearchForm';
import {connect} from 'react-redux';
import useEventCallback from 'hooks/useEventCallback';

type FormData = ListSearchFormData<ListSearch>;

interface StoreProps {
  listSearch?: ListSearch;
}

interface OwnProps {
  defaultSearch?: Partial<ListSearch>;
  fixedFields?: Partial<FormData>;
  disableRoute?: boolean;
}
const Component: React.FC<StoreProps & OwnProps & DispatchProp> = ({dispatch, listSearch, defaultSearch, fixedFields, disableRoute}) => {
  const onFinish = useEventCallback(
    (values: FormData) => {
      dispatch(actions.adminRole.searchList({...values, pageCurrent: 1}, 'current', undefined, disableRoute));
    },
    [disableRoute, dispatch]
  );
  const onReset = useEventCallback(() => {
    dispatch(actions.adminRole.searchList(defaultSearch, 'default', undefined, disableRoute));
  }, [defaultSearch, disableRoute, dispatch]);

  const values = listSearch;
  const items: FromItemList<FormData> = [
    {name: 'roleName', label: '角色名称', formItem: <Input autoComplete="off" allowClear={true} placeholder="请输入角色名称" />},
    {
      name: 'purviews',
      label: '用户权限',
      col: 2,
      formItem: <PurviewSelector mode="multiple" />,
    },
  ];
  return (
    <div className="g-search">
      <SearchForm<FormData> values={values} fixedFields={fixedFields} onReset={onReset} onFinish={onFinish} items={items}></SearchForm>
    </div>
  );
};

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {listSearch: state.adminRole!.routeParams?.listSearch};
};

export default connect(mapStateToProps)(React.memo(Component));
