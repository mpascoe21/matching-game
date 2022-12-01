import React, { useEffect, useRef, useState, useMemo, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cache from './service/Cache';
import Loading from './components/Loading';
import Header from './components/Header';
import Api from './Api';

// import styles from './App.module.scss';
import LevelConfig from "./config/LevelConfig";
import TeamsData from "./data/TeamsData";

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
  const [teamName, setTeamName] = useState('');
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

    Api.AuditLog.process({
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
        "Team": teamName,
      }
    }).then(() => {}).catch((e) => {
      console.log('audit error:', e);
    });
  };

  const hasLoaded = useRef(false);

  const getStaffData = () => {
    Api.Team.get().then((response) => {
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
    setStaffArr((existingStaffArr) => {
      if (0 !== existingStaffArr.length) return existingStaffArr;

      let teamsArr = [];

      for (let idx in teams) {
        if (teams[idx].length < LevelConfig[currentLevel].cards) {
          continue;
        }

        teamsArr.push({
          key: idx,
          staff: teams[idx]
        });
      }

      teamsArr.sort(() => Math.random() - 0.5);
      console.log('teamsArr', teamsArr);

      const selTeamsArr = teamsArr[0];
      selTeamsArr.staff.forEach((staffMember) => {
        staffMember.matched = false;
      });

      console.log("selected teams array:", selTeamsArr);
      console.log("Selected Department:", TeamsData[selTeamsArr.key]);

      setTeamName(TeamsData[selTeamsArr.key]);

      return selTeamsArr.staff;
    });
  }, [teams, currentLevel]);

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
              teamName={teamName}
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
