import { createBrowserRouter } from 'react-router';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

// Create and export router configuration
export const router = createBrowserRouter([
  {
    path: '/',
    Component: Login,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
  },
  {
    path: '*',
    Component: Login, // Redirect to login for unknown routes
  },
]);
