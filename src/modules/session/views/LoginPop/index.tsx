import {CurUser} from 'entity/session';
import React from 'react';
import {connect} from 'react-redux';
interface StoreProps {
  curUser?: CurUser;
}

class Component extends React.PureComponent<StoreProps & DispatchProp> {
  public render() {
    const {curUser} = this.props;
    return <div>loginPop</div>;
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {
    curUser: undefined,
  };
};

export default connect(mapStateToProps)(Component);
