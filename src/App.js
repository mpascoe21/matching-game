import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import {BrowserRouter, Routes, Route, Navigate, Link} from "react-router-dom";

import Loading from "./components/Loading";
import Header from "./components/Header";
import styles from './App.module.scss';

const Intro = lazy(() => import('././components/Intro'));
const CardList = lazy(() => import('././components/CardList'));
// const GameLevels = lazy(() => import('./components/GameLevels'));
const LevelResults = lazy(() => import('./components/LevelResults'));
const LevelError = lazy(() => import('./components/LevelError'));


const App = () => {
  //
  const [randomTeam, setRandomTeam] = useState([]);
  const [staffArr, setStaffArr] = useState([]);
  // const [teamsArr, setTeamsArr] = useState([]);

  const [currentLevel] = useState(() => {
    const currentLevel = localStorage.getItem('current_level');

    if (null !== currentLevel) {
      return parseInt(currentLevel);
    }

    return 1;
  });
  const [levelCompleted] = useState(() => {
    const levelCompleted = localStorage.getItem('level_completed');

    if (null !== levelCompleted) {
      return parseInt(levelCompleted);
    }

    return 0;
  });
  const [allStaff, setAllStaff] = useState(() => {
    const staff = localStorage.getItem('staff');

    if (null !== staff) {
      return JSON.parse(staff);
    }

    return [];
  });
  const [currentPage, setCurrentPage] = useState();
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRunning = useRef(false);

  // console.log('current level in app.js:', currentLevel);
  // console.log('levelCompleted in app.js:', levelCompleted);
  // let timer;

  const decrementTimer = () => {
    setTimeout(() => {
      setTimeLeft((timeLeft) => timeLeft > 0 ? timeLeft - 1 : timeLeft);
    }, 1000);
  };

  useEffect(() => {
    console.log('timer running', timerRunning);
    console.log('allow timer to run', timerRunning.current);
    if (!timerRunning.current) return;

    console.log('TIME LEFT', timeLeft);
    if (timeLeft === 0) {
      console.log('redirect');
      window.location.replace('level-error');
      return;
    }

    decrementTimer();

    // setTimeout(() => {
    //   setTimeLeft((timeLeft) => timeLeft > 0 ? timeLeft - 1 : timeLeft);
    // }, 1000);
  }, [timeLeft, setTimeLeft]);

  // const countdown = () => {
  //   timerRunning.current = true;
  //   setTimeout(() => {
  //     console.log('time left:', timeLeft);
  //     if (timeLeft === 0) {
  //       console.log('redirect');
  //       window.location.replace('level-error');
  //       return;
  //     }
  //
  //     setTimeLeft((timeLeft) => timeLeft > 0 ? timeLeft - 1 : timeLeft);
  //     if (timerRunning.current) countdown();
  //   }, 1000);
  // };

  // const setTimeLeft = (value) => {
  //   timeLeft.current = value;
  // };

  const countdown = () => {
    timerRunning.current = true;

    decrementTimer();
  };

  // useEffect(() => {
  //
  // });

  const stopTimer = () => {
    timerRunning.current = false;
    console.log('stopped timer');
  };

  const nextLevel = () => {
    if (currentLevel === 1) {
      // setTimeLeft(30);
      localStorage.setItem('current_level', 2);
      localStorage.setItem('level_completed', 1);

      countdown();
    } else if (currentLevel === 2) {
      localStorage.setItem('current_level', 3);
      localStorage.setItem('level_completed', 2);

      countdown();
    }
  }

  const hasLoaded = useRef(false);

  const getStaffData = () => {
    console.log('ALL STAFF DATA CALL');
    fetch(`https://twom061-003.s3.amazonaws.com/s2d-prod/api/team.json`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        const staff = jsonResponse;

        localStorage.setItem('staff', JSON.stringify(staff));

        setAllStaff(staff);
      })
      .catch((e) => console.error(e));
  };

  console.log('All Staff', allStaff);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    if (0 === allStaff.length) getStaffData();
  }, []);

  const filteredAllStaff = allStaff.filter((teamMember) => {
    if (!(teamMember.image.mobile || teamMember.image.desktop).includes('team-avatar')) {
      return teamMember.title;
    }
  })
  console.log('filteredAllStaff', filteredAllStaff);

  let teams = {
    digitalTeam: [],
    creativeTeam: [],
    clientServicesTeam: [],
    partnerMarketingTeam: [],//Channel
    mediaTeam: [],
    strategyTeam: [],
    businessSupportTeam: [],
    managementTeam: []
  };
  console.log('teams', teams);


    filteredAllStaff.forEach((staffMember) => {
    if(staffMember.department[0] === 'management' || staffMember.department[1] === 'management') {
      teams.managementTeam.push(staffMember);
    } else if (staffMember.department[0] === 'business-support' || staffMember.department[1] === 'business-support') {
      teams.businessSupportTeam.push(staffMember);
    } else if (staffMember.department[0] === 'strategy' || staffMember.department[1] === 'strategy') {
      teams.strategyTeam.push(staffMember);
    } else if (staffMember.department[0] === 'media' || staffMember.department[1] === 'media') {
      teams.mediaTeam.push(staffMember);
    } else if (staffMember.department[0] === 'partnermarketing-com' || staffMember.department[1] === 'partnermarketing-com') {
      teams.partnerMarketingTeam.push(staffMember);
    } else if (staffMember.department[0] === 'client-services' || staffMember.department[1] === 'client-services') {
      teams.clientServicesTeam.push(staffMember);
    } else if (staffMember.department[0] === 'creative' || staffMember.department[1] === 'creative') {
      teams.creativeTeam.push(staffMember);
    } else if (staffMember.department[0] === 'digital' || staffMember.department[1] === 'digital') {
      teams.digitalTeam.push(staffMember);
    }
  })

  console.log('teams', teams);

  // let teamsArr = [];

  // setTeamsArr(teamsArr.push(Object.values(teams)));
  //
  // teamsArr.push(Object.values(teams));
  //
  // console.log('Teams arr:', teamsArr[0]);

  // teamsArr[0].sort(() => Math.random() - 0.5);
  // console.log('Randomized Teams arr:', teamsArr);

  // if (currentLevel === 1) {
  //   teamsArr = teamsArr.filter((team) => team.length >= 3);
  //   console.log('Level 1 teams arr:', teamsArr);
  // } else if (currentLevel === 2) {
  //   teamsArr = teamsArr.filter((team) => team.length >= 6);
  //   console.log('Level 2 teams arr:', teamsArr);
  // } else if (currentLevel === 3) {
  //   teamsArr = teamsArr.filter((team) => team.length >= 12);
  //   console.log('Level 3 teams arr:', teamsArr);
  // }

  // if (currentLevel === 1) {
  //   setTeamsArr(teamsArr.filter((team) => team.length >= 3));
  //   console.log('Level 1 teams arr:', teamsArr);
  // } else if (currentLevel === 2) {
  //   setTeamsArr(teamsArr.filter((team) => team.length >= 6));
  //   console.log('Level 2 teams arr:', teamsArr);
  // } else if (currentLevel === 3) {
  //   setTeamsArr(teamsArr.filter((team) => team.length >= 12));
  //   console.log('Level 3 teams arr:', teamsArr);
  // }

  // renders on every countdown - useEffect
  // const randomTeam = teamsArr[0][0];
  // console.log('Random Team:', randomTeam);
  //
  // const staffArr = randomTeam;
  // console.log('Staff Arr in App', staffArr);

  useEffect(() => {

    let teamsArr = [];

    teamsArr.push(Object.values(teams));
    // setTeamsArr(teamsArr.push(Object.values(teams)));

    teamsArr[0].sort(() => Math.random() - 0.5);
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

    // setRandomTeam(teamsArr[0][0]);
    // console.log('Random Team:', randomTeam);

    setStaffArr(teamsArr[0][0]);
    console.log('Staff Arr in App', staffArr);
  }, []);


  // renders on every countdown - useEffect


  // // passed to header
  // let teamName;
  //
  // if (staffArr === digitalTeam) {
  //   teamName = 'Digital Team';
  //   console.log(teamName);
  // } else if (staffArr === creativeTeam) {
  //   teamName = 'Creative Team';
  //   console.log(teamName);
  // } else if (staffArr === clientServicesTeam) {
  //   teamName = 'Client Services Team';
  //   console.log(teamName);
  // } else if (staffArr === partnerMarketingTeam) {
  //   teamName = 'Partner Marketing Team';
  //   console.log(teamName);
  // } else if (staffArr === mediaTeam) {
  //   teamName = 'Media Team';
  //   console.log(teamName);
  // } else if (staffArr === strategyTeam) {
  //   teamName = 'Strategy Team';
  //   console.log(teamName);
  // } else if (staffArr === businessSupportTeam) {
  //   teamName = 'Business Support Team';
  //   console.log(teamName);
  // } else if (staffArr === managementTeam) {
  //   teamName = 'Management Team';
  //   console.log(teamName);
  // }


  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        {/*<Loading />*/}
        <Header currentPage={currentPage}
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
                countdown={countdown}
                currentLevel={currentLevel}/>
        <Routes>
          <Route
            path='/'
            element={<Intro
              filteredAllStaff={filteredAllStaff}
              setCurrentPage={setCurrentPage} />}/>
          <Route
            path='/card-list'
            element={<CardList
              staffArr={staffArr}
              filteredAllStaff={filteredAllStaff}
              currentLevel={currentLevel}
              nextLevel={nextLevel}
              setCurrentPage={setCurrentPage}
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
