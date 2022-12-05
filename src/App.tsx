import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Dashboard, Home, Login, NavigationBar, NotFound, Register } from './components/pages';

import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
