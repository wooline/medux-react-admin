import {CurUser} from 'entity/session';
import React from 'react';
import {connect} from 'react-redux';

interface StoreProps {
  curUser?: CurUser;
}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    const {curUser} = this.props;
    if (curUser && curUser.hasLogin) {
      return <div>header</div>;
    } else {
      return null;
    }
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {
    curUser: state.session && state.session.curUser,
  };
};

export default connect(mapStateToProps)(Component);
