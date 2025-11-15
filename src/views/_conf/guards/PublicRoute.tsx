import { JSX } from 'react';
import { Navigate } from 'react-router';

import { useAuth } from 'views/_functions/contexts/AuthContext';

import { routes as pahtRoutes } from 'views/_conf/routes';

interface PublicRouteProps {
  element: JSX.Element;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const { session } = useAuth();

  if (session) {
    return <Navigate to={pahtRoutes.PROFILE} replace />;
  }

  return element;
};
