import React, {ReactNode, useCallback} from 'react';

import {Link} from 'react-router-dom';

interface Props {
  className?: string;
  register?: boolean;
  children?: ReactNode;
}

const Component: React.FC<Props> = ({className, register, children}) => {
  const onClick = useCallback(() => {
    sessionStorage.setItem(metaKeys.LoginRedirectSessionStorageKey, location.pathname + location.search + location.hash);
  }, []);
  return (
    <Link className={className} to={register ? metaKeys.RegisterPathname : metaKeys.LoginPathname} onClick={onClick}>
      {children}
    </Link>
  );
};

export default React.memo(Component);
