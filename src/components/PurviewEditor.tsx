import {Checkbox} from 'antd';
import {CheckboxChangeEvent} from 'antd/lib/checkbox';
import React from 'react';

import {purviewNames} from 'entity/role';
import useEventCallback from 'hooks/useEventCallback';

const options: {[key: string]: string[]} = {};
Object.keys(purviewNames).forEach((item) => {
  const [resource, action] = item.split('.');
  if (!action) {
    options[resource] = [];
  } else {
    options[resource].push(item);
  }
});

interface Props {
  value?: string[];
  onChange?: (value?: string[]) => void;
}
const Component: React.FC<Props> = ({value = [], onChange}) => {
  const onItemChange = useEventCallback(
    (e: CheckboxChangeEvent) => {
      if (onChange) {
        const {checked, name = ''} = e.target;
        if (!checked) {
          const arr = value.filter((item) => item !== name);
          onChange(arr.length ? arr.sort() : undefined);
        } else {
          onChange([...value, name].sort());
        }
      }
    },
    [onChange, value]
  );
  const onResourceChange = useEventCallback(
    (e: CheckboxChangeEvent) => {
      if (onChange) {
        const {checked, name = ''} = e.target;
        if (!checked) {
          const arr = value.filter((item) => item.split('.')[0] !== name);
          onChange(arr.length ? arr.sort() : undefined);
        } else {
          onChange(Array.from(new Set([...value, ...options[name]])).sort());
        }
      }
    },
    [onChange, value]
  );

  const purviews: {[key: string]: boolean} = value.reduce((pre, cur) => {
    pre[cur] = true;
    return pre;
  }, {});
  const items: {[key: string]: string[]} = value.reduce((pre, cur) => {
    const [resource] = cur.split('.');
    if (!pre[resource]) {
      pre[resource] = [];
    }
    pre[resource].push(cur);
    return pre;
  }, {});
  return (
    <dl>
      {Object.keys(purviewNames).map((item) => {
        const [, action] = item.split('.');
        return action ? (
          <dd key={item}>
            <Checkbox onChange={onItemChange} checked={purviews[item]} name={item} />
            {purviewNames[item]}
          </dd>
        ) : (
          <dt key={item}>
            <Checkbox onChange={onResourceChange} checked={items[item] && items[item].length === options[item].length} name={item} />
            {purviewNames[item]}
          </dt>
        );
      })}
    </dl>
  );
};

export default React.memo(Component);
