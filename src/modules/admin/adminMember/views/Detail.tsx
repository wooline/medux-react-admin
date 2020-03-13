import {Button, Descriptions} from 'antd';
import {DGender, DStatus, ItemDetail} from 'entity/member';

import DateTime from 'components/DateTime';
import React from 'react';
import {connect} from 'react-redux';
import styles from './index.m.less';

const DescriptionsItem = Descriptions.Item;

interface StoreProps {
  primaryMode?: boolean;
  currentItem?: ItemDetail;
}

export const ModalSubmitLayout = {
  wrapperCol: {span: 15, offset: 6},
};
class Component extends React.PureComponent<StoreProps & DispatchProp> {
  onHide = () => {
    this.props.dispatch(actions.adminMember.execCurrentItem());
  };
  onEdit = () => {
    this.props.dispatch(actions.adminMember.execCurrentItem('edit'));
  };
  onDelete = async () => {
    await this.props.dispatch(actions.adminMember.deleteList([this.props.currentItem!.id]));
    this.onHide();
  };
  public render() {
    const {currentItem, primaryMode} = this.props;
    if (currentItem) {
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
  const thisModule = state.adminMember!;
  return {
    primaryMode: !!state.route.data.views.adminMember,
    currentItem: thisModule.currentItem,
  };
};

export default connect(mapStateToProps)(Component);
