import {Input, Select} from 'antd';
import {createForm, getFormDecorators} from 'common/utils';

import {FormComponentProps} from 'antd/lib/form';
import {ListSearch} from 'entity/role';
import PurviewSelector from 'components/PurviewSelector';
import React from 'react';
import SearchForm from 'components/SearchForm';
import {connect} from 'react-redux';
import {purviewNames} from 'entity/role';

const {Option, OptGroup} = Select;

interface StoreProps {
  listSearch: ListSearch;
}

class Component extends React.PureComponent<StoreProps & FormComponentProps & DispatchProp> {
  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.form.validateFields((errors, values: ListSearch) => {
      if (!errors) {
        this.props.dispatch(actions.adminRole.searchList(values, 'current'));
      }
    });
  };
  public render() {
    const {form} = this.props;
    const formDecorators = getFormDecorators<ListSearch>(form);
    const items = [
      {label: '角色名称', item: formDecorators.roleName(<Input autoComplete="off" allowClear={true} placeholder="请输入角色名称" />)},
      {
        label: '用户权限',
        col: 2,
        item: formDecorators.purview(<PurviewSelector mode="multiple" />),
      },
    ];
    return (
      <div className="g-search">
        <SearchForm onSubmit={this.onSubmit} items={items}></SearchForm>
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
