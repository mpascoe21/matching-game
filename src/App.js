import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import Loading from "./components/Loading";
import Header from "./components/Header";
import styles from './App.module.scss';

const Intro = lazy(() => import('././components/Intro'));
const CardList = lazy(() => import('././components/CardList'));
// const GameLevels = lazy(() => import('./components/GameLevels'));
const LevelResults = lazy(() => import('./components/LevelResults'));
const LevelError = lazy(() => import('./components/LevelError'));


const App = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelCompleted, setLevelCompleted] = useState();
  const [allStaff, setAllStaff] = useState([]);

  let currentPage;

  console.log('current level in app.js:', currentLevel);
  console.log('levelCompleted in app.js:', levelCompleted);

  const nextLevel = () => {
    if (currentLevel === 1) {
      setCurrentLevel(2);
      setLevelCompleted(1)
    } else if (currentLevel === 2) {
      setCurrentLevel(3);
      setLevelCompleted(2)
    } else if (currentLevel === 3) {
      setCurrentLevel(4);
      setLevelCompleted(3)
    }
  }

  const hasLoaded = useRef(false);

  const getStaffData = () => {
    fetch(`https://twom061-003.s3.amazonaws.com/s2d-prod/api/team.json`)
      .then((response) => response.json())
      .then((jsonResponse) => setAllStaff(jsonResponse));
  };

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    getStaffData();
  }, []);

  const digitalTeam = allStaff.filter(staffMember => staffMember.department[0] === 'digital');
  console.log(digitalTeam);

  digitalTeam.sort(() => Math.random() - 0.5);
  console.log(digitalTeam);

  const staffArr = digitalTeam;


  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Header currentPage={currentPage} />
        <Routes>
          <Route
            path='/'
            element={<Intro
              staffArr={staffArr} />}/>
          <Route
            path='/card-list'
            element={<CardList
              staffArr={staffArr}
              allStaff={allStaff}
              currentLevel={currentLevel}
              nextLevel={nextLevel}
              currentPage={currentPage} />}/>
          <Route
            path='/level-error'
            element={<LevelError />}/>
          <Route
            path='/level-results'
            element={<LevelResults
              currentLevel={currentLevel}
              levelCompleted={levelCompleted}
            />}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
