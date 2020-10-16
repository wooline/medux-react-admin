import Anchor from 'components/Anchor';
import ArticleBanner from 'components/ArticleBanner';
import React from 'react';
import {connect} from 'react-redux';
import useAnchorPage from 'hooks/useAnchorPage';
import useConsult from 'hooks/useConsult';
import Recommend from './Recommend';
import Special from './Special';
import banner from './imgs/banner.jpg';
import Activities from './Activities';

interface StoreProps {
  hash: string;
}
const Component: React.FC<StoreProps & DispatchProp> = ({dispatch, hash}) => {
  useAnchorPage(hash, historyActions);
  const onConsult = useConsult(dispatch);
  return (
    <>
      <ArticleBanner
        title="Demo 用户指南"
        content="主要用于研发企业级中后台产品。服务于企业级产品的设计体系，基于确定和自然的设计价值观上的模块化解决方案，让设计者和开发者专注于更好的用户体验。"
        bg={banner}
        onConsult={onConsult}
      />
      <Anchor
        navs={[
          ['摘要简介', 'articleHome_Activities'],
          ['特色推荐', 'articleHome_Recommend'],
          ['技术优势', 'articleHome_Special'],
        ]}
      />
      <Activities />
      <Recommend />
      <Special />
    </>
  );
};

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  return {
    hash: state.route.location.hash,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
