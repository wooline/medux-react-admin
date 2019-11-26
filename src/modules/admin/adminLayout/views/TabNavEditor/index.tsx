import {Button, Form, Input} from 'antd';
import {DispatchProp, connect} from 'react-redux';
import {createForm, getFormDecorators} from 'common/utils';

import {FormComponentProps} from 'antd/lib/form';
import React from 'react';
import {TabNav} from 'entity/common';
import styles from './index.m.less';

let prevCurItem: TabNav = {id: '', title: '', url: ''};
interface StoreProps {
  curItem?: TabNav;
}

class Component extends React.Component<StoreProps & FormComponentProps & DispatchProp> {
  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.form.validateFields((errors, values: {title: string}) => {
      if (!errors) {
        const {title} = values;
        this.props.dispatch(actions.adminLayout.updateTabNav({...this.props.curItem!, title}));
      } else {
        message.error('请输入书签名');
      }
    });
  };

  onCancel = () => {
    this.props.dispatch(actions.adminLayout.closeTabNavEditor());
  };
  render() {
    const {curItem = prevCurItem, form} = this.props;
    prevCurItem = curItem;

    const formDecorators = getFormDecorators<{title: string}>(form, {
      title: {rules: [{required: true, message: '请输入书签名'}]},
    });

    return (
      <div className={styles.root}>
        <h4 className="title">{curItem!.id ? '重命名当前书签：' : '将当前页面加入书签：'}</h4>
        <Form layout="horizontal" onSubmit={this.onSubmit}>
          {formDecorators.title(<Input allowClear={true} placeholder="请输入书签名" />)}
          <div className="g-btns">
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            <Button onClick={this.onCancel}>取消</Button>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {
    curItem: state.adminLayout!.tabNavEditor,
  };
};

const mapPropsToFields = (props: StoreProps) => {
  return {
    title: props.curItem ? props.curItem.title : '',
  };
};
export default connect(mapStateToProps)(createForm(Component, mapPropsToFields));
