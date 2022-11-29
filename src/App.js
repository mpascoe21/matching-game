import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cache from './service/Cache';
import Loading from './components/Loading';
import Header from './components/Header';
import Team from './api/Team';

// import styles from './App.module.scss';
import AuditLog from "./api/AuditLog";
import LevelConfig from "./config/LevelConfig";

const Intro = lazy(() => import('././components/Intro'));
const CardList = lazy(() => import('././components/CardList'));
const LevelResults = lazy(() => import('./components/LevelResults'));
const LevelError = lazy(() => import('./components/LevelError'));

const App = () => {
  const cache = new Cache();

  const [currentPage, setCurrentPage] = useState();
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);

  const [staffArr, setStaffArr] = useState([]);
  const [teams, setTeams] = useState(() => {
    return cache.get('teams') ?? [];
  });
  const [filteredAllStaff, setFilteredAllStaff] = useState(() => {
    return cache.get('all_staff_filtered') ?? [];
  });

  const [currentLevel] = useState(() => {
    return cache.get('current_level') ?? 1;
  });

  const [time, setTime] = useState(LevelConfig[currentLevel].time * 1000);

  const [levelCompleted] = useState(() => {
    return cache.get('level_completed') ?? 0;
  });
  const [allStaff, setAllStaff] = useState(() => {
    return cache.get('staff') ?? [];
  });

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    // setIsPaused(!isPaused);
    setIsPaused(true);
  }

  const handleReset = () => {
    setIsActive(false);
    setTime(10000)
  }

  const nextLevel = () => {
    cache.set('current_level', currentLevel + 1, 1);
    cache.set('level_completed', currentLevel, 1);
    cache.set('results', (LevelConfig[currentLevel].time * 1000) - time, 1);

    console.log("COMPLETED IN:", (LevelConfig[currentLevel].time * 1000) - time);

    AuditLog.process({
      type: 'level_completed',
      event: {
        category: 'Level',
        action: 'completed',
        label: currentLevel,
      },
      dimension: {
        a: '',
        b: '',
        c: '',
      },
      extra: {
        "Time Left": time,
        "Completed In": (LevelConfig[currentLevel].time * 1000) - time,
      }
    });
  };

  const hasLoaded = useRef(false);

  const getStaffData = () => {
    Team.get().then((response) => {
      setAllStaff(response);
    }).catch((e) => console.error(e));
  };

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    if (0 === allStaff.length) getStaffData();
  }, [allStaff]);

  useEffect(() => {
    if (0 !== filteredAllStaff.length) return;

    console.log('All Staff', allStaff);

    const filtered = allStaff.filter(
      (teamMember) => !(teamMember.image.mobile || teamMember.image.desktop).includes('team-avatar') ? teamMember : null
    );

    // Cache filtered staff array to avoid keep rebuilding array data
    cache.set('all_staff_filtered', filtered, 1)

    setFilteredAllStaff(filtered);
    console.log('setFilteredAllStaff', filtered);
  }, []);

  useEffect(() => {
    if (0 !== teams.length) return;

    filteredAllStaff.forEach((staffMember) => {
      staffMember.department.forEach((department) => {
        if (!teams.hasOwnProperty(department)) {
          teams[department] = [];
        }
        teams[department].push(staffMember);
      });
    });

    // Cache teams to avoid keep rebuilding array data
    cache.set('teams', teams, 1);

    setTeams(teams);
  }, [filteredAllStaff, cache]);

  useEffect(() => {
    let teamsArr = [];

    teamsArr.push(Object.values(teams));

    teamsArr[0].sort(() => Math.random() - 0.5);
    console.log('Randomized Teams arr:', teamsArr);

    teamsArr = teamsArr[0].filter((team) => team.length >= LevelConfig[currentLevel].cards);

    setStaffArr(teamsArr[0]);
    console.log('Staff Arr in App', staffArr);
  }, [teams]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Header
          currentPage={currentPage}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          isActive={isActive}
          isPaused={isPaused}
          setTime={setTime}
          time={time}
          handleStart={handleStart}
          handlePauseResume={handlePauseResume}
          handleReset={handleReset}
          currentLevel={currentLevel}
        />
        <Routes>
          <Route
            path='/'
            element={<Intro
              filteredAllStaff={filteredAllStaff}
              setCurrentPage={setCurrentPage}
            />}
          />
          <Route
            path='/card-list'
            element={<CardList
              staffArr={staffArr}
              filteredAllStaff={filteredAllStaff}
              currentLevel={currentLevel}
              nextLevel={nextLevel}
              time={time}
              handleStart={handleStart}
              handlePauseResume={handlePauseResume}
              setCurrentPage={setCurrentPage}
              setTimeLeft={setTimeLeft}
            />}
          />
          <Route
            path='/level-error'
            element={<LevelError
              setCurrentPage={setCurrentPage}
            />}
          />
          <Route
            path='/level-results'
            element={<LevelResults
              currentLevel={currentLevel}
              levelCompleted={levelCompleted}
              setCurrentPage={setCurrentPage}
            />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
