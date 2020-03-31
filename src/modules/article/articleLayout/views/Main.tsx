import ConsultPop from './ConsultPop';
import Footer from './Footer';
import Header from './Header';
import NotFound from 'components/NotFound';
import React from 'react';
import {Switch} from '@medux/react-web-router';
import {connect} from 'react-redux';

const ArticleHome = loadView('articleHome', 'Main');
const ArticleAbout = loadView('articleAbout', 'Main');
const ArticleService = loadView('articleService', 'Main');

interface StoreProps {
  routeViews: RouteViews;
}

const Component: React.FC<StoreProps> = ({routeViews}) => {
  return (
    <div>
      <Header />
      <div style={{minHeight: 600}}>
        <Switch elseView={<NotFound />}>
          {routeViews.articleHome?.Main && <ArticleHome />}
          {routeViews.articleAbout?.Main && <ArticleAbout />}
          {routeViews.articleService?.Main && <ArticleService />}
          {/* <Redirect exact path="/article" to="/article/home" />
          <Route exact path="/article/home" component={ArticleHome} />
          <Route exact path="/article/about" component={ArticleAbout} />
          <Route exact path="/article/service" component={ArticleService} />
          <Route component={NotFound} /> */}
        </Switch>
      </div>
      <Footer />
      <ConsultPop />
    </div>
  );
};

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  return {
    routeViews: state.route.data.views,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
