import React, { useState, useEffect, useRef } from 'react';
import Cache from '../../service/Cache';

import styles from './styles.module.scss';

const LevelResults = ({setCurrentPage}) => {
  const cache = new Cache();
  const titles = [
    'Great job!',
    'Awesome!',
    'You’re a real pro!',
  ];
  const hasLoaded = useRef(false);
  const [title, setTitle] = useState('');
  const [levelCompleted] = useState(() => {
    return cache.get('level_completed') ?? 0;
  });
  const [results] = useState(() => {
    let results = cache.get('results') ?? 0;

    // Ensure results is 2 decimal places
    results = (results / 1000).toFixed(2);

    return results;
  });

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    // Set a random title
    setTitle(titles[Math.floor(Math.random() * titles.length)]);

    setCurrentPage('resultsPage');
  }, []);

  return (
    <div className={styles.bgContainer + ' ' + styles['completed' + levelCompleted]}>
      <div className={styles.copyContainer}>
        <h1>{title}</h1>
        <h4>You completed level {levelCompleted} in {results} seconds!</h4>
        <a href='/card-list' className={styles.button}>
          Next Level
        </a>
      </div>
    </div>
  );
}

export default LevelResults;
