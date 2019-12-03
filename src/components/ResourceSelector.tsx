import {Input, Modal} from 'antd';

import React from 'react';

interface Props<Record> {
  limit?: number;
  allowClear?: boolean;
  placeholder?: string;
  value?: Record[];
  onChange?: (value?: Record[]) => void;
  width?: number;
  title?: React.ReactNode;
  children?: React.ReactElement<{placeholder?: string; allowClear?: boolean; value?: Record[]; onChange?: (value: Record[]) => void}>;
  selector: React.ComponentType<{onChange: (value?: Record[]) => void}>;
}
interface State<Record> {
  value?: Record[];
  showModal?: boolean;
}
class Component<Record = {id: string; name: string}> extends React.PureComponent<Props<Record>, State<Record>> {
  state: State<Record> = {};
  onSelectorChange = (value?: Record[]) => {
    this.setState({value});
  };
  onInputChange = () => {
    console.log('clear');
  };
  onClick = () => {
    this.setState({showModal: true});
  };
  onCloseModal = () => {
    this.setState({showModal: false});
  };
  public render() {
    const {title, width = 1200, placeholder, limit = 1, allowClear, children = <Input autoComplete="off" />} = this.props;
    const {showModal, value} = this.state;
    return (
      <div>
        {React.cloneElement(children, {value, placeholder, allowClear, onClick: this.onClick, onChange: this.onInputChange})}
        <Modal visible={showModal} footer={null} title={title} width={width} onCancel={this.onCloseModal}>
          <this.props.selector onChange={this.onSelectorChange} />
        </Modal>
      </div>
    );
  }
}

export default Component;
