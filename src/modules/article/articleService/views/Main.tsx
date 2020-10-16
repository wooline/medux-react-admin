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
      <ArticleBanner
        title="Ant Design 售后服务"
        content="从 2015 年 4 月起，Ant Design 在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的 Ant Design 兼顾专业和非专业的设计人员。"
        bg={banner}
        onConsult={onConsult}
      />
      <Activities />
    </>
  );
};

export default connect()(React.memo(Component));
