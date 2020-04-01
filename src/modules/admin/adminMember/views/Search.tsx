import {DStatus, ListSearch} from 'entity/member';
import {Input, Select} from 'antd';
import React, {useCallback} from 'react';

import {FromItemList} from 'common/utils';
import {ListSearchFormData} from 'entity';
import RangeDatePicker from 'components/RangeDatePicker';
import SearchForm from 'components/SearchForm';
import {connect} from 'react-redux';
import useEventCallback from 'hooks/useEventCallback';

type FormData = ListSearchFormData<ListSearch>;

const RoleSelector = loadView('adminRole', 'Selector', {forwardRef: true});

const Option = Select.Option;

interface OwnProps {
  listSearch: ListSearch;
  defaultSearch?: ListSearch;
  fixedFields?: Partial<FormData>;
}

const formItems: FromItemList<FormData> = [
  {name: 'username', label: '用户名', formItem: <Input autoComplete="off" allowClear={true} placeholder="请输入用户名" />},
  {name: 'nickname', label: '呢称', formItem: <Input autoComplete="off" allowClear={true} placeholder="请输入呢称" />},
  {
    name: 'status',
    label: '状态',
    formItem: (
      <Select allowClear={true} placeholder="请选择用户状态">
        {DStatus.options.map((option) => (
          <Option key={option.key} value={option.key}>
            {option.name}
          </Option>
        ))}
      </Select>
    ),
  },
  {
    name: 'role',
    label: '角色',
    formItem: <RoleSelector placeholder="请选择角色" />,
  },
  {
    name: 'email',
    label: 'Email',
    formItem: <Input autoComplete="off" allowClear={true} placeholder="请输入Email" />,
  },
  {name: 'loginTime', label: '登录时间', formItem: <RangeDatePicker />},
];

const Component: React.FC<OwnProps & DispatchProp> = ({dispatch, listSearch, defaultSearch, fixedFields}) => {
  const onFinish = useCallback(
    (values: FormData) => {
      dispatch(actions.adminMember.doListSearch({...values}));
    },
    [dispatch]
  );
  const onReset = useEventCallback(() => {
    dispatch(actions.adminMember.resetListSearch(defaultSearch));
  }, [defaultSearch, dispatch]);

  return (
    <div className="g-search">
      <SearchForm<FormData>
        values={listSearch}
        fixedFields={fixedFields}
        senior={4}
        expand={!!listSearch.email || !!listSearch.loginTime}
        onReset={onReset}
        onFinish={onFinish}
        items={formItems}
      ></SearchForm>
    </div>
  );
};

export default connect()(React.memo(Component));
