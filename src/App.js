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
  const [currentPage, setCurrentPage] = useState();
  const [timeLeft, setTimeLeft] = useState(10);

  console.log('current level in app.js:', currentLevel);
  console.log('levelCompleted in app.js:', levelCompleted);

  const countdown = () => {
    setTimeout(() => {
      setTimeLeft((timeLeft) => timeLeft > 0 ? timeLeft - 1 : timeLeft);
      countdown();
    }, 1000);
  };

  const stopTimer = () => {
    return () => {
      clearTimeout(countdown);
    }
  }

  const nextLevel = () => {
    if (currentLevel === 1) {
      // setTimeLeft(20);
      setCurrentLevel(2);
      setLevelCompleted(1);

    } else if (currentLevel === 2) {
      // setTimeLeft(20);
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

  console.log(allStaff);
  console.log(allStaff.filter(staffmember => staffmember.department));

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    getStaffData();
  }, []);


  const digitalTeam = allStaff.filter(staffMember => staffMember.department[0] === 'digital');
  // console.log('digital Team', digitalTeam);

  const creativeTeam = allStaff.filter(staffMember => staffMember.department[0] === 'creative');
  // console.log('creative Team', creativeTeam);

  const clientServicesTeam = allStaff.filter(staffMember => staffMember.department[0] === 'client-services');
  // console.log('client Services Team', clientServicesTeam);

  const partnerMarketingTeam = allStaff.filter(staffMember => staffMember.department[0] === 'partnermarketing-com');
  // console.log('partner Marketing Team', partnerMarketingTeam);

  const mediaTeam = allStaff.filter(staffMember => staffMember.department[0] === 'media');
  // console.log('media Team', mediaTeam);

  const strategyTeam = allStaff.filter(staffMember => staffMember.department[0] === 'strategy');
  // console.log('strategy Team', strategyTeam);

  const businessSupportTeam = allStaff.filter(staffMember => staffMember.department[0] === 'business-support');
  // console.log('business support Team', businessSupportTeam);

  const managementTeam = allStaff.filter(staffMember => staffMember.department[0] === 'management');
  // console.log('Management Team', managementTeam);

  let teamsArr = [];

  teamsArr.push(
    digitalTeam,
    creativeTeam,
    clientServicesTeam,
    partnerMarketingTeam,
    mediaTeam,
    strategyTeam,
    businessSupportTeam,
    managementTeam
  );
  console.log('Teams arr:', teamsArr);

  teamsArr.sort(() => Math.random() - 0.5);
  console.log('Randomized Teams arr:', teamsArr);

  if (currentLevel === 1) {
    teamsArr = teamsArr.filter((team) => team.length >= 3);
    console.log('Level 1 teams arr:', teamsArr);
  } else if (currentLevel === 2) {
    teamsArr = teamsArr.filter((team) => team.length >= 6);
    console.log('Level 2 teams arr:', teamsArr);
  } else if (currentLevel === 3) {
    teamsArr = teamsArr.filter((team) => team.length >= 12);
    console.log('Level 3 teams arr:', teamsArr);
  }

  const randomTeam = teamsArr[0];
  console.log('Random Team:', randomTeam);

  const staffArr = randomTeam;
  console.log('Staff Arr in App', staffArr);

  let teamName;

  if (staffArr === digitalTeam) {
    teamName = 'Digital Team';
    console.log(teamName);
  } else if (staffArr === creativeTeam) {
    teamName = 'Creative Team';
    console.log(teamName);
  } else if (staffArr === clientServicesTeam) {
    teamName = 'Client Services Team';
    console.log(teamName);
  } else if (staffArr === partnerMarketingTeam) {
    teamName = 'Partner Marketing Team';
    console.log(teamName);
  } else if (staffArr === mediaTeam) {
    teamName = 'Media Team';
    console.log(teamName);
  } else if (staffArr === strategyTeam) {
    teamName = 'Strategy Team';
    console.log(teamName);
  } else if (staffArr === businessSupportTeam) {
    teamName = 'Business Support Team';
    console.log(teamName);
  } else if (staffArr === managementTeam) {
    teamName = 'Management Team';
    console.log(teamName);
  }


  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Header currentPage={currentPage}
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
                countdown={countdown}
                currentLevel={currentLevel}
                teamName={teamName}/>
        <Routes>
          <Route
            path='/'
            element={<Intro
              staffArr={staffArr}
              setCurrentPage={setCurrentPage} />}/>
          <Route
            path='/card-list'
            element={<CardList
              staffArr={staffArr}
              allStaff={allStaff}
              currentLevel={currentLevel}
              nextLevel={nextLevel}
              setCurrentPage={setCurrentPage}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              countdown={countdown}
              stopTimer={stopTimer}
              />}/>
          <Route
            path='/level-error'
            element={<LevelError
              setCurrentPage={setCurrentPage}/>}/>
          <Route
            path='/level-results'
            element={<LevelResults
              currentLevel={currentLevel}
              levelCompleted={levelCompleted}
              setCurrentPage={setCurrentPage}
            />}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
