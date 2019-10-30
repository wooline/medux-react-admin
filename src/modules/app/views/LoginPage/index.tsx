import FormLayout from '../../components/FormLayout';
import LoginForm from '../LoginForm';
import React from 'react';

interface StoreProps {}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    return (
      <FormLayout>
        <LoginForm />
      </FormLayout>
    );
  }
}

export default Component;
