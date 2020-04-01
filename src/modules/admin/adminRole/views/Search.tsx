import {FromItemList} from 'common/utils';
import {Input} from 'antd';
import {ListSearch} from 'entity/role';
import {ListSearchFormData} from 'entity';
import PurviewSelector from 'components/PurviewSelector';
import React from 'react';
import SearchForm from 'components/SearchForm';
import {connect} from 'react-redux';
import useEventCallback from 'hooks/useEventCallback';

type FormData = ListSearchFormData<ListSearch>;

interface OwnProps {
  listSearch: ListSearch;
  defaultSearch?: ListSearch;
  fixedFields?: Partial<FormData>;
}
const formItems: FromItemList<FormData> = [
  {name: 'roleName', label: '角色名称', formItem: <Input autoComplete="off" allowClear={true} placeholder="请输入角色名称" />},
  {
    name: 'purviews',
    label: '用户权限',
    col: 2,
    formItem: <PurviewSelector mode="multiple" />,
  },
];

const Component: React.FC<OwnProps & DispatchProp> = ({dispatch, listSearch, defaultSearch, fixedFields}) => {
  const onFinish = useEventCallback(
    (values: FormData) => {
      dispatch(actions.adminRole.doListSearch({...values}));
    },
    [dispatch]
  );
  const onReset = useEventCallback(() => {
    dispatch(actions.adminRole.resetListSearch(defaultSearch));
  }, [defaultSearch, dispatch]);

  return (
    <div className="g-search">
      <SearchForm<FormData> values={listSearch} fixedFields={fixedFields} onReset={onReset} onFinish={onFinish} items={formItems}></SearchForm>
    </div>
  );
};

export default connect()(React.memo(Component));
