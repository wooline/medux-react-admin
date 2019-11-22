import {DPurview, ListSearch} from 'entity/role';
import {Form, Input, Select} from 'antd';
import {createForm, getFormDecorators} from 'common/utils';

import {FormComponentProps} from 'antd/lib/form';
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
      {label: '角色名称', item: formDecorators.roleName(<Input autoComplete="off" allowClear={true} placeholder="请输入角色名称" />)},
      {
        label: '用户权限',
        item: formDecorators.purview(
          <Select allowClear={true} placeholder="请选择用户权限">
            {DPurview.options.map(option => (
              <Option key={option.key} value={option.key}>
                {option.name}
              </Option>
            ))}
          </Select>
        ),
      },
    ];
    return (
      <div className="g-search">
        <SearchForm items={items}></SearchForm>
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {listSearch: state.adminRole!.preRouteParams!.listSearch};
};
const mapPropsToFields = (props: StoreProps) => {
  return {
    ...props.listSearch,
  };
};
export default connect(mapStateToProps)(createForm(Component, mapPropsToFields));
