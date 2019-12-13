import {Button, Descriptions, Icon} from 'antd';

import DateTime from 'components/DateTime';
import {ListItem} from 'entity/role';
import React from 'react';
import {connect} from 'react-redux';
import {createForm} from 'common/utils';
import {purviewNames} from 'entity/role';
import styles from './index.m.less';

const DescriptionsItem = Descriptions.Item;

interface StoreProps {
  primaryMode?: boolean;
  dataSource?: ListItem;
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
    await this.props.dispatch(actions.adminRole.deleteList([this.props.dataSource!.id]));
    this.onHide();
  };
  public render() {
    const {dataSource, primaryMode} = this.props;
    if (dataSource) {
      const purviews: {[key: string]: boolean} = dataSource.purviews.reduce((pre, cur) => {
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

      return (
        <div className={styles.root}>
          <Descriptions bordered column={1}>
            <DescriptionsItem label="角色名称">{dataSource.roleName}</DescriptionsItem>
            <DescriptionsItem label="当前人数">{dataSource.owner}</DescriptionsItem>
            <DescriptionsItem label="创建时间">
              <DateTime date={dataSource.createdTime} />
            </DescriptionsItem>
            <DescriptionsItem label="备注说明">{dataSource.remark}</DescriptionsItem>
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
                <Button className={dataSource.fixed ? 'disable' : ''} icon="edit" onClick={this.onEdit}>
                  修改
                </Button>
                <Button className={dataSource.fixed ? 'disable' : ''} icon="delete" type="danger" onClick={this.onDelete}>
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
    dataSource: thisModule.currentItem,
  };
};
const mapPropsToFields = (props: StoreProps) => {
  return {
    ...props.dataSource,
  };
};
export default connect(mapStateToProps)(createForm(Component, mapPropsToFields));
