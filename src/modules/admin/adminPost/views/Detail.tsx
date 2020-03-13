import {Button, Descriptions} from 'antd';
import {DStatus, ItemDetail} from 'entity/post';

import DateTime from 'components/DateTime';
import React from 'react';
import {connect} from 'react-redux';
import styles from './index.m.less';

const DescriptionsItem = Descriptions.Item;

interface StoreProps {
  primaryMode?: boolean;
  currentItem?: ItemDetail;
  userid: string;
}

export const ModalSubmitLayout = {
  wrapperCol: {span: 15, offset: 6},
};
class Component extends React.PureComponent<StoreProps & DispatchProp> {
  onHide = () => {
    this.props.dispatch(actions.adminPost.execCurrentItem());
  };
  onEdit = () => {
    this.props.dispatch(actions.adminPost.execCurrentItem('edit'));
  };
  onDelete = async () => {
    await this.props.dispatch(actions.adminPost.deleteList([this.props.currentItem!.id]));
    this.onHide();
  };
  onShowMembers = (username: string) => {
    this.props.dispatch(actions.adminMember.searchList({username}, 'none'));
  };
  public render() {
    const {currentItem, primaryMode, userid} = this.props;
    if (currentItem) {
      const disabled = currentItem.fixed ? 'disable' : '';
      return (
        <div className={styles.root}>
          <Descriptions bordered column={2}>
            <DescriptionsItem label="标题" span={2}>
              {currentItem.title}
            </DescriptionsItem>
            <DescriptionsItem label="作者">{<a onClick={() => this.onShowMembers(currentItem.author.id)}>{currentItem.author.name}</a>}</DescriptionsItem>
            <DescriptionsItem className="g-items" label="责任编辑">
              {currentItem.editors.map(editor => (
                <a key={editor.id} onClick={() => this.onShowMembers(editor.id)}>
                  {editor.name}
                </a>
              ))}
            </DescriptionsItem>
            <DescriptionsItem label="状态">{DStatus.keyToName[currentItem.status]}</DescriptionsItem>
            <DescriptionsItem label="发布时间">
              <DateTime date={currentItem.createdTime} />
            </DescriptionsItem>
            <DescriptionsItem label="内容" span={2}>
              {currentItem.content}
            </DescriptionsItem>
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
  const thisModule = state.adminPost!;
  return {
    userid: state.app!.curUser!.id,
    primaryMode: !!state.route.data.views.adminPost,
    currentItem: thisModule.currentItem,
  };
};

export default connect(mapStateToProps)(Component);
