import {Button, Form, Icon} from 'antd';

import React from 'react';

const FormItem = Form.Item;

interface Props {
  items: {label: string; field?: string; item: React.ReactNode; col?: number}[];
  disableFields?: string[];
  senior?: number;
  cols?: number;
  expand?: boolean;
  onReset?: () => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

interface State {
  expand: boolean;
}

class Component extends React.PureComponent<Props, State> {
  constructor(props: any, context?: any) {
    super(props, context);
    this.state = {
      expand: !!props.expand,
    };
  }
  toggle = () => {
    const {expand} = this.state;
    this.setState({expand: !expand});
  };

  public render() {
    const {onSubmit, onReset, disableFields, cols = 4} = this.props;
    const disableFieldsMap: {[filed: string]: boolean} = disableFields
      ? disableFields.reduce((prev, cur) => {
          prev[cur] = true;
          return prev;
        }, {})
      : {};
    const items = !disableFields ? this.props.items : this.props.items.filter(item => !item.field || !disableFieldsMap[item.field]);
    const {senior = items.length} = this.props;
    const {expand} = this.state;
    const shrink = expand ? items.length : senior;

    const colWith = parseFloat((100 / cols).toFixed(2));
    const arr: number[] = [];
    let cur = 0;
    items.forEach(item => {
      const label = Math.ceil(item.label.replace(/[^\x00-\xff]/g, 'aa').length / 2);
      const col = item.col || 1;
      if (cur + col > cols) {
        cur = 0;
      }
      item['cite'] = cur;
      if (label > (arr[cur] || 0)) {
        arr[cur] = label;
      }
      cur = cur + col;
    });
    return (
      <div className="g-search">
        <Form layout="inline" onSubmit={onSubmit}>
          {items.map((item, index) => (
            <FormItem
              style={{display: index >= shrink ? 'none' : 'flex', width: colWith * (item.col || 1) + '%'}}
              key={index}
              label={
                <span className="label" style={{width: `${arr[item['cite']]}em`}}>
                  {item.label}
                </span>
              }
            >
              {item.item}
            </FormItem>
          ))}
          <div className="btns">
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button onClick={onReset}>重置</Button>
            {items.length > senior && (
              <a className="expand" onClick={this.toggle}>
                {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
              </a>
            )}
          </div>
        </Form>
      </div>
    );
  }
}

export default Component;
