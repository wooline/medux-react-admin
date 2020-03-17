import FormLayout from '../../components/FormLayout';
import LoginForm from '../LoginForm';
import React from 'react';

const Component: React.FC = () => {
  return (
    <FormLayout>
      <LoginForm />
    </FormLayout>
  );
};

export default React.memo(Component);
