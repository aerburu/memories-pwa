import { useContext } from 'react';

import type { User } from '@supabase/supabase-js';

import { AuthContext, AuthContextType } from 'views/_functions/contexts/AuthContext';

interface UseAuthReturn extends AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
}

export const useAuth = (): UseAuthReturn => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  const { session, ...rest } = context;

  // Examples of uses in the hook. Obtaining properties that depend on global states
  const user = session?.user ?? null;
  const isAuthenticated = !!session;

  // Hook can grow with advanced logic (hasPermission, isAdmin, etc.)

  return { ...rest, session, user, isAuthenticated };
};
