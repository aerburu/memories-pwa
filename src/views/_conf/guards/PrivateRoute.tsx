import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router';

import { useAuth } from 'views/_functions/contexts/AuthContext';

import { routes as pahtRoutes } from 'views/_conf/routes';

interface PrivateRouteProps {
  element: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const location = useLocation();
  const { session } = useAuth();

  if (!session) {
    return <Navigate state={{ redirectTo: location.pathname }} to={pahtRoutes.SIGNIN} replace />;
  }

  return element;
};
