import {DStatus, ListSearch} from 'entity/post';
import {Input, Select} from 'antd';
import {createForm, getFormDecorators} from 'common/utils';

import {FormComponentProps} from 'antd/lib/form';
import {Status as MemberStaus} from 'entity/member';
import RangeDatePicker from 'components/RangeDatePicker';
import React from 'react';
import ResourceSelector from 'components/ResourceSelector';
import SearchForm from 'components/SearchForm';
import {connect} from 'react-redux';

const MemberSelector = loadView('adminMember', 'Selector');

const Option = Select.Option;

interface StoreProps {
  listSearch?: ListSearch;
}

interface OwnProps {
  fixedFields?: Partial<ListSearch>;
  defaultSearch?: Partial<ListSearch>;
  disableRoute?: boolean;
}

class Component extends React.PureComponent<StoreProps & FormComponentProps & DispatchProp & OwnProps> {
  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {form, dispatch, disableRoute, fixedFields = {}} = this.props;
    form.validateFields((errors, values: ListSearch) => {
      if (!errors) {
        Object.assign(values, fixedFields);
        values.pageCurrent = 1;
        values.sorterField = undefined;
        values.sorterOrder = undefined;
        dispatch(actions.adminPost.searchList(values, 'current', undefined, disableRoute));
      }
    });
  };
  private onReset = () => {
    this.props.dispatch(actions.adminPost.searchList(this.props.defaultSearch || {}, 'default', undefined, this.props.disableRoute));
  };
  public render() {
    const {fixedFields, form} = this.props;
    const formDecorators = getFormDecorators<ListSearch>(form);
    const items = [
      {label: '标题', item: formDecorators.title(<Input autoComplete="off" allowClear={true} placeholder="请输入标题" />)},
      {label: '作者', item: formDecorators.author(<Input autoComplete="off" allowClear={true} placeholder="请输入作者用户名或呢称" />)},
      {
        label: '状态',
        item: formDecorators.status!(
          <Select allowClear={true} placeholder="请选择信息状态">
            {DStatus.options.map(option => (
              <Option key={option.key} value={option.key}>
                {option.name}
              </Option>
            ))}
          </Select>
        ),
      },
      {
        label: '责任编辑',
        item: formDecorators.editor(
          <ResourceSelector
            title="请选择责任编辑"
            placeholder="请选择责任编辑"
            resourceNameField="nickname"
            allowClear={true}
            resource={<MemberSelector fixedSearchField={{status: MemberStaus.启用, role: {id: '3', name: '信息编辑'}}} />}
          />
        ),
      },
      {label: '发表时间', item: formDecorators.createdTime(<RangeDatePicker />)},
    ];
    return (
      <div className="g-search">
        <SearchForm disableFields={fixedFields && Object.keys(fixedFields)} onReset={this.onReset} onSubmit={this.onSubmit} items={items}></SearchForm>
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {listSearch: state.adminPost!.routeParams?.listSearch};
};
const mapPropsToFields = (props: StoreProps) => {
  return {
    ...props.listSearch,
  };
};
export default connect(mapStateToProps)(createForm(Component, mapPropsToFields));
