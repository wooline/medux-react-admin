import React from 'react';
import dayjs from 'dayjs';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

interface Props {
  date: string | number;
}
const Component: React.FC<Props> = ({date}) => {
  return <>{date ? dayjs(date).format(dateFormat) : ''}</>;
};

export default React.memo(Component);
