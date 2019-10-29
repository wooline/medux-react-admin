import {Button, Checkbox, Col, Icon, Input, Modal, Popconfirm, Row, message} from 'antd';
import {Redirect, Route, Switch} from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import NotFound from 'components/NotFound';
import React from 'react';
import {connect} from 'react-redux';

const ArticleHome = loadView('articleHome', 'Main');
const ArticleAbout = loadView('articleAbout', 'Main');
const ArticleService = loadView('articleService', 'Main');
const Judge = loadView('session', 'Judge');

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
        {showConsult && (
          <Modal visible={true} footer={null}>
            <Judge>sdfdsfsd</Judge>
          </Modal>
        )}
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
