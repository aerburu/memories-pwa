import { JSX } from 'react';
import { Navigate /*, useLocation */ } from 'react-router';

import { routes as pahtRoutes } from 'views/_conf/routes';

interface PrivateRouteProps {
  element: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  //const location = useLocation();

  const isAuthenticated = false;

  // TODO: Comprobar si hay sesion iniciada y en caso de que no haya redirigir a Login
  //if (!securityService.hasTokens()) {
  //  return <Navigate state={{ redirectTo: location.pathname }} to={pahtRoutes.LOGIN} />;
  //}verbatimModuleSyntax

  if (!isAuthenticated) {
    return <Navigate state={{ redirectTo: location.pathname }} to={pahtRoutes.LOGIN} />;
  }

  return element;
};
