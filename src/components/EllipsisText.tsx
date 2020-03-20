import React, {useRef} from 'react';

import {Popover} from 'antd';

interface Props {}
const Component: React.FC<Props> = ({children}) => {
  const subDom = useRef<HTMLSpanElement>(null);

  return (
    <Popover placement="topLeft" content={children}>
      <span ref={subDom}>{children}</span>
    </Popover>
  );

  // componentDidMount() {
  //   this.subDom.current && (this.subDom.current.parentNode! as HTMLDivElement).removeAttribute('title');
  // }
};

export default React.memo(Component);
