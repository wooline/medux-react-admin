import {Button, Descriptions} from 'antd';
import {CaretDownOutlined, DeleteOutlined, FormOutlined} from '@ant-design/icons';
import React, {useMemo} from 'react';

import DateTime from 'components/DateTime';
import {ItemDetail, purviewNames} from 'entity/role';
import {connect} from 'react-redux';

import useDetail from 'hooks/useDetail';
import styles from './index.m.less';

const DescriptionsItem = Descriptions.Item;
const formOutlined = <FormOutlined />;
const deleteOutlined = <DeleteOutlined />;

interface OwnProps {
  primaryMode: boolean;
  currentItem: ItemDetail;
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

const Component: React.FC<OwnProps & DispatchProp> = ({dispatch, primaryMode, currentItem}) => {
  const {onHide, onEdit, onDelete} = useDetail(dispatch, actions.adminRole, currentItem);

  const {purvieList, disabled} = useMemo(() => {
    const purviews: {[key: string]: boolean} = currentItem.purviews.reduce((pre, cur) => {
      pre[cur] = true;
      return pre;
    }, {});
    const options: {[key: string]: string[]} = {};
    Object.keys(purviewNames).forEach((item) => {
      const [resource, action] = item.split('.');
      if (!action) {
        options[resource] = [];
      } else if (purviews[item]) {
        options[resource].push(item);
      }
    });
    const items: string[] = [];
    Object.keys(options).forEach((key) => {
      const actions = options[key];
      if (actions.length) {
        items.push(key, ...actions);
      }
    });

    return {
      purvieList: items.map((item) => {
        const [resource, action] = item.split('.');
        return action ? <dd key={item}>{purviewNames[item]}</dd> : <dt key={item}>{purviewNames[resource]}</dt>;
      }),
      disabled: currentItem.fixed ? 'disable' : '',
    };
  }, [currentItem]);

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
          <CaretDownOutlined style={{marginRight: 5}} />
          权限设置
        </h4>
        <dl>{purvieList}</dl>
      </div>
      <div className="g-actions">
        <Button type="primary" onClick={onHide}>
          确定
        </Button>
        {primaryMode && (
          <>
            <Button className={disabled} icon={formOutlined} onClick={onEdit}>
              修改
            </Button>
            <Button className={disabled} icon={deleteOutlined} danger onClick={onDelete}>
              删除
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default connect()(React.memo(Component));
