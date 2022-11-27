import React from 'react';

import { API } from '../utils/API';
import { AxiosError } from 'axios';

import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    const getDashboardTitle = async () => {
      const res = await API.get('/dashboard');
      if (res instanceof AxiosError) {
        toast.error(res.response?.data.message);
        if (res.response?.status === 401) {
          setTimeout(() => (window.location.href = '/login'), 3000);
        }
      } else if (res.title) {
        setTitle(res.title);
      }
    };
    getDashboardTitle();
  }, []);

  return (
    <Container className='text-center mt-5'>
      <h1>{title}</h1>
    </Container>
  );
};

export default Dashboard;
