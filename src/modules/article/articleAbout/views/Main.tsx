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
        <ArticleBanner title="关于我们的故事" content="所谓的功能：并非只存在于「人」或「工具」一方，而是借由双方的力量进行融合。" bg={banner} onConsult={this.onConsult} />
        <Activities />
      </>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {};
};

export default connect(mapStateToProps)(Component);
