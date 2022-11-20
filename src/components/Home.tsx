import React from 'react';
import { API } from '../utils/API';
import { Container } from 'react-bootstrap';

const Home = () => {
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    const getHomeTitle = async () => {
      const response = await API.get('');
      setTitle(response);
    };
    getHomeTitle();
  }, []);

  return (
    <Container className='text-center mt-5'>
      <h1>{title}</h1>
    </Container>
  );
};

export default Home;
