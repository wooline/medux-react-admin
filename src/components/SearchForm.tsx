import {Button, Form} from 'antd';

import {DownOutlined, UpOutlined} from '@ant-design/icons';
import React, {useCallback, useMemo, useState} from 'react';
import {FromItem} from 'common/utils';
import useEventCallback from 'hooks/useEventCallback';

interface Props<FormData> {
  items: FromItem<Extract<keyof FormData, string>>[];
  onFinish: (values: FormData) => void;
  values?: Partial<FormData>;
  fixedFields?: Partial<FormData>;
  senior?: number;
  cols?: number;

  expand?: boolean;
  onReset?: () => void;
}

function Component<T>(props: Props<T>) {
  const {items, onFinish, onReset, fixedFields, values, cols = 4} = props;
  const [expand, setExpand] = useState(() => {
    return !!props.expand;
  });
  const list = useMemo(() => {
    return fixedFields ? items.filter((item) => fixedFields[item.name!] === undefined) : items;
  }, [fixedFields, items]);
  const {senior = list.length} = props;
  const shrink = expand ? list.length : senior;

  const {colWidth, arr} = useMemo(() => {
    const cWidth = parseFloat((100 / cols).toFixed(2));
    const cArr: number[] = [];
    let cur = 0;
    list.forEach((item) => {
      // eslint-disable-next-line no-control-regex
      const label = Math.ceil(item.label!.replace(/[^\x00-\xff]/g, 'aa').length / 2);
      const col = item.col || 1;
      if (cur + col > cols) {
        cur = 0;
      }
      item.cite = cur;
      if (label > (cArr[cur] || 0)) {
        cArr[cur] = label;
      }
      cur += col;
    });
    return {colWidth: cWidth, arr: cArr};
  }, [cols, list]);
  const fields = useMemo(() => {
    return values ? Object.keys(values).map((name) => ({name, value: values[name]})) : [];
  }, [values]);
  const onFinishHandler = useEventCallback(
    (vals: T) => {
      Object.assign(vals, fixedFields);
      onFinish(vals);
    },
    [fixedFields, onFinish]
  );
  const toggle = useCallback(() => {
    setExpand((_expand) => !_expand);
  }, []);
  return (
    <div className="g-search">
      <Form layout="inline" onFinish={onFinishHandler as any} fields={fields}>
        {list.map((item, index) => (
          <Form.Item
            name={item.name}
            rules={item.rules}
            style={{display: index >= shrink ? 'none' : 'flex', width: `${colWidth * (item.col || 1)}%`}}
            key={item.name}
            label={
              <span className="label" style={{width: `${arr[item.cite!]}em`}}>
                {item.label}
              </span>
            }
          >
            {item.formItem!}
          </Form.Item>
        ))}
        <div className="btns">
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button onClick={onReset}>重置</Button>
          {list.length > senior && (
            <a className="expand" onClick={toggle}>
              {expand ? '收起' : '展开'} {expand ? <UpOutlined /> : <DownOutlined />}
            </a>
          )}
        </div>
      </Form>
    </div>
  );
}

export default React.memo(Component) as typeof Component;
