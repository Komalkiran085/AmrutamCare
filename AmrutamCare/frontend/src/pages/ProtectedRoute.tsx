import type { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}


const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    if (location.pathname.includes('/dashboard')) {
      return <Navigate to="/patient/login" replace />;
    }
    return <Navigate to="/doctor/login" replace />;
  }
  return children;
};


export default ProtectedRoute;
