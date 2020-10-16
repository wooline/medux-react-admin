import React from 'react';
import FormLayout from '../../components/FormLayout';
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
