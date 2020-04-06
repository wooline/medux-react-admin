import 'antd/es/date-picker/style/index';

import React, {useMemo} from 'react';

import dayjs from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import useEventCallback from 'hooks/useEventCallback';

const DatePicker = generatePicker<dayjs.Dayjs>(dayjsGenerateConfig);

export interface Props {
  className?: string;
  allowClear?: boolean;
  style?: React.CSSProperties;
  disabledDate?: (currentDate: dayjs.Dayjs | null) => boolean;
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
    const today = dayjs().endOf('day');
    return {
      今天: [dayjs().startOf('day'), dayjs().endOf('day')],
      本周: [dayjs().startOf('week'), dayjs().endOf('week')],
      本月: [dayjs().startOf('month'), dayjs().endOf('month')],
      今年: [dayjs().startOf('year'), dayjs().endOf('year')],
      近周: [dayjs().subtract(1, 'week').startOf('day'), today],
      近月: [dayjs().subtract(1, 'month').startOf('day'), today],
      近年: [dayjs().subtract(1, 'year').startOf('day'), today],
    };
  }, []);
  const values: [any, any] = useMemo(() => {
    const tvalue = value || [0, 0];
    const start = tvalue[0] ? dayjs(tvalue[0]) : undefined;
    const end = tvalue[1] ? dayjs(tvalue[1]) : undefined;
    return [start, end];
  }, [value]);

  return <DatePicker.RangePicker className={className} style={style} disabledDate={disabledDate} allowClear={allowClear} value={values} ranges={ranges} onChange={handleChange} />;
};

export default React.memo(Component);
