import { createContext, useContext, useEffect, useState } from 'react';

import type { Session } from '@supabase/supabase-js';

import { supabaseClient } from 'infrastructure/supabase/supabaseClient';

type AuthContextType = {
  session: Session | null;
};

interface AuthContextData {
  session: Session | null;
}

const AuthContextInitialState: AuthContextData = {
  session: null
};

const AuthContext = createContext<AuthContextType>(AuthContextInitialState);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // TODO: Verify if including the logic to obtain the currentSession is an improvement over not including it
    /*
    const getCurrentSession = async () => {
      const { data } = await supabaseClient.auth.getSession();
      setSession(data.session ?? null);
      setIsLoading(false);
    };
    getCurrentSession();
    */

    // Listen for session changes (login, logout, token refresh).
    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, newSession) => {
      setSession(prevSession => (prevSession?.user.id === newSession?.user.id ? prevSession : newSession));
      setIsLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{!isLoading ? children : <div>Loading...</div>}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
