import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router';

import { useAuth } from 'views/_functions/hooks/useAuth';

import { routes as pahtRoutes } from 'views/_conf/routes';

import { PrivateMainLayout } from 'views/_components/PrivateMainLayout';

interface PrivateRouteProps {
  element: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const location = useLocation();
  const { isLoading, isAuthenticated } = useAuth();

  // Show a loading state while auth is being resolved
  if (isLoading) {
    return <div>Loading...</div>; // Puedes reemplazar con tu componente de spinner
  }

  // TODO: Check if we need to verify against the auth token
  if (!isAuthenticated) {
    return <Navigate state={{ redirectTo: location.pathname }} to={pahtRoutes.SIGNIN} replace />;
  }

  return <PrivateMainLayout>{element}</PrivateMainLayout>;
};
