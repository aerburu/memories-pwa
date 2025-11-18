import { useContext } from 'react';
import { AuthContext, AuthContextType } from 'views/_functions/contexts/AuthContext';

export const useAuth = (): AuthContextType & { isLoggedIn: boolean; getUserEmail: () => string | null } => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  const isLoggedIn = !!context.session;
  const getUserEmail = () => context.session?.user?.email ?? null;

  return { ...context, isLoggedIn, getUserEmail };
};
