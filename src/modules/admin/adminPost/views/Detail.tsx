import {Button, Descriptions} from 'antd';
import {DStatus, ItemDetail} from 'entity/post';
import {DeleteOutlined, FormOutlined} from '@ant-design/icons';
import React, {useCallback} from 'react';

import DateTime from 'components/DateTime';
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
  const {onHide, onEdit, onDelete} = useDetail(dispatch, actions.adminPost, currentItem);
  const disabled = currentItem.fixed ? 'disable' : '';
  const onShowMembers = useCallback(
    (username: string) => {
      dispatch(actions.adminMember.noneListSearch({username}));
    },
    [dispatch]
  );
  return (
    <div className={styles.root}>
      <Descriptions bordered column={2}>
        <DescriptionsItem label="标题" span={2}>
          {currentItem.title}
        </DescriptionsItem>
        <DescriptionsItem label="作者">{<a onClick={() => onShowMembers(currentItem.author.id)}>{currentItem.author.name}</a>}</DescriptionsItem>
        <DescriptionsItem className="g-items" label="责任编辑">
          {currentItem.editors.map((editor) => (
            <a key={editor.id} onClick={() => onShowMembers(editor.id)}>
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
