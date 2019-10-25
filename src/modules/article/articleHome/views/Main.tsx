import React from 'react';
import {connect} from 'react-redux';

interface StoreProps {}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    return <div>articleHome</div>;
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {};
};

export default connect(mapStateToProps)(Component);
