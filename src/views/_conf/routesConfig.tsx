import { lazy } from 'react';
import { Navigate } from 'react-router';

import { routes as pathRoutes } from './routes';

import { PrivateRoute } from './guards/PrivateRoute';

const Login = lazy(() => import('views/Login').then(({ Login }) => ({ default: Login })));
const Profile = lazy(() => import('views/Profile').then(({ Profile }) => ({ default: Profile })));
const Register = lazy(() => import('views/Register').then(({ Register }) => ({ default: Register })));

enum RouteNames {
  LOGIN = 'Login',
  PROFILE = 'Profile',
  REGISTER = 'Register'
}

export type RouteName = keyof typeof RouteNames;

const elementsRoutes = {
  LOGIN: <Login />,
  PROFILE: <Profile />,
  REGISTER: <Register />
};

export const routesConfig = [
  /* Fallback for any unknown route */
  { name: 'NOT_FOUND', path: '*', element: <Navigate to={pathRoutes.LOGIN} replace /> },
  { name: RouteNames.LOGIN, path: pathRoutes.LOGIN, element: elementsRoutes.LOGIN },
  { name: RouteNames.PROFILE, path: pathRoutes.PROFILE, element: <PrivateRoute element={elementsRoutes.PROFILE} /> },
  { name: RouteNames.REGISTER, path: pathRoutes.REGISTER, element: elementsRoutes.REGISTER }
];
