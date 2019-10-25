import React, {ComponentType} from 'react';
import {Redirect, Route, RouteComponentProps, RouteProps} from 'react-router-dom';

interface Props extends RouteProps {
  auth: boolean;
  component: ComponentType<any>;
}

const Component = (props: Props) => {
  const {auth, component: TargetComponent, ...rest} = props;
  const {path} = rest;
  const toRender = (routeProps: RouteComponentProps<any>) => {
    return auth ? <TargetComponent {...routeProps} /> : <Redirect to={{pathname: path === '/login' ? '/' : '/login'}} />;
  };
  return <Route {...rest} render={toRender} />;
};

export default Component;
