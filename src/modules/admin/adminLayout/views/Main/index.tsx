import {Redirect, Route, Switch} from 'react-router-dom';

import {CurUser} from 'entity/session';
import NotFound from 'components/NotFound';
import React from 'react';
import {connect} from 'react-redux';

const AdminHome = loadView('adminHome', 'Main');

interface StoreProps {
  curUser?: CurUser;
}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    const {curUser} = this.props;
    if (curUser && curUser.hasLogin) {
      return (
        <div>
          <Switch>
            <Redirect exact path="/admin" to="/admin/home" />
            <Route exact path="/admin/home" component={AdminHome} />
            <Route component={NotFound} />
          </Switch>
        </div>
      );
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
