import React from 'react';
import { API } from '../utils/API';
import { Container, Form, Button } from 'react-bootstrap';

enum FormLabel {
  Email = 'Email address',
  Password = 'Password',
  Register = 'Register',
}

const Register = () => {
  const [formValue, setFormValue] = React.useState({ email: '', password: '' });

  const handleRegister = async () => {
    const response = await API.post('register', formValue);
    if (response.error) {
      for (const message of response.message) {
        const msg = message as string;
        alert(msg.charAt(0).toUpperCase() + msg.slice(1));
      }
      return;
    }
    window.location.href = '/login';
    alert('Registration successful');
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
          <Button size='sm' className='px-5' onClick={handleRegister}>
            {FormLabel.Register}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Register;
