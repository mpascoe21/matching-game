import React, {useEffect, useState} from "react";
import styles from './styles.module.scss';
import InitialResultsData from "../../data/InitialResultsData";
import Cache from "../../service/Cache";

const LevelError = ({currentLevel, setCurrentPage}) => {
  const cache = new Cache();

  const [levelResults] = useState(() => {
    const levelResultsCache = cache.get('level_results');

    if (null !== levelResultsCache) {
      return levelResultsCache;
    }
    return InitialResultsData;
  });

  useEffect(() => {
    setCurrentPage('errorPage');
  }, [setCurrentPage]);

  const tryAgain = () => {
    const curLevelResults = { ...levelResults };
    curLevelResults['level' + currentLevel].attempts = curLevelResults['level' + currentLevel].attempts + 1;

    cache.set('level_results', curLevelResults);

    window.location.replace('/card-list');
  };

  return (
    <div className={styles.bgContainer}>
      <div className={styles.copyContainer}>
        <h1>Level failed!</h1>
        <h4>Better luck next time.</h4>
        <button onClick={tryAgain} className={styles.button}>TRY AGAIN</button>
      </div>
    </div>
  );
}

export default LevelError;
