import { API } from '../utils';
import { AxiosError } from 'axios';

import { NavLink } from 'react-router-dom';

import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

enum NAV_LINK {
  HOME = 'Home',
  DASHBOARD = 'Dashboard',
  LOGIN = 'Login',
  REGISTER = 'Register',
  LOGOUT = 'Logout',
}

const handleLogout = async () => {
  const res = await API.get('logout');
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
  toast.success('You have been successfully logged out');
  setTimeout(() => (window.location.href = '/login'), 3000);
};

export const NavigationBar = () => {
  return (
    <Navbar bg='dark' variant='dark' sticky='top' className='shadow-lg p-0'>
      <Container className='mx-5'>
        <Navbar.Brand className='d-flex flex-row'>
          <NavLink to='/' style={{ color: '#F6F6F6', textDecoration: 'none' }}>
            <Button className='btn btn-dark rounded-pill'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='36'
                height='36'
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path d='M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Z' />
                <path d='M9.653 5.496A2.986 2.986 0 0 0 8 5c-.61 0-1.179.183-1.653.496L4.694 2.992A5.972 5.972 0 0 1 8 2c1.222 0 2.358.365 3.306.992L9.653 5.496Zm1.342 2.324a2.986 2.986 0 0 1-.884 2.312 3.01 3.01 0 0 1-.769.552l1.342 2.683c.57-.286 1.09-.66 1.538-1.103a5.986 5.986 0 0 0 1.767-4.624l-2.994.18Zm-5.679 5.548 1.342-2.684A3 3 0 0 1 5.005 7.82l-2.994-.18a6 6 0 0 0 3.306 5.728ZM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z' />
              </svg>
            </Button>
          </NavLink>
        </Navbar.Brand>
        <Nav>
          <Nav.Link to='/' as={NavLink}>
            <Button className='btn btn-dark rounded-pill'>{NAV_LINK.HOME}</Button>
          </Nav.Link>
          <Nav.Link to='/dashboard' as={NavLink}>
            <Button className='btn btn-dark rounded-pill'>{NAV_LINK.DASHBOARD}</Button>
          </Nav.Link>
          <Nav.Link to='/login' as={NavLink}>
            <Button className='btn btn-dark rounded-pill'>{NAV_LINK.LOGIN}</Button>
          </Nav.Link>
          <Nav.Link to='/register' as={NavLink}>
            <Button className='btn btn-dark rounded-pill'>{NAV_LINK.REGISTER}</Button>
          </Nav.Link>
          <Nav.Link>
            <Button onClick={handleLogout} className='btn btn-dark rounded-pill'>
              {NAV_LINK.LOGOUT}
            </Button>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
