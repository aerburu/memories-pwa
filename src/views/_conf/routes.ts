import { RouteName } from './routesConfig';

export const routes: { [keyof in RouteName]: string } = {
  FORGOT_PASSWORD: '/forgot-password',
  PROFILE: '/profile',
  RESET_PASSWORD: '/reset-password',
  SIGNIN: '/sign-in',
  SIGNUP: '/sign-up'
};
