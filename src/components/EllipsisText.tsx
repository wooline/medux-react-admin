import {Popover} from 'antd';
import React from 'react';

interface Props {}
class Component extends React.PureComponent<Props> {
  private subDom = React.createRef<HTMLSpanElement>();
  public render() {
    return (
      <Popover placement="topLeft" content={this.props.children}>
        <span ref={this.subDom}>{this.props.children}</span>
      </Popover>
    );
  }
  componentDidMount() {
    this.subDom.current && (this.subDom.current.parentNode! as HTMLDivElement).removeAttribute('title');
  }
}

export default Component;
