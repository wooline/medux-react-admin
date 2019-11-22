import {RangePickerProps, RangePickerValue} from 'antd/lib/date-picker/interface';

import {DatePicker} from 'antd';
import React from 'react';
import moment from 'moment';

export interface Props {
  className?: string;
  allowClear?: boolean;
  style?: React.CSSProperties;
  disabledDate?: (currentDate: moment.Moment | undefined) => boolean;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
}

class Component extends React.PureComponent<Props, {}> {
  handleChange = (dates: RangePickerValue) => {
    const start = dates[0] ? dates[0].startOf('day').valueOf() : 0;
    const end = dates[1] ? dates[1].endOf('day').valueOf() : 0;
    this.props.onChange && this.props.onChange([start, end]);
  };
  render() {
    const {disabledDate, allowClear = true, className, style} = this.props;
    const value = this.props.value || [0, 0];
    const start = value[0] ? moment(value[0]) : undefined;
    const end = value[1] ? moment(value[1]) : undefined;
    const today = moment().endOf('day');
    return (
      <DatePicker.RangePicker
        className={className}
        style={style}
        disabledDate={disabledDate}
        allowClear={allowClear}
        value={[start, end] as any}
        ranges={{
          今天: [moment().startOf('day'), moment().endOf('day')],
          本周: [moment().startOf('week'), moment().endOf('week')],
          本月: [moment().startOf('month'), moment().endOf('month')],
          今年: [moment().startOf('year'), moment().endOf('year')],
          近周: [
            moment()
              .subtract(1, 'week')
              .startOf('day'),
            today,
          ],
          近月: [
            moment()
              .subtract(1, 'month')
              .startOf('day'),
            today,
          ],
          近年: [
            moment()
              .subtract(1, 'year')
              .startOf('day'),
            today,
          ],
        }}
        onChange={this.handleChange}
      />
    );
  }
}

export default Component;
