import {CurUser} from 'entity/session';
import LoginForm from '../LoginForm';
import React from 'react';
import {connect} from 'react-redux';

interface StoreProps {
  curUser?: CurUser;
}

class Component extends React.PureComponent<StoreProps & DispatchProp> {
  public render() {
    const {curUser} = this.props;
    if (!curUser) {
      return null;
    } else if (!curUser.hasLogin) {
      return <LoginForm />;
    } else {
      return <div>{this.props.children}</div>;
    }
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {
    curUser: state.session && state.session.curUser,
  };
};

export default connect(mapStateToProps)(Component);
