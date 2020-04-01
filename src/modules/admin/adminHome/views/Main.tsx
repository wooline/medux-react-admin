import {Card, Col, Row} from 'antd';
import {Divider, Typography} from 'antd';

import React from 'react';
import {connect} from 'react-redux';

const {Title, Paragraph, Text} = Typography;

const Component: React.FC = () => {
  return (
    <div className="g-adminPage">
      <h1>关于本例</h1>
      <div>
        <Typography>
          <Paragraph>网上通用的后台管理系统很多，本Demo的意义不在于提供丰富的控件和面板，而是演示解题思路。</Paragraph>
          <Paragraph>
            <ul>
              <li>本Demo使用面向资源的抽象模型为现实业务提供通用的工程方案</li>
              <li>本Demo的意义不在于提供丰富的控件和面板，而是演示独特的解题思路</li>
              <li>本Demo倡导的通用性不仅在于UI界面，更体现在模块化与状态管理</li>
            </ul>
          </Paragraph>
          <Title level={2}>介绍</Title>
          <Paragraph>
            现实业务纷繁复杂，作者一直在思考能否提炼出某些通用的代码与标准件呢？借鉴于后端Restful的思路，一切业务场景都可以抽象为面向资源的CRUD，或许该理念同样适应于前端开发。
            界面的交互实际上都是围绕着对Resource的增删改查来展开交互。
            <ul>
              <li>首先，我们将每种资源定义为一个独立的module，所有对其的维护都放在此module中</li>
              <li>本Demo的意义不在于提供丰富的控件和面板，而是演示独特的解题思路</li>
              <li>本Demo倡导的通用性不仅在于UI界面，更体现在模块化与状态管理</li>
            </ul>
          </Paragraph>
        </Typography>
      </div>
    </div>
  );
};

export default connect()(React.memo(Component));
