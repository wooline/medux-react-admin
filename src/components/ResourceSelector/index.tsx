import {Input, Modal} from 'antd';

import React from 'react';
import styles from './index.m.less';

interface Item {
  id: string;
  name?: string;
}

interface Props<Resource = any, Value = any> {
  limit?: number | [number, number];
  allowClear?: boolean;
  placeholder?: string;
  value?: Value | Value[];
  onChange?: (value?: Value | Value[]) => void;
  width?: number;
  title?: React.ReactNode;
  children?: React.ReactElement<{placeholder?: string; allowClear?: boolean; value?: Value[]; onChange?: (value?: Value[]) => void}>;
  resourceNameField?: string;
  resourceToValue?: (record: Resource) => Value;
  valueToResource?: (Value: Value) => Resource;
  resource: React.ComponentType<{limit?: number | [number, number]; value?: Resource[]; onChange?: (items: Resource[]) => void}>;
}
interface State<Resource = any, Value = any> {
  value: Value[];
  items: Resource[];
  showModal: boolean;
}

function equalValue(a: Item[], b: Item[]): boolean {
  return a.map(item => item.id).join(',') === b.map(item => item.id).join(',');
}
function getLimitTips(limit: number | [number, number]): string {
  if (typeof limit === 'number') {
    return `可选择 ${limit === 0 ? '多项' : limit} 项`;
  } else {
    const [min, max] = limit;
    return `可选择${min}-${max === 0 ? '多项' : 'max'}项`;
  }
}

function defValueToResource(props: Props, value: Item): Item {
  const {resourceNameField = 'name'} = props;
  return {id: value.id, [resourceNameField]: value.name};
}
class Component<Resource extends Item = Item, Value extends Item = Item> extends React.PureComponent<Props<Resource, Value>, State<Resource, Value>> {
  static getDerivedStateFromProps(nextProps: Props<Item, Item>, prevState: State<Item, Item>): State<Item, Item> | null {
    let {value = []} = nextProps;
    value = Array.isArray(value) ? value : [value];
    if (!equalValue(value, prevState.value)) {
      const resourceToValue = nextProps.valueToResource || defValueToResource.bind(null, nextProps);
      return {
        value,
        items: value.map(resourceToValue),
        showModal: prevState.showModal,
      };
    }

    return null;
  }
  state: State<Resource, Value> = {
    value: [],
    items: [],
    showModal: false,
  };
  defResourceToValue = (record: Resource) => {
    const {resourceNameField = 'name'} = this.props;
    return {id: record.id, name: record[resourceNameField]} as Value;
  };
  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      this.setState({items: []}, this.onOk);
    }
  };
  onClick = () => {
    this.setState({showModal: true});
  };
  onCloseModal = () => {
    this.setState({showModal: false});
  };
  onOk = () => {
    const resourceToValue = this.props.resourceToValue || this.defResourceToValue;
    const {limit = 1} = this.props;
    const items = this.state.items;
    let value: Value | Value[] | undefined = undefined;
    if (items.length) {
      if (limit === 1) {
        value = items.map(resourceToValue)[0];
      } else {
        value = items.map(resourceToValue);
      }
    }
    this.props.onChange && this.props.onChange(value);
    this.setState({showModal: false});
  };
  onSelect = (items: Resource[]) => {
    const {limit = 1} = this.props;
    let max = typeof limit === 'number' ? limit : limit[1];
    if (max === 0) {
      max = Infinity;
    }
    if (items.length < max) {
      this.setState({items});
    } else if (items.length === max) {
      this.setState({items}, this.onOk);
    } else {
      if (max === 1) {
        const cur = this.state.items && this.state.items[0];
        this.setState({items: cur ? items.filter(item => item.id !== cur.id).slice(0, 1) : items.slice(0, 1)}, this.onOk);
      } else {
        message.error(`您最多只能选择${max}项`);
      }
    }
  };
  public render() {
    const {title, width = 1200, placeholder, allowClear, limit = 1} = this.props;
    let children = this.props.children;
    const {showModal, items, value} = this.state;

    let inputValue: string[] = [];
    if (!children) {
      children = <Input readOnly autoComplete="off" />;
      inputValue = value.map(item => item.name || item.id);
    }
    return (
      <div>
        {React.cloneElement(children, {value: inputValue, placeholder, allowClear, onClick: this.onClick, onChange: this.onInputChange})}
        <Modal
          className={styles.root}
          visible={showModal}
          title={
            <>
              {title}
              <span>* {getLimitTips(limit)}</span>
            </>
          }
          width={width}
          onCancel={this.onCloseModal}
          onOk={this.onOk}
        >
          <this.props.resource limit={limit} onChange={this.onSelect} value={items} />
        </Modal>
      </div>
    );
  }
}

export default Component;
