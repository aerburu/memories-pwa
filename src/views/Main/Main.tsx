import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';

import { ThemeProvider, CssBaseline } from '@mui/material';

import { routesConfig } from 'views/_conf';

import { AuthProvider } from 'views/_functions/contexts/AuthContext';

import { theme } from 'views/_theme';

import * as Styled from './Main.styled';

import './Main.css';

export const Main: React.FC = () => {
  return (
    <Styled.Wrapper>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Suspense fallback={<div>Cargando siiiii...</div>}>
              <Routes>
                {routesConfig.map(route => (
                  <Route element={route.element} key={route.name} path={route.path} />
                ))}
              </Routes>
            </Suspense>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </Styled.Wrapper>
  );
};
