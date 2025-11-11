import { lazy } from 'react';
import { Navigate } from 'react-router';

import { routes as pathRoutes } from './routes';

import { PrivateRoute } from './guards/PrivateRoute';

const Profile = lazy(() => import('views/Profile').then(({ Profile }) => ({ default: Profile })));
const SignIn = lazy(() => import('views/SignIn').then(({ SignIn }) => ({ default: SignIn })));
const SignUp = lazy(() => import('views/SignUp').then(({ SignUp }) => ({ default: SignUp })));

enum RouteNames {
  PROFILE = 'Profile',
  SIGNIN = 'SignIn',
  SIGNUP = 'SignUp'
}

export type RouteName = keyof typeof RouteNames;

const elementsRoutes = {
  PROFILE: <Profile />,
  SIGNIN: <SignIn />,
  SIGNUP: <SignUp />
};

export const routesConfig = [
  /* Fallback for any unknown route */
  { name: 'NOT_FOUND', path: '*', element: <Navigate to={pathRoutes.SIGNIN} replace /> },
  { name: RouteNames.SIGNIN, path: pathRoutes.SIGNIN, element: elementsRoutes.SIGNIN },
  { name: RouteNames.PROFILE, path: pathRoutes.PROFILE, element: <PrivateRoute element={elementsRoutes.PROFILE} /> },
  { name: RouteNames.SIGNUP, path: pathRoutes.SIGNUP, element: elementsRoutes.SIGNUP }
];
