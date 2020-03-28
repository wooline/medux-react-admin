import {DStatus, ListSearch} from 'entity/post';
import {Input, Select} from 'antd';
import React, {useCallback} from 'react';

import {FromItemList} from 'common/utils';
import {ListSearchFormData} from 'entity';
import {Status as MemberStaus} from 'entity/member';
import RangeDatePicker from 'components/RangeDatePicker';
import ResourceSelector from 'components/ResourceSelector';
import SearchForm from 'components/SearchForm';
import {connect} from 'react-redux';
import useEventCallback from 'hooks/useEventCallback';

type FormData = ListSearchFormData<ListSearch>;

const MemberSelector = loadView('adminMember', 'Selector');

const Option = Select.Option;

interface OwnProps {
  listSearch: ListSearch;
  defaultSearch?: ListSearch;
  fixedFields?: Partial<FormData>;
}

const formItems: FromItemList<FormData> = [
  {name: 'title', label: '标题', formItem: <Input autoComplete="off" allowClear={true} placeholder="请输入标题" />},
  {name: 'author', label: '作者', formItem: <Input autoComplete="off" allowClear={true} placeholder="请输入作者用户名或呢称" />},
  {
    name: 'status',
    label: '状态',
    formItem: (
      <Select allowClear={true} placeholder="请选择信息状态">
        {DStatus.options.map((option) => (
          <Option key={option.key} value={option.key}>
            {option.name}
          </Option>
        ))}
      </Select>
    ),
  },
  {
    name: 'editor',
    label: '责任编辑',
    formItem: (
      <ResourceSelector
        title="请选择责任编辑"
        placeholder="请选择责任编辑"
        resourceNameField="nickname"
        allowClear={true}
        resource={<MemberSelector fixedSearchField={{status: MemberStaus.启用, role: {id: '3', name: '信息编辑'}}} />}
      />
    ),
  },
  {name: 'createdTime', label: '发表时间', formItem: <RangeDatePicker />},
];

const Component: React.FC<OwnProps & DispatchProp> = ({dispatch, listSearch, defaultSearch, fixedFields}) => {
  const onFinish = useCallback(
    (values: FormData) => {
      dispatch(actions.adminPost.doListSearch({...values}));
    },
    [dispatch]
  );
  const onReset = useEventCallback(() => {
    dispatch(actions.adminPost.resetListSearch(defaultSearch));
  }, [defaultSearch, dispatch]);

  return (
    <div className="g-search">
      <SearchForm<FormData> values={listSearch} fixedFields={fixedFields} onReset={onReset} onFinish={onFinish} items={formItems}></SearchForm>
    </div>
  );
};

export default connect()(React.memo(Component));
