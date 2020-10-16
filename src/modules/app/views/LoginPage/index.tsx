import React from 'react';
import FormLayout from '../../components/FormLayout';
import LoginForm from '../LoginForm';

const Component: React.FC = () => {
  return (
    <FormLayout>
      <LoginForm />
    </FormLayout>
  );
};

export default React.memo(Component);
