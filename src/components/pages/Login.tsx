import React from 'react';

import { API } from '../utils';
import { AxiosError } from 'axios';

import { Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

enum FormLabel {
  Email = 'Email address',
  Password = 'Password',
  Login = 'Log In',
}

export const Login = () => {
  const [formValue, setFormValue] = React.useState({ email: '', password: '' });

  const handleLogin = async () => {
    const res = await API.post('login', formValue);
    if (res instanceof AxiosError) {
      const msg = res.response?.data.message;
      if (Array.isArray(msg)) {
        for (const m of msg) {
          toast.error(m.charAt(0).toUpperCase() + m.slice(1));
        }
        return;
      }
      return toast.error(msg);
    }
    toast.success('Login successful');
    setTimeout(() => (window.location.href = '/dashboard'), 3000);
  };

  return (
    <Container className='mt-5 w-25'>
      <h5 className='text-center'>Login</h5>
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
