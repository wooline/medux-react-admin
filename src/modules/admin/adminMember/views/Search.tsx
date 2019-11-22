import {DGender, DStatus, ListSearch} from 'entity/member';
import {Form, Input, Select} from 'antd';
import {createForm, getFormDecorators} from 'common/utils';

import {FormComponentProps} from 'antd/lib/form';
import RangeDatePicker from 'components/RangeDatePicker';
import React from 'react';
import SearchForm from 'components/SearchForm';
import {connect} from 'react-redux';

const Option = Select.Option;
const FormItem = Form.Item;

interface StoreProps {
  listSearch: ListSearch;
}

class Component extends React.PureComponent<StoreProps & FormComponentProps> {
  public render() {
    const {form} = this.props;
    const formDecorators = getFormDecorators<ListSearch>(form);
    const items = [
      {label: '姓名', item: formDecorators.username(<Input autoComplete="off" allowClear={true} placeholder="请输入用户名" />)},
      {label: '用户ID', item: formDecorators.uid(<Input autoComplete="off" allowClear={true} placeholder="请输入用户ID" />)},
      {
        label: '状态',
        item: formDecorators.status!(
          <Select allowClear={true} placeholder="请选择用户状态">
            {DStatus.options.map(option => (
              <Option key={option.key} value={option.key}>
                {option.name}
              </Option>
            ))}
          </Select>
        ),
      },
      {label: '角色', item: formDecorators.uid!(<Input autoComplete="off" allowClear={true} placeholder="请选择用户角色" />)},
      {
        label: '性别',
        item: formDecorators.gender!(
          <Select allowClear={true} placeholder="请选择性别">
            {DGender.options.map(option => (
              <Option key={option.key} value={option.key}>
                {option.name}
              </Option>
            ))}
          </Select>
        ),
      },
      {label: '注册时间', item: formDecorators.createdTime!(<RangeDatePicker />)},
      {label: '登录时间', item: formDecorators.loginTime!(<RangeDatePicker />)},
    ];
    return (
      <div className="g-search">
        <SearchForm senior={4} items={items}></SearchForm>
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {listSearch: state.adminMember!.preRouteParams!.listSearch};
};
const mapPropsToFields = (props: StoreProps) => {
  return {
    ...props.listSearch,
  };
};
export default connect(mapStateToProps)(createForm(Component, mapPropsToFields));
