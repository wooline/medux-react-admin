import {Redirect, Route, Switch} from 'react-router-dom';

import ConsultPop from './ConsultPop';
import Footer from './Footer';
import Header from './Header';
import NotFound from 'components/NotFound';
import React from 'react';
import {connect} from 'react-redux';

const ArticleHome = loadView('articleHome', 'Main');
const ArticleAbout = loadView('articleAbout', 'Main');
const ArticleService = loadView('articleService', 'Main');

interface StoreProps {
  showConsult?: boolean;
}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    const {showConsult} = this.props;
    return (
      <div>
        <Header />
        <div style={{minHeight: 600}}>
          <Switch>
            <Redirect exact path="/article" to="/article/home" />
            <Route exact path="/article/home" component={ArticleHome} />
            <Route exact path="/article/about" component={ArticleAbout} />
            <Route exact path="/article/service" component={ArticleService} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
        <ConsultPop />
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {
    showConsult: state.articleLayout!.showConsult,
  };
};

export default connect(mapStateToProps)(Component);
