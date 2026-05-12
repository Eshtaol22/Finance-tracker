import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { TransactionProvider } from './contexts/TransactionContext';

/**
 * Main App Component
 * 
 * This is the root component of the Finance Tracker application.
 * It provides the following:
 * - Authentication context for user login/logout
 * - Transaction context for managing financial transactions
 * - Router for navigation between pages
 */
export default function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <RouterProvider router={router} />
      </TransactionProvider>
    </AuthProvider>
  );
}
