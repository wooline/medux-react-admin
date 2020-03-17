import {Redirect, Route, Switch} from 'react-router-dom';

import ConsultPop from './ConsultPop';
import Footer from './Footer';
import Header from './Header';
import NotFound from 'components/NotFound';
import React from 'react';

const ArticleHome = loadView('articleHome', 'Main');
// const ArticleAbout = loadView('articleAbout', 'Main');
// const ArticleService = loadView('articleService', 'Main');

const Component: React.FC = () => {
  return (
    <div>
      <Header />
      <div style={{minHeight: 600}}>
        <Switch>
          <Redirect exact path="/article" to="/article/home" />
          <Route exact path="/article/home" component={ArticleHome} />
          {/* <Route exact path="/article/about" component={ArticleAbout} />
            <Route exact path="/article/service" component={ArticleService} /> */}
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
      <ConsultPop />
    </div>
  );
};

export default React.memo(Component);
