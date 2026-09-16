import { useSelector } from '@services';
import { Navigate, useLocation } from 'react-router-dom';

import type { ProtectedRouteProps } from './type';

export const ProtectedRoute = ({
  children,
  onlyUnAuth,
}: ProtectedRouteProps): React.JSX.Element => {
  const isAuthenticated = useSelector((state) => Boolean(state.auth.user));
  const location = useLocation();

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (onlyUnAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
