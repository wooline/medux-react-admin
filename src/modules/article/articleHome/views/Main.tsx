import Activities from './Activities';
import Anchor from 'components/Anchor';
import Banner from './Banner';
import React from 'react';
import Recommend from './Recommend';
import Special from './Special';
import {connect} from 'react-redux';

interface StoreProps {}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    return (
      <>
        <Banner />
        <Anchor navs={[['摘要简介', 'articleHome_Activities'], ['特色推荐', 'articleHome_Recommend'], ['技术优势', 'articleHome_Special']]} />
        <Activities />
        <Recommend />
        <Special />
      </>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {};
};

export default connect(mapStateToProps)(Component);
