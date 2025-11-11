import { RouteName } from './routesConfig';

export const routes: { [keyof in RouteName]: string } = {
  PROFILE: '/profile',
  SIGNIN: '/sign-in',
  SIGNUP: '/sign-up'
};
