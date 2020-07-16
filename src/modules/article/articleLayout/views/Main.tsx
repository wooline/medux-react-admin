import ConsultPop from './ConsultPop';
import Footer from './Footer';
import Header from './Header';
import NotFound from 'components/NotFound';
import React from 'react';
import {Switch} from '@medux/react-web-router';
import {connect} from 'react-redux';

const ArticleHome = loadView('articleHome', 'main');
const ArticleAbout = loadView('articleAbout', 'main');
const ArticleService = loadView('articleService', 'main');

interface StoreProps {
  routeViews: RouteViews;
}

const Component: React.FC<StoreProps> = ({routeViews}) => {
  return (
    <div>
      <Header />
      <div style={{minHeight: 600}}>
        <Switch elseView={<NotFound />}>
          {routeViews.articleHome?.main && <ArticleHome />}
          {routeViews.articleAbout?.main && <ArticleAbout />}
          {routeViews.articleService?.main && <ArticleService />}
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
