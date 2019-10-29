import Activities from './Activities';
import ArticleBanner from 'components/ArticleBanner';
import Page from 'components/Page';
import React from 'react';
import banner from './imgs/banner.jpg';
import {connect} from 'react-redux';

interface StoreProps {}

class Component extends Page<StoreProps & DispatchProp> {
  onConsult = () => {
    this.props.dispatch(actions.articleLayout.showConsult());
  };

  public render() {
    return (
      <>
        <ArticleBanner
          title="Ant Design 售后服务"
          content="从 2015 年 4 月起，Ant Design 在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的 Ant Design 兼顾专业和非专业的设计人员。"
          bg={banner}
          onConsult={this.onConsult}
        />
        <Activities />
      </>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {};
};

export default connect(mapStateToProps)(Component);
