import React from 'react';

import { API } from '../utils';
import { AxiosError } from 'axios';

import { Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

enum FormLabel {
  Email = 'Email address',
  Password = 'Password',
  Register = 'Register',
}

export const Register = () => {
  const [formValue, setFormValue] = React.useState({ email: '', password: '' });

  const handleRegister = async () => {
    const res = await API.post('register', formValue);
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
    toast.success('Registration successful');
    setTimeout(() => (window.location.href = '/login'), 3000);
  };

  return (
    <Container className='mt-5 w-25'>
      <h5 className='text-center'>Register</h5>
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
          <Button size='sm' className='px-5' onClick={handleRegister}>
            {FormLabel.Register}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
