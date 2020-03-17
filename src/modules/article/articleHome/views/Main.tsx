import React, {useCallback} from 'react';

import Activities from './Activities';
import Anchor from 'components/Anchor';
import ArticleBanner from 'components/ArticleBanner';
import Recommend from './Recommend';
import {RouteComponentProps} from 'react-router';
import Special from './Special';
import banner from './imgs/banner.jpg';
import {connect} from 'react-redux';
import useAnchorPage from 'hooks/useAnchorPage';

const Component: React.FC<DispatchProp & RouteComponentProps> = ({dispatch, location, history}) => {
  useAnchorPage(location.hash, history);
  const onConsult = useCallback(() => {
    dispatch(actions.articleLayout.showConsult());
  }, [dispatch]);
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

export default connect()(React.memo(Component));
