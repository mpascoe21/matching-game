import React, { useEffect, useRef, useState, useMemo, lazy, Suspense } from 'react';
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
  const cache = useMemo(() => new Cache(), []);

  const [currentPage, setCurrentPage] = useState();
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [staffArr, setStaffArr] = useState([]);
  const [turns, setTurns] = useState(0);

  const [teams, setTeams] = useState(() => {
    return cache.get('teams') ?? [];
  });
  const [allStaff, setAllStaff] = useState(() => {
    return cache.get('staff') ?? [];
  });
  const [filteredStaff, setFilteredStaff] = useState(() => {
    return cache.get('all_staff_filtered') ?? [];
  });
  const [levelCompleted] = useState(() => {
    return cache.get('level_completed') ?? 0;
  });
  const [currentLevel] = useState(() => {
    return cache.get('current_level') ?? 1;
  });

  const [time, setTime] = useState(LevelConfig[currentLevel].time * 1000);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    // setIsPaused(!isPaused);
    setIsPaused(true);
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
        "Attempts": turns,
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
    setFilteredStaff((existingFilteredStaff) => {
      if (0 !== existingFilteredStaff.length) return existingFilteredStaff;

      const filtered = allStaff.filter(
        (teamMember) => !(teamMember.image.mobile || teamMember.image.desktop).includes('team-avatar') ? teamMember : null
      );

      // Cache filtered staff array to avoid keep rebuilding array data
      cache.set('all_staff_filtered', filtered, 1);

      return filtered;
    });
  }, [cache, allStaff]);

  useEffect(() => {
    setTeams((existingTeams) => {
      if (0 !== existingTeams.length) return existingTeams;

      const newTeams = {};
      filteredStaff.forEach((staffMember) => {
        staffMember.department.forEach((department) => {
          if (!newTeams.hasOwnProperty(department)) {
            newTeams[department] = [];
          }
          newTeams[department].push(staffMember);
        });
      });

      // Cache teams to avoid keep rebuilding array data
      cache.set('teams', newTeams, 1);

      return newTeams;
    });
  }, [cache, filteredStaff]);

  useEffect(() => {
    setStaffArr(() => {
      let teamsArr = [];
      teamsArr.push(Object.values(teams));
      teamsArr[0].sort(() => Math.random() - 0.5);
      teamsArr = teamsArr[0].filter(
        (team) => team.length >= LevelConfig[currentLevel].cards
      );
      teamsArr[0].forEach((staffMember) => {
        staffMember.matched = false;
      });

      return teamsArr[0];
    });
  }, [teams, currentLevel]);

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
        <Header
          currentPage={currentPage}
          isActive={isActive}
          isPaused={isPaused}
          time={time}
          setTime={setTime}
          currentLevel={currentLevel}
        />
        <Routes>
          <Route
            path='/'
            element={<Intro
              filteredStaff={filteredStaff}
              setCurrentPage={setCurrentPage}
            />}
          />
          <Route
            path='/card-list'
            element={<CardList
              staffArr={staffArr}
              currentLevel={currentLevel}
              setTurns={setTurns}
              nextLevel={nextLevel}
              handleStart={handleStart}
              handlePause={handlePause}
              setCurrentPage={setCurrentPage}
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
