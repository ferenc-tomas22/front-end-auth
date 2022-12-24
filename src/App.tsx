import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { NavigationBar } from './components/pages/NavigationBar';
import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { Dashboard } from './components/pages/Dashboard';
import { NotFound } from './components/pages/NotFound';

const RootLayout = () => (
  <>
    <ToastContainer />

    <header>
      <NavigationBar />
    </header>

    <main>
      <Outlet />
    </main>
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

export const App = () => <RouterProvider router={router} />;
