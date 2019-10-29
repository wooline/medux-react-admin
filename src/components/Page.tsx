import React from 'react';
import {RouteComponentProps} from 'react-router';

export default class HashPage<P = any, S = any> extends React.PureComponent<P & RouteComponentProps, S> {
  private routeHandler?: () => void;
  private routeFlag: string = '';
  private routeTimer: number = 0;

  public componentDidMount() {
    this.scrollToAnchor(this.props.location);
    this.routeHandler = this.props.history.listen(location => {
      this.scrollToAnchor(location);
    });
  }

  public componentWillUnmount() {
    if (this.routeTimer) {
      clearTimeout(this.routeTimer);
      this.routeTimer = 0;
    }
    this.routeHandler && this.routeHandler();
  }

  private scrollToAnchor = (location: {hash: string}) => {
    const routeFlag = location.hash;
    if (!this.routeTimer && routeFlag !== this.routeFlag) {
      this.routeFlag = routeFlag;
      this.routeTimer = setTimeout(() => {
        this.routeTimer = 0;
        const anchor = routeFlag.substr(1);
        const anchorTarget = anchor ? document.getElementById(anchor) : null;
        anchorTarget ? anchorTarget.scrollIntoView() : (document.body.scrollTop = document.documentElement.scrollTop = 0);
      }, 100);
    }
  };
}
