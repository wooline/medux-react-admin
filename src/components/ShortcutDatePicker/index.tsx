import './index.scss';

import {Radio} from 'antd';
import {RadioChangeEvent} from 'antd/lib/radio';
import React from 'react';
import moment from 'moment';

const {Group, Button} = Radio;

enum Values {
  Week = 'Week',
  Month = 'Month',
  HalfYear = 'HalfYear',
  Year = 'Year',
}
const formatStr = 'YYYY-MM-DD';
export interface Props {
  exclude?: ('Week' | 'Month' | 'HalfYear' | 'Year')[];
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  style?: React.CSSProperties;
}

class Component extends React.PureComponent<Props, {}> {
  handleChange = (e: RadioChangeEvent) => {
    const today = moment().endOf('day');
    const end = today.valueOf();
    const value: Values = e.target.value;
    let start = 0;
    switch (value) {
      case Values.Week:
        start = today
          .subtract(1, 'week')
          .startOf('day')
          .valueOf();
        break;
      case Values.Month:
        start = today
          .subtract(1, 'month')
          .startOf('day')
          .valueOf();
        break;
      case Values.HalfYear:
        start = today
          .subtract(6, 'month')
          .startOf('day')
          .valueOf();
        break;
      case Values.Year:
        start = today
          .subtract(1, 'year')
          .startOf('day')
          .valueOf();
        break;
    }
    this.props.onChange && this.props.onChange([start, end]);
  };
  render() {
    const {exclude = ['HalfYear']} = this.props;
    const mapExclude = exclude.reduce((prev, cur) => {
      prev[cur] = 1;
      return prev;
    }, {});
    let value = this.props.value || [0, 0];
    const start = value[0] ? moment(value[0]) : null;
    const end = value[1] ? moment(value[1]) : null;
    const today = moment().format(formatStr);
    let cur: Values | null = null;
    if (start && end && end.format(formatStr) === today) {
      const startStr = start.format(formatStr);
      if (
        moment()
          .subtract(1, 'week')
          .format(formatStr) === startStr
      ) {
        cur = Values.Week;
      } else if (
        moment()
          .subtract(1, 'month')
          .format(formatStr) === startStr
      ) {
        cur = Values.Month;
      } else if (
        moment()
          .subtract(6, 'month')
          .format(formatStr) === startStr
      ) {
        cur = Values.HalfYear;
      } else if (
        moment()
          .subtract(1, 'year')
          .format(formatStr) === startStr
      ) {
        cur = Values.Year;
      }
    }
    return (
      <div styleName="root">
        <Group onChange={this.handleChange} value={cur} style={{...this.props.style}}>
          {!mapExclude['Week'] && <Button value={Values.Week}>近一周</Button>}
          {!mapExclude['Month'] && <Button value={Values.Month}>近一月</Button>}
          {!mapExclude['HalfYear'] && <Button value={Values.HalfYear}>近半年</Button>}
          {!mapExclude['Year'] && <Button value={Values.Year}>近一年</Button>}
        </Group>
      </div>
    );
  }
}

export default Component;
