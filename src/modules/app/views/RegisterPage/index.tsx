import FormLayout from '../../components/FormLayout';
import React from 'react';
import RegisterForm from '../RegisterForm';

interface StoreProps {}

const Component: React.FC = () => {
  return (
    <FormLayout>
      <RegisterForm />
    </FormLayout>
  );
};

export default React.memo(Component);
