import { RouteName } from './routesConfig';

export const routes: { [keyof in RouteName]: string } = {
  LOGIN: '/login',
  PROFILE: '/profile',
  REGISTER: '/register'
};
