import {DatePicker} from 'antd';
import {RangePickerValue} from 'antd/lib/date-picker/interface';
import React from 'react';
import ShortcutDatePicker from 'components/ShortcutDatePicker';
import moment from 'moment';

export interface Props {
  className?: string;
  exclude?: ('Week' | 'Month' | 'HalfYear' | 'Year')[];
  layoutReverse?: boolean;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  style?: React.CSSProperties;
}

class Component extends React.PureComponent<Props, {}> {
  handleChange = (dates: RangePickerValue) => {
    const start = dates[0] ? dates[0].startOf('day').valueOf() : 0;
    const end = dates[1] ? dates[1].endOf('day').valueOf() : 0;
    this.props.onChange && this.props.onChange([start, end]);
  };
  render() {
    let value = this.props.value || [0, 0];
    const start = value[0] ? moment(value[0]) : undefined;
    const end = value[1] ? moment(value[1]) : undefined;
    if (this.props.layoutReverse) {
      return (
        <div className={this.props.className} style={{...this.props.style}}>
          <ShortcutDatePicker exclude={this.props.exclude} value={value} onChange={this.props.onChange} />
          <DatePicker.RangePicker value={[start, end] as any} onChange={this.handleChange} />
        </div>
      );
    } else {
      return (
        <div className={this.props.className} style={{...this.props.style}}>
          <DatePicker.RangePicker value={[start, end] as any} onChange={this.handleChange} />
          <ShortcutDatePicker exclude={this.props.exclude} value={value} onChange={this.props.onChange} style={{marginLeft: '10px'}} />
        </div>
      );
    }
  }
}

export default Component;
