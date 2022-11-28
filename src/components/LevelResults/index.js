import React, {useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.scss';
import Cache from "../../service/Cache";

const LevelResults = ({setCurrentPage}) => {
  const cache = new Cache();
  const hasLoaded = useRef(false);

  const [levelCompleted] = useState(() => {
    return cache.get('level_completed') ?? 0;
  });

  const [results] = useState(() => {
    let results = cache.get('results') ?? 0;

    results = results / 1000; //cut to 2 digits

    return results;
  });

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    console.log(levelCompleted + ' in results');

    setCurrentPage('resultsPage');
  }, []);

  return (
    <div className={styles.bgContainer + ' ' + styles["completed" + levelCompleted]}>
      <div className={styles.copyContainer}>
        <h1>You’re a real pro!</h1>
        <h4>You completed level {levelCompleted} in {results} seconds!</h4>
        <a href='/card-list' className={styles.button}>Next Level</a>
      </div>
    </div>
  );
}

export default LevelResults;
