import { JSX } from 'react';
import { Navigate } from 'react-router';

import { useAuth } from 'views/_functions/hooks/useAuth';

import { routes as pahtRoutes } from 'views/_conf/routes';

interface PublicRouteProps {
  element: JSX.Element;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const { isLoading, isLoggedIn } = useAuth();

  // Show a loading state while auth is being resolved
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    return <Navigate to={pahtRoutes.PROFILE} replace />;
  }

  return element;
};
