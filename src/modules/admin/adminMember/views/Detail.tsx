import {Button, Descriptions} from 'antd';
import {DGender, DStatus, ItemDetail} from 'entity/member';
import {DeleteOutlined, FormOutlined} from '@ant-design/icons';

import DateTime from 'components/DateTime';
import React from 'react';
import {connect} from 'react-redux';
import styles from './index.m.less';
import useDetail from 'hooks/useDetail';

const DescriptionsItem = Descriptions.Item;
const formOutlined = <FormOutlined />;
const deleteOutlined = <DeleteOutlined />;

interface OwnProps {
  primaryMode: boolean;
  currentItem: ItemDetail;
}

export const ModalSubmitLayout = {
  wrapperCol: {span: 15, offset: 6},
};
const Component: React.FC<OwnProps & DispatchProp> = ({dispatch, primaryMode, currentItem}) => {
  const {onHide, onEdit, onDelete} = useDetail(dispatch, actions.adminMember, currentItem);
  const disabled = currentItem.fixed ? 'disable' : '';
  return (
    <div className={styles.root}>
      <Descriptions bordered>
        <DescriptionsItem label="用户名">{currentItem.username}</DescriptionsItem>
        <DescriptionsItem label="呢称">{currentItem.nickname}</DescriptionsItem>
        <DescriptionsItem label="角色">{currentItem.roleName}</DescriptionsItem>
        <DescriptionsItem label="性别">{DGender.keyToName[currentItem.gender]}</DescriptionsItem>
        <DescriptionsItem label="发表信息">{currentItem.post}</DescriptionsItem>
        <DescriptionsItem label="注册时间">
          <DateTime date={currentItem.createdTime} />
        </DescriptionsItem>
        <DescriptionsItem label="状态">{DStatus.keyToName[currentItem.status]}</DescriptionsItem>
        <DescriptionsItem label="Email">{currentItem.email}</DescriptionsItem>
        <DescriptionsItem label="登录时间">
          <DateTime date={currentItem.loginTime} />
        </DescriptionsItem>
        <DescriptionsItem label="积分">{currentItem.score}</DescriptionsItem>
        <DescriptionsItem label="账户">{currentItem.account}</DescriptionsItem>
        <DescriptionsItem label="等级">4</DescriptionsItem>
      </Descriptions>
      <div className="g-actions">
        <Button type="primary" onClick={onHide}>
          确定
        </Button>
        {primaryMode && (
          <>
            <Button className={disabled} icon={formOutlined} onClick={onEdit}>
              修改
            </Button>
            <Button className={disabled} icon={deleteOutlined} type="danger" onClick={onDelete}>
              删除
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default connect()(React.memo(Component));
