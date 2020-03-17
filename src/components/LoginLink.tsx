import React, {ReactNode, useCallback} from 'react';

import {Link} from 'react-router-dom';

interface Props {
  className?: string;
  register?: boolean;
  children?: ReactNode;
}

const Component: React.FC<Props> = props => {
  const onClick = useCallback(() => {
    sessionStorage.setItem(metaKeys.LoginRedirectSessionStorageKey, location.pathname + location.search + location.hash);
  }, []);
  return (
    <Link className={props.className} to={props.register ? metaKeys.RegisterPathname : metaKeys.LoginPathname} onClick={onClick}>
      {props.children}
    </Link>
  );
};

export default React.memo(Component);
