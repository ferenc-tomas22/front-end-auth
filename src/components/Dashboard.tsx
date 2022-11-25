import React from 'react';
import { API } from '../utils/API';
import { Container } from 'react-bootstrap';

const Dashboard = () => {
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    const getDashboardTitle = async () => {
      const response = await API.get('/dashboard');
      if (response.title) {
        setTitle(response.title);
      } else if (response.message) {
        alert(response.message);
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
