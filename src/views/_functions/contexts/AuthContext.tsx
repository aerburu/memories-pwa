import { createContext, useEffect, useMemo, useRef, useState } from 'react';

import { AuthError, Session } from '@supabase/supabase-js';

import { supabaseClient } from 'infrastructure/supabase/supabaseClient';

export interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<AuthError | null>;
  signIn: (email: string, password: string) => Promise<AuthError | null>;
  signOut: () => Promise<AuthError | null>;
  forgotPassword: (email: string) => Promise<AuthError | null>;
  resetPassword: (password: string) => Promise<AuthError | null>;
}

const AuthContextInitialState: AuthContextType = {
  session: null,
  isLoading: true,
  signUp: async (_email: string, _password: string) => Promise.resolve(null),
  signIn: async (_email: string, _password: string) => Promise.resolve(null),
  signOut: async () => Promise.resolve(null),
  forgotPassword: async (_email: string) => Promise.resolve(null),
  resetPassword: async (_password: string) => Promise.resolve(null)
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

  // TODO: Consider including {data, error} in the future; currently I only use the error, so that's sufficient.
  const signUp = async (email: string, password: string) => {
    const { error } = await supabaseClient.auth.signUp({ email, password });
    return error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    return error;
  };

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    return error;
  };

  const forgotPassword = async (email: string) => {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email);
    return error;
  };

  const resetPassword = async (password: string) => {
    const { error } = await supabaseClient.auth.updateUser({ password: password });
    return error;
  };

  // Memoize context value to avoid unnecessary re-renders in all components that consume this provider. Only create a new object when `session` or `isLoading` changes
  const value = useMemo(
    () => ({ session, isLoading, signUp, signIn, signOut, forgotPassword, resetPassword }),
    [session, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
