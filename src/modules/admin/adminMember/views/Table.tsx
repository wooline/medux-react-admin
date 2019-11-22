import React from 'react';
import {connect} from 'react-redux';

interface StoreProps {}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    return (
      <div className="g-table">
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
        <p>adminHome</p>
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {};
};

export default connect(mapStateToProps)(Component);
