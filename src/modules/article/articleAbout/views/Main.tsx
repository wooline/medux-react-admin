import ArticleBanner from 'components/ArticleBanner';
import React from 'react';
import {connect} from 'react-redux';
import useConsult from 'hooks/useConsult';
import banner from './imgs/banner.jpg';
import Activities from './Activities';

const Component: React.FC<DispatchProp> = ({dispatch}) => {
  const onConsult = useConsult(dispatch);
  return (
    <>
      <ArticleBanner title="关于我们的故事" content="所谓的功能：并非只存在于「人」或「工具」一方，而是借由双方的力量进行融合。" bg={banner} onConsult={onConsult} />
      <Activities />
    </>
  );
};

export default connect()(React.memo(Component));
