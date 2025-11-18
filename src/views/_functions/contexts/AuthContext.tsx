import { createContext, useEffect, useMemo, useRef, useState } from 'react';

import type { Session } from '@supabase/supabase-js';

import { supabaseClient } from 'infrastructure/supabase/supabaseClient';

export interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContextInitialState: AuthContextType = {
  session: null,
  isLoading: true,
  signOut: async () => {}
};

export const AuthContext = createContext<AuthContextType>(AuthContextInitialState);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  // Store authenticated Supabase session
  const [session, setSession] = useState<Session | null>(null);
  // Used to show loading state until authentication is resolved
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Prevent multiple initializations in React Strict Mode. React might trigger useEffect twice in development
  const initialized = useRef(false);

  useEffect(() => {
    // If already initialized, avoid running logic twice
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    //Get the current session on app load. This prevents "flicker" when refreshing the page.
    const getInitialSession = async () => {
      const { data } = await supabaseClient.auth.getSession();
      setSession(data.session ?? null);
      setIsLoading(false);
    };

    getInitialSession();

    // Listen for authentication state changes (login, logout, token refresh). Only update the session if it actually changes to avoid unnecessary renders.
    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, newSession) => {
      setSession(prev => (prev?.user.id === newSession?.user.id ? prev : newSession));
      setIsLoading(false);
    });

    // Cleanup listener when component unmounts
    return () => listener.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    setIsLoading(true);
    await supabaseClient.auth.signOut();
    setSession(null);
    setIsLoading(false);
  };

  // Memoize context value to avoid unnecessary re-renders in all components that consume this provider. Only create a new object when `session` or `isLoading` changes
  const value = useMemo(() => ({ session, isLoading, signOut }), [session, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
