import { Navigate } from 'react-router-dom';
import { JSX } from 'react';
import { useAuth } from '../context';
import { LOGIN_PAGE } from '../utils';

export default function ProtectedRoute({
   children,
}: {
   children: JSX.Element;
}) {
   const { isAuthenticated } = useAuth();
   return isAuthenticated ? children : <Navigate to={LOGIN_PAGE} />;
}
