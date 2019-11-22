import React from 'react';
import Search from './Search';
import Table from './Table';
import {connect} from 'react-redux';
interface StoreProps {}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    return (
      <div className="g-adminPage">
        <h1>{pageNames[location.pathname]}</h1>
        <Search />
        <Table />
      </div>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {};
};

export default connect(mapStateToProps)(Component);
