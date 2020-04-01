import {CloseCircleOutlined, PlusCircleOutlined} from '@ant-design/icons';
import React, {useCallback} from 'react';

import {Popover} from 'antd';
import {TabNav} from 'entity';
import TabNavEditor from '../TabNavEditor';
import {connect} from 'react-redux';
import styles from './index.m.less';

interface StoreProps {
  tabNavCurId?: string;
  tabNavEditor?: TabNav;
  tabNavs: TabNav[];
}

const Component: React.FC<StoreProps & DispatchProp> = ({dispatch, tabNavs, tabNavCurId, tabNavEditor}) => {
  const onDelItem = useCallback(
    (item: TabNav) => {
      dispatch(actions.adminLayout.delTabNav(item.id));
    },
    [dispatch]
  );

  const onClickItem = useCallback(
    (item: TabNav) => {
      dispatch(actions.adminLayout.clickTabNav(item));
    },
    [dispatch]
  );
  const onCloseEditor = useCallback(() => {
    dispatch(actions.adminLayout.closeTabNavEditor());
  }, [dispatch]);
  const onSwitchCreator = useCallback(
    (open: boolean) => {
      if (open) {
        dispatch(actions.adminLayout.openTabNavCreator());
      } else {
        dispatch(actions.adminLayout.closeTabNavEditor());
      }
    },
    [dispatch]
  );

  return (
    <div className={styles.root}>
      {tabNavs.map((item) => (
        <div key={item.id} className={item.id === tabNavCurId ? 'cur' : ''}>
          <Popover
            content={!!tabNavEditor && tabNavEditor.id === item.id ? <TabNavEditor /> : <div style={{width: 190, height: 135}}></div>}
            trigger="click"
            visible={!!tabNavEditor && tabNavEditor.id === item.id}
            onVisibleChange={(visible) => {
              if (visible) {
                onClickItem(item);
              } else {
                onCloseEditor();
              }
            }}
          >
            <span className="trigger">trigger</span>
          </Popover>
          <span className="title">{item.title}</span>
          <CloseCircleOutlined className="action" onClick={() => onDelItem(item)} />
        </div>
      ))}
      <Popover
        onVisibleChange={onSwitchCreator}
        visible={!!tabNavEditor && !tabNavEditor.id}
        content={!!tabNavEditor && !tabNavEditor.id ? <TabNavEditor /> : <div style={{width: 190, height: 135}}></div>}
        trigger="click"
      >
        <div style={{flex: 'none'}}>
          <PlusCircleOutlined /> 收藏
        </div>
      </Popover>
    </div>
  );
};

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  const adminLayout = state.adminLayout!;
  return {
    tabNavs: adminLayout.tabNavs,
    tabNavCurId: adminLayout.tabNavCurId,
    tabNavEditor: adminLayout.tabNavEditor,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
