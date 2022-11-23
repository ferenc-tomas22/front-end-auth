import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { API } from '../utils/API';

import axios from 'axios';

enum FormLabel {
  Email = 'Email address',
  Password = 'Password',
  Login = 'Log In',
}

const Login = () => {
  const [formValue, setFormValue] = React.useState({ email: '', password: '' });

  const handleLogin = async () => {
    const response = await API.post('login', formValue);

    if (response.error) {
      for (const message of response.message) {
        const msg = message as string;
        alert(msg.charAt(0).toUpperCase() + msg.slice(1));
      }
      return;
    }

    if (response.userId) {
      window.location.href = '/dashboard';
      alert('Login successful');
    }
  };

  return (
    <Container className='mt-5 w-25'>
      <Form className='border border-dark rounded p-5'>
        <Form.Group className='mb-3'>
          <Form.Label>{FormLabel.Email}</Form.Label>
          <Form.Control
            size='sm'
            type='email'
            placeholder='name@example.com'
            value={formValue.email}
            onChange={(e) => setFormValue((fv) => ({ ...fv, email: e.target.value }))}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>{FormLabel.Password}</Form.Label>
          <Form.Control
            size='sm'
            type='password'
            value={formValue.password}
            onChange={(e) => setFormValue((fv) => ({ ...fv, password: e.target.value }))}
          />
        </Form.Group>
        <Form.Group className='text-center mb-3'>
          <Button size='sm' className='px-5' onClick={handleLogin}>
            {FormLabel.Login}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Login;
