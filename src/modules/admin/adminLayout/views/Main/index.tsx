import {Redirect, Route, Switch} from 'react-router-dom';

import {CurUser} from 'entity/session';
import Header from '../Header';
import NotFound from 'components/NotFound';
import React from 'react';
import {connect} from 'react-redux';

const AdminHome = loadView('adminHome', 'Main');

interface StoreProps {
  curUser: CurUser;
}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    return (
      this.props.curUser.hasLogin && (
        <div>
          <Header />
          <Switch>
            <Redirect exact path="/admin" to="/admin/home" />
            <Route exact path="/admin/home" component={AdminHome} />
            <Route component={NotFound} />
          </Switch>
        </div>
      )
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {
    curUser: state.app!.curUser!,
  };
};

export default connect(mapStateToProps)(Component);
