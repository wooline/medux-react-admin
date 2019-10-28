import {Redirect, Route, Switch} from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import NotFound from 'components/NotFound';
import React from 'react';
import {connect} from 'react-redux';

const ArticleHome = loadView('articleHome', 'Main');

interface StoreProps {}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    return (
      <div>
        <Header />
        <Switch>
          <Redirect exact path="/article" to="/article/home" />
          <Route exact path="/article/home" component={ArticleHome} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {};
};

export default connect(mapStateToProps)(Component);
