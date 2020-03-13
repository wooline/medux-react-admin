import {Button, Descriptions, Icon} from 'antd';

import DateTime from 'components/DateTime';
import {ItemDetail} from 'entity/role';
import React from 'react';
import {connect} from 'react-redux';
import {purviewNames} from 'entity/role';
import styles from './index.m.less';

const DescriptionsItem = Descriptions.Item;

interface StoreProps {
  primaryMode?: boolean;
  currentItem?: ItemDetail;
}

export const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 15,
  },
};
export const ModalSubmitLayout = {
  wrapperCol: {span: 15, offset: 6},
};
class Component extends React.PureComponent<StoreProps & DispatchProp> {
  onHide = () => {
    this.props.dispatch(actions.adminRole.execCurrentItem());
  };
  onEdit = () => {
    this.props.dispatch(actions.adminRole.execCurrentItem('edit'));
  };
  onDelete = async () => {
    await this.props.dispatch(actions.adminRole.deleteList([this.props.currentItem!.id]));
    this.onHide();
  };
  public render() {
    const {currentItem, primaryMode} = this.props;
    if (currentItem) {
      const purviews: {[key: string]: boolean} = currentItem.purviews.reduce((pre, cur) => {
        pre[cur] = true;
        return pre;
      }, {});
      const options: {[key: string]: string[]} = {};
      Object.keys(purviewNames).forEach(item => {
        const [resource, action] = item.split('.');
        if (!action) {
          options[resource] = [];
        } else if (purviews[item]) {
          options[resource].push(item);
        }
      });
      const items: string[] = [];
      Object.keys(options).forEach(key => {
        const actions = options[key];
        if (actions.length) {
          items.push(key, ...actions);
        }
      });
      const disabled = currentItem.fixed ? 'disable' : '';
      return (
        <div className={styles.root}>
          <Descriptions bordered column={1}>
            <DescriptionsItem label="角色名称">{currentItem.roleName}</DescriptionsItem>
            <DescriptionsItem label="当前人数">{currentItem.owner}</DescriptionsItem>
            <DescriptionsItem label="创建时间">
              <DateTime date={currentItem.createdTime} />
            </DescriptionsItem>
            <DescriptionsItem label="备注说明">{currentItem.remark}</DescriptionsItem>
          </Descriptions>
          <div className="purviews">
            <h4>
              <Icon type="caret-down" style={{marginRight: 5}} />
              权限设置
            </h4>
            <dl>
              {items.map(item => {
                const [resource, action] = item.split('.');
                return action ? <dd key={item}>{purviewNames[item]}</dd> : <dt key={item}>{purviewNames[resource]}</dt>;
              })}
            </dl>
          </div>
          <div className="g-actions">
            <Button type="primary" onClick={this.onHide}>
              确定
            </Button>
            {primaryMode && (
              <>
                <Button className={disabled} icon="edit" onClick={this.onEdit}>
                  修改
                </Button>
                <Button className={disabled} icon="delete" type="danger" onClick={this.onDelete}>
                  删除
                </Button>
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const thisModule = state.adminRole!;
  return {
    primaryMode: !!state.route.data.views.adminRole,
    currentItem: thisModule.currentItem,
  };
};

export default connect(mapStateToProps)(Component);
