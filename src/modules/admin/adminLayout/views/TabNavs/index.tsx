import {Icon, Popover} from 'antd';

import React from 'react';
import {TabNav} from 'entity/common';
import TabNavEditor from '../TabNavEditor';
import {connect} from 'react-redux';
import styles from './index.m.less';

interface StoreProps {
  tabNavCurId?: string;
  tabNavEditor?: TabNav;
  tabNavs: TabNav[];
}

class Component extends React.PureComponent<StoreProps & DispatchProp> {
  onDelItem = (item: TabNav) => {
    this.props.dispatch(actions.adminLayout.delTabNav(item.id));
  };
  onClickItem = (item: TabNav) => {
    this.props.dispatch(actions.adminLayout.clickTabNav(item));
  };
  onCloseEditor = () => {
    this.props.dispatch(actions.adminLayout.closeTabNavEditor());
  };
  onSwitchCreator = (open: boolean) => {
    if (open) {
      this.props.dispatch(actions.adminLayout.openTabNavCreator());
    } else {
      this.props.dispatch(actions.adminLayout.closeTabNavEditor());
    }
  };
  render() {
    const {tabNavs, tabNavCurId, tabNavEditor} = this.props;
    return (
      <div className={styles.root}>
        {tabNavs.map(item => (
          <div key={item.id} className={item.id === tabNavCurId ? 'cur' : ''}>
            <Popover
              content={<TabNavEditor />}
              trigger="click"
              visible={Boolean(tabNavEditor && tabNavEditor.id === item.id)}
              onVisibleChange={visible => {
                if (visible) {
                  this.onClickItem(item);
                } else {
                  this.onCloseEditor();
                }
              }}
            >
              <span className="trigger">trigger</span>
            </Popover>
            <span className="title">{item.title}</span>
            <Icon className="action" type="close-circle" onClick={() => this.onDelItem(item)} />
          </div>
        ))}
        <Popover onVisibleChange={this.onSwitchCreator} visible={Boolean(tabNavEditor && !tabNavEditor.id)} content={<TabNavEditor />} trigger="click">
          <div style={{flex: 'none'}}>
            <Icon type="plus-circle-o" /> 收藏
          </div>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  const adminLayout = state.adminLayout!;
  return {
    tabNavs: adminLayout.tabNavs,
    tabNavCurId: adminLayout.tabNavCurId,
    tabNavEditor: adminLayout.tabNavEditor,
  };
};

export default connect(mapStateToProps)(Component);
