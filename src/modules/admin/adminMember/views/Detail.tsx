import {Button, Descriptions, Icon} from 'antd';
import {DGender, DStatus, ItemDetail} from 'entity/member';

import DateTime from 'components/DateTime';
import React from 'react';
import {connect} from 'react-redux';
import {createForm} from 'common/utils';
import styles from './index.m.less';

const DescriptionsItem = Descriptions.Item;

interface StoreProps {
  primaryMode?: boolean;
  dataSource?: ItemDetail;
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
    this.props.dispatch(actions.adminMember.execCurrentItem());
  };
  onEdit = () => {
    this.props.dispatch(actions.adminMember.execCurrentItem('edit'));
  };
  onDelete = async () => {
    await this.props.dispatch(actions.adminMember.deleteList([this.props.dataSource!.id]));
    this.onHide();
  };
  public render() {
    const {dataSource, primaryMode} = this.props;
    if (dataSource) {
      return (
        <div className={styles.root}>
          <Descriptions bordered>
            <DescriptionsItem label="用户名">{dataSource.username}</DescriptionsItem>
            <DescriptionsItem label="呢称">{dataSource.nickname}</DescriptionsItem>
            <DescriptionsItem label="角色">{dataSource.roleName}</DescriptionsItem>
            <DescriptionsItem label="性别">{DGender.keyToName[dataSource.gender]}</DescriptionsItem>
            <DescriptionsItem label="发表文章">{dataSource.article}</DescriptionsItem>
            <DescriptionsItem label="注册时间">
              <DateTime date={dataSource.createdTime} />
            </DescriptionsItem>
            <DescriptionsItem label="状态">{DStatus.keyToName[dataSource.status]}</DescriptionsItem>
            <DescriptionsItem label="Email">{dataSource.email}</DescriptionsItem>
            <DescriptionsItem label="登录时间">
              <DateTime date={dataSource.loginTime} />
            </DescriptionsItem>
            <DescriptionsItem label="积分">{dataSource.score}</DescriptionsItem>
            <DescriptionsItem label="账户">{dataSource.account}</DescriptionsItem>
            <DescriptionsItem label="等级">4</DescriptionsItem>
          </Descriptions>
          <div className="g-actions">
            <Button type="primary" onClick={this.onHide}>
              确定
            </Button>
            {primaryMode && (
              <>
                <Button icon="edit" onClick={this.onEdit}>
                  修改
                </Button>
                <Button icon="delete" type="danger" onClick={this.onDelete}>
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
    dataSource: thisModule.currentItem,
  };
};
const mapPropsToFields = (props: StoreProps) => {
  return {
    ...props.dataSource,
  };
};
export default connect(mapStateToProps)(createForm(Component, mapPropsToFields));
