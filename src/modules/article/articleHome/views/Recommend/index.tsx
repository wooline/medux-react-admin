import {AlertOutlined, BugOutlined} from '@ant-design/icons';

import ImgAD from './imgs/ad.png';
import React from 'react';
import styles from './index.m.less';

const Component: React.FC = () => {
  return (
    <section className={`${styles.root}`} id="articleHome_Recommend">
      <div className="g-doc">
        <h2>特色推荐</h2>
        <div className="g-activities reverse g-clearfix">
          <article>
            <p>
              设计价值观为 <cite>Ant Design</cite> 的设计者以及基于 <cite>Ant Design</cite>
              进行产品设计的设计者，提供评价设计好坏的内在标准，并提供有效的设计实践所遵循的规则。同时，它启示并激发了设计原则和设计模式。
            </p>
            <ul>
              <li>在行为的执行中，充分利用行为分析、人工智能、传感器、元数据等一系列方式，辅助用户有效决策、减少用户额外操作，从而节省用户脑力和体力，让人机交互行为更自然。</li>
              <li>
                在感知和认知中，视觉系统扮演着最重要的角色，通过提炼自然界中的客观规律并运用到界面设计中，从而创建更有层次产品体验；同时，适时加入听觉系统、触觉系统等，创建更多维、更真实的产品体验。详见视觉语言
              </li>
            </ul>
          </article>
          <aside>
            <img width="600" height="350" src={ImgAD} />
          </aside>
        </div>
        <div className="summary g-clearfix">
          <div>
            <AlertOutlined />
            <h4>行业积累与技术沉淀</h4>
            <p>企业在相应行业和领域中拥有长期的业务积累，对市场与客户需求有深刻理解，并在行业内处于领先地位。</p>
          </div>
          <div>
            <BugOutlined />
            <h4>优质产品，业务创新</h4>
            <p>拥有被市场充分验证的优质产品与服务，创新产品形态和经营模式，提升客户价值，共同获得更高的市场收益</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Component);
