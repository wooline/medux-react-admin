import {Modal} from 'antd';
import React from 'react';
import RegisterForm from '../RegisterForm';
import {connect} from 'react-redux';

interface StoreProps {
  showPop: boolean;
}

class Component extends React.PureComponent<StoreProps & DispatchProp> {
  onCancel = () => {
    this.props.dispatch(actions.app.closesLoginOrRegisterPop());
  };
  public render() {
    return (
      <Modal visible={this.props.showPop} footer={null} width={350} onCancel={this.onCancel}>
        <RegisterForm />
      </Modal>
    );
  }
}

const mapStateToProps: (state: RootState) => StoreProps = state => {
  return {
    showPop: state.app!.showLoginOrRegisterPop === 'register' && !state.app!.curUser!.hasLogin,
  };
};
export default connect(mapStateToProps)(Component);
