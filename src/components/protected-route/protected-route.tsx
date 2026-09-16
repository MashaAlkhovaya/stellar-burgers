import { useSelector } from '@services';
import { Navigate } from 'react-router-dom';

import type { ProtectedRouteProps } from './type';

export const ProtectedRoute = ({
  children,
  onlyUnAuth,
}: ProtectedRouteProps): React.JSX.Element => {
  const isAuthenticated = useSelector((state) => Boolean(state.auth.user));

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (onlyUnAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
