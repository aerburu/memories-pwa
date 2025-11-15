import { lazy } from 'react';
import { Navigate } from 'react-router';

import { routes as pathRoutes } from './routes';

import { PrivateRoute } from './guards/PrivateRoute';
import { PublicRoute } from './guards/PublicRoute';

const ForgotPassword = lazy(() =>
  import('views/ForgotPassword').then(({ ForgotPassword }) => ({ default: ForgotPassword }))
);
const Profile = lazy(() => import('views/Profile').then(({ Profile }) => ({ default: Profile })));
const ResetPassword = lazy(() =>
  import('views/ResetPassword').then(({ ResetPassword }) => ({ default: ResetPassword }))
);
const SignIn = lazy(() => import('views/SignIn').then(({ SignIn }) => ({ default: SignIn })));
const SignUp = lazy(() => import('views/SignUp').then(({ SignUp }) => ({ default: SignUp })));

enum RouteNames {
  FORGOT_PASSWORD = 'ForgotPassword',
  PROFILE = 'Profile',
  RESET_PASSWORD = 'ResetPassword',
  SIGNIN = 'SignIn',
  SIGNUP = 'SignUp'
}

export type RouteName = keyof typeof RouteNames;

const elementsRoutes = {
  FORGOT_PASSWORD: <ForgotPassword />,
  PROFILE: <Profile />,
  RESET_PASSWORD: <ResetPassword />,
  SIGNIN: <SignIn />,
  SIGNUP: <SignUp />
};

export const routesConfig = [
  /* Fallback for any unknown route */
  { name: 'NOT_FOUND', path: '*', element: <Navigate to={pathRoutes.SIGNIN} replace /> },
  {
    name: RouteNames.FORGOT_PASSWORD,
    path: pathRoutes.FORGOT_PASSWORD,
    element: <PublicRoute element={elementsRoutes.FORGOT_PASSWORD} />
  },
  { name: RouteNames.PROFILE, path: pathRoutes.PROFILE, element: <PrivateRoute element={elementsRoutes.PROFILE} /> },
  {
    name: RouteNames.RESET_PASSWORD,
    path: pathRoutes.RESET_PASSWORD,
    element: <PublicRoute element={elementsRoutes.RESET_PASSWORD} />
  },
  { name: RouteNames.SIGNIN, path: pathRoutes.SIGNIN, element: <PublicRoute element={elementsRoutes.SIGNIN} /> },
  { name: RouteNames.SIGNUP, path: pathRoutes.SIGNUP, element: <PublicRoute element={elementsRoutes.SIGNUP} /> }
];
