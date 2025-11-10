import { Suspense } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router';

import { routesConfig } from 'views/_conf';

import * as Styled from './Main.styled';
import './Main.css';

export const Main: React.FC = () => {
  return (
    <Styled.Wrapper>
      <Router>
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            {routesConfig.map(route => (
              <Route element={route.element} key={route.name} path={route.path} />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </Styled.Wrapper>
  );
};
