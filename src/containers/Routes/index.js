import React, { lazy, Suspense } from 'react';
import { Router, Routes, Route, Navigate, Link } from "react-router-dom";

const Intro = lazy(() => import('../../components/Intro'));
const GameLevels = lazy(() => import('../../components/GameLevels'));
const LevelResults = lazy(() => import('../../components/LevelResults'));
const LevelError = lazy(() => import('../../components/LevelError'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<Intro />}>
        <Routes>
          <Route
            path='/GameLevels'
            element={ onclick ? <Navigate to={<GameLevels />} : <Intro />}
          />
          <Route
            path='/LevelResults'
            element={ condition(all cards match) ? <Navigate to={<LevelResults />} : <GameLevels /> }
          />
          <Route
            path='/LevelError'
            element={ condition (timed out) ? <Navigate to={<LevelError />} : <GameLevels />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default Routes;
