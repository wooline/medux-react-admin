import React from 'react';
import ImgAD from './imgs/ad.jpg';
import styles from './index.m.less';

const Component: React.FC = () => {
  return (
    <section className={`${styles.root} g-doc`} id="articleHome_Special">
      <h2>技术优势</h2>
      <div>
        <img alt="logo" width="680" height="440" src={ImgAD} />
      </div>
      <div className="superiority g-clearfix">
        <figure>
          <h4 className="item1">企业展示</h4>
          <p>通过入驻平台，联合开展市场营销，有利于进步扩大其他的宣传力度</p>
        </figure>
        <figure>
          <h4 className="item2">赋能升级</h4>
          <p>通过提供专业的技术，帮助中小型产业赋能AI，实现企业升级</p>
        </figure>
        <figure>
          <h4 className="item3">专业技术</h4>
          <p>专业的架构师团队支持合作伙伴构架解决方案，实现互联互通</p>
        </figure>
        <figure>
          <h4 className="item4">国内领先</h4>
          <p>平台自身在技术上具有领先的优势，通过合作致力于打造全球生态</p>
        </figure>
      </div>
    </section>
  );
};

export default React.memo(Component);
