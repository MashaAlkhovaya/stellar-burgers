import type { ProtectedRouteProps } from './type';
import {Navigate} from 'react-router-dom';

export const ProtectedRoute = ({
  children,
  onlyUnAuth,
}: ProtectedRouteProps): React.JSX.Element => {

  const isAuthenticated = false;

  if(!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (onlyUnAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
