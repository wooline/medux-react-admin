import FormLayout from '../../components/FormLayout';
import React from 'react';
import RegisterForm from '../RegisterForm';

interface StoreProps {}

class Component extends React.PureComponent<StoreProps> {
  public render() {
    return (
      <FormLayout>
        <RegisterForm />
      </FormLayout>
    );
  }
}

export default Component;
