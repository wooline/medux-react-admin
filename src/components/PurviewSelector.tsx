import React from 'react';
import {Select} from 'antd';
import {SelectProps} from 'antd/lib/select';
import {purviewNames} from 'entity/role';

const {Option, OptGroup} = Select;

function generateOptions() {
  const options: {[key: string]: string[]} = {};
  Object.keys(purviewNames).forEach(item => {
    const arr = item.split('.');
    if (!arr[1]) {
      options[arr[0]] = [];
    } else {
      options[arr[0]].push(item);
    }
  });
  return options;
}

const options = generateOptions();

class Component extends React.PureComponent<SelectProps> {
  filterOption = (input: string, option: React.ReactElement) => {
    const text = option.props.children;
    if (typeof text === 'string') {
      return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    return false;
  };
  public render() {
    return (
      <Select allowClear={true} placeholder="请选择用户权限" {...this.props} autoClearSearchValue={false} filterOption={this.filterOption}>
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
  }
}

export default Component;
