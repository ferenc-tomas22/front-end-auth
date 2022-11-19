import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { API } from '../utils/API';
import { validateEmail } from '../utils/validateEmail';

enum FormLabel {
  Email = 'Email address',
  Password = 'Password',
  Register = 'Register',
}

const Register = () => {
  const [formValue, setFormValue] = React.useState({ email: '', password: '' });

  const handleRegister = () => {
    if (!validateEmail(formValue.email)) {
      alert('Please enter a valid email address');
      return;
    }
    if (formValue.password.length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }
    try {
      API.post('register', formValue);
    } catch (err) {
      console.error(err);
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
          <Button size='sm' className='px-5' onClick={handleRegister}>
            {FormLabel.Register}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Register;
