import React from 'react';
import {Select} from 'antd';
import {SelectProps} from 'antd/lib/select';
import {purviewNames} from 'entity/role';

const {Option, OptGroup} = Select;

function generateOptions() {
  const options: {[key: string]: string[]} = {};
  Object.keys(purviewNames).forEach(item => {
    const [resource, action] = item.split('.');
    if (!action) {
      options[resource] = [];
    } else {
      options[resource].push(item);
    }
  });
  return options;
}

const options = generateOptions();

const filterOption = (input: string, option: React.ReactElement) => {
  const text = option.props.children;
  if (typeof text === 'string') {
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }
  return false;
};

const Component: React.FC<SelectProps<string[]>> = props => {
  return (
    <Select allowClear={true} placeholder="请选择用户权限" {...props} autoClearSearchValue={false} filterOption={filterOption as any}>
      {Object.keys(options).map(group => (
        <OptGroup key={group} label={purviewNames[group]}>
          {options[group].map(option => (
            <Option key={option} value={option}>
              {purviewNames[group] + ' > ' + purviewNames[option]}
            </Option>
          ))}
        </OptGroup>
      ))}
    </Select>
  );
};

export default React.memo(Component);
