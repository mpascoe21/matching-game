import React, { useState, useEffect, useRef } from 'react';
import Cache from '../../service/Cache';

import styles from './styles.module.scss';
import InitialResultsData from "../../data/InitialResultsData";

const LevelResults = ({setCurrentPage, turns}) => {
  const cache = new Cache();
  const hasLoaded = useRef(false);
  const [title, setTitle] = useState('');

  const [btnText, setBtnText] = useState('Next Level');
  const [levelCompleted] = useState(() => {
    return cache.get('level_completed') ?? 0;
  });
  const [results] = useState(() => {
    let results = cache.get('results') ?? 0;

    // Ensure results is 2 decimal places
    results = (results / 1000).toFixed(2);

    return results;
  });

  const [levelResults, setLevelResults] = useState(() => {
    const levelResultsCache = cache.get('level_results');

    if (null !== levelResultsCache) {
      return levelResultsCache;
    }

    return InitialResultsData;
  });


  console.log('level completed', levelCompleted);
  console.log('RESULTS', results);

  const resultsMessage = () => {
    if (levelCompleted === 1 || levelCompleted === 2) {
      return <h4>
        You completed level {levelCompleted} in {results} seconds and turned {turns * 2} cards!
      </h4>
    } else if (levelCompleted === 3) {
      return <>
        <h2>Here are your results</h2>
        <table className={styles.table}>
          <tr className={styles.tableRow}>
            <th>Level</th>
            <th>Seconds</th>
            <th>Cards turned</th>
            <th>Attempts</th>
          </tr>
          <tr className={styles.tableRow}>
            <td>1</td>
            <td>{levelResults.level1.completedIn}</td>
            <td>{levelResults.level1.cardTurns * 2}</td>
            <td>{levelResults.level1.attempts}</td>
          </tr>
          <tr className={styles.tableRow}>
            <td>2</td>
            <td>{levelResults.level2.completedIn}</td>
            <td>{levelResults.level2.cardTurns * 2}</td>
            <td>{levelResults.level2.attempts}</td>
          </tr>
          <tr className={styles.tableRow}>
            <td>3</td>
            <td>{levelResults.level3.completedIn}</td>
            <td>{levelResults.level3.cardTurns * 2}</td>
            <td>{levelResults.level3.attempts}</td>
          </tr>
        </table>
      </>
    }
  }

  const updateLevelResults = (results, turns) => {
    const curLevelResults = { ...levelResults };
    curLevelResults['level' + levelCompleted] = {
      completedIn: results,
      cardTurns: turns,
      attempts: levelResults['level' + levelCompleted].attempts
    };

    cache.set('level_results', curLevelResults);

    setLevelResults(curLevelResults);
  };

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    if (levelCompleted === 3) {
      setBtnText('Play Again');
    }

    updateLevelResults(results, turns);

    const titles = [
      'Great job!',
      'Awesome!',
      'You’re a real pro!',
    ];

    // Set a random title
    setTitle(titles[Math.floor(Math.random() * titles.length)]);

    setCurrentPage('resultsPage');
  }, [setCurrentPage, updateLevelResults]);

  return (
    <div className={styles.bgContainer + ' ' + styles['completed' + levelCompleted]}>
      <div className={styles.copyContainer}>
        <h1>
          {title}
        </h1>
        <div>
          {resultsMessage()}
        </div>
        <a href='/card-list' className={styles.button}>
          {btnText}
        </a>
      </div>
    </div>
  );
}

export default LevelResults;
