import {Link} from 'react-router-dom';
import React from 'react';

interface Props {
  className?: string;
  register?: boolean;
}

class Component extends React.PureComponent<Props> {
  onClick = () => {
    sessionStorage.setItem(metaKeys.LoginRedirectSessionStorageKey, location.pathname + location.search + location.hash);
  };
  public render() {
    return (
      <Link className={this.props.className} to={this.props.register ? metaKeys.RegisterPathname : metaKeys.LoginPathname} onClick={this.onClick}>
        {this.props.children}
      </Link>
    );
  }
}

export default Component;
