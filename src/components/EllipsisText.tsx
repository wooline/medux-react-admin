import {Popover} from 'antd';
import React from 'react';

interface Props {}
class Component extends React.PureComponent<Props> {
  public render() {
    return (
      <Popover placement="topLeft" content={this.props.children}>
        {this.props.children}
      </Popover>
    );
  }
}

export default Component;
