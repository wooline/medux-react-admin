import React, {useCallback, useMemo} from 'react';

import {DatePicker} from 'antd';
import moment from 'moment';
import useEventCallback from 'hooks/useEventCallback';

export interface Props {
  className?: string;
  allowClear?: boolean;
  style?: React.CSSProperties;
  disabledDate?: (currentDate: moment.Moment | null) => boolean;
  value?: [number, number];
  onChange?: (value?: [number, number]) => void;
}

const Component: React.FC<Props> = (props) => {
  const {value, onChange, disabledDate, allowClear = true, className, style} = props;
  const handleChange = useEventCallback(
    (dates: any) => {
      if (dates && dates[0] && dates[1]) {
        const start = dates[0].startOf('day').valueOf();
        const end = dates[1].endOf('day').valueOf();
        onChange && onChange([start, end]);
      } else {
        onChange && onChange(undefined);
      }
    },
    [onChange]
  );
  const ranges = useMemo<{[key: string]: [any, any]}>(() => {
    const today = moment().endOf('day');
    return {
      今天: [moment().startOf('day'), moment().endOf('day')],
      本周: [moment().startOf('week'), moment().endOf('week')],
      本月: [moment().startOf('month'), moment().endOf('month')],
      今年: [moment().startOf('year'), moment().endOf('year')],
      近周: [moment().subtract(1, 'week').startOf('day'), today],
      近月: [moment().subtract(1, 'month').startOf('day'), today],
      近年: [moment().subtract(1, 'year').startOf('day'), today],
    };
  }, []);
  const values: [any, any] = useMemo(() => {
    const tvalue = value || [0, 0];
    const start = tvalue[0] ? moment(tvalue[0]) : undefined;
    const end = tvalue[1] ? moment(tvalue[1]) : undefined;
    return [start, end];
  }, [value]);

  return <DatePicker.RangePicker className={className} style={style} disabledDate={disabledDate} allowClear={allowClear} value={values} ranges={ranges} onChange={handleChange} />;
};

export default React.memo(Component);
