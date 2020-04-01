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

  const {colWith, arr} = useMemo(() => {
    const colWith = parseFloat((100 / cols).toFixed(2));
    const arr: number[] = [];
    let cur = 0;
    list.forEach((item) => {
      const label = Math.ceil(item.label!.replace(/[^\x00-\xff]/g, 'aa').length / 2);
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
    return {colWith, arr};
  }, [cols, list]);
  const fields = useMemo(() => {
    return values ? Object.keys(values).map((name) => ({name, value: values[name]})) : [];
  }, [values]);
  const onFinishHandler = useEventCallback(
    (values: T) => {
      Object.assign(values, fixedFields);
      onFinish(values);
    },
    [fixedFields, onFinish]
  );
  const toggle = useCallback(() => {
    setExpand((expand) => !expand);
  }, []);
  return (
    <div className="g-search">
      <Form layout="inline" onFinish={onFinishHandler as any} fields={fields}>
        {list.map((item, index) => (
          <Form.Item
            name={item.name}
            rules={item.rules}
            style={{display: index >= shrink ? 'none' : 'flex', width: colWith * (item.col || 1) + '%'}}
            key={item.name}
            label={
              <span className="label" style={{width: `${arr[item['cite']]}em`}}>
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
