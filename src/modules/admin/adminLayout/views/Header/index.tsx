import {CurUser} from 'entity/session';
import React from 'react';
import {connect} from 'react-redux';

interface StoreProps {
  curUser: CurUser;
}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    return <div>header</div>;
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {
    curUser: state.app!.curUser!,
  };
};

export default connect(mapStateToProps)(Component);
