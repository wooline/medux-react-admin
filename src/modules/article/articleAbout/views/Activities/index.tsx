import ImgAD from './imgs/ad.png';
import Logo1 from './imgs/logo1.png';
import Logo2 from './imgs/logo2.png';
import Logo3 from './imgs/logo3.png';
import Logo4 from './imgs/logo4.png';
import React from 'react';
import styles from './index.m.less';

interface StoreProps {}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    return (
      <section className={`${styles.root} g-doc`} id="articleHome_Activities">
        <h2>关于我们</h2>
        <article>
          <p>
            一年前，我们将「自然」确立为 Ant Design 的核心价值观，来指导我们的设计工作。一年来，越来越多的产品通过使用 Ant Design 为成千上万用户提供优质的企业级服务；同时，也有越来越多的设计体系基于
            Ant Design 蓬勃生长。这一次，我们将清晰阐述「自然」这一价值观，希望能启发或帮助大家完成自己的产品 / 体系构建；同时，你们的反馈和互动也会成为我们进步的源泉和动力。
          </p>

          <p>
            对比建筑设计和工业设计，人机交互设计是一个相对年轻的领域，同时这三个领域又有诸多共性。纵观几十年的人机交互应用史，我们经历过初期的
            TCD（以技术为核心的设计）、BCD（以商业为核心的设计），直到现在拨乱反正的
            UCD（以用户为核心的设计）。那么未来会走向哪里？发展了几千年的建筑设计和几百年的工业设计，目前已经很少提及以用户为核心的设计。尤其在建筑设计领域，我们更多感受到的是大师对于人、环境、建筑三者和谐共处的探讨和实践。
          </p>

          <p>我们可以以史为鉴，从建筑领域、工业产品领域获取灵感，来观察整个人机交互的发展现状，以及推测未来的发展方向。</p>

          <p>所谓的功能：并非只存在于「人」或「工具」一方，而是借由双方的力量进行融合。 ——深泽直人</p>
          <p>
            先看
            Hammer的设计。考虑到人在使用锤子时，需要很大力气敲击，但是由于塑料材质比较滑，所以设计师在手柄的下半部分添加了黑色橡胶，通过增强摩擦力。这看起来没问题，却忽略了一些使用细节。人在使用锤子时，往往先握住手柄中上部将钉子定位；再滑到手柄底部，大力敲打钉子。而这额外的橡胶却阻碍了滑动。
          </p>

          <p>
            再看金槌的设计。由于是木制手柄，在一开始使用时没有多大区别。但是多次滑动和大力握持后，人的手汗和劲道会和木制手柄发生反应，从而改变手柄的形状。这些重复的互动行为，让手柄中部光滑，从而容易滑动；让手柄底部出现握痕，从而更容易施力。
          </p>
        </article>
      </section>
    );
  }
}

export default Component;
