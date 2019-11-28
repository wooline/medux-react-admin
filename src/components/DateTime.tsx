import React from 'react';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

interface Props {
  date: string | number;
}
class Component extends React.PureComponent<Props> {
  public render() {
    const {date} = this.props;
    return <>{date ? moment(date).format(dateFormat) : ''}</>;
  }
}

export default Component;
