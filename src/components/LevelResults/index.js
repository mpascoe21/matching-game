import React, { useState, useEffect, useRef } from 'react';
import Cache from '../../service/Cache';

import styles from './styles.module.scss';
import InitialResultsData from "../../data/ResultsData";

const LevelResults = ({setCurrentPage}) => {
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

    // const [level1Results, setLevel1Results] = useState(() => {
    //   if (levelCompleted === 1) {
    //     let results = localStorage.getItem('level_1_results');
    //     return results;
    //   }
    // })

  // console.log('current level', currentLevel);
  console.log('level completed', levelCompleted);
  console.log('RESULTS', results);
  // console.log('L1 RESULTS', level1Results);

  if (levelCompleted === 1) {
    localStorage.setItem('level_1_results', results);
    console.log('level_1_results', localStorage.getItem('level_1_results'));
  } else if (levelCompleted === 2) {
    localStorage.setItem('level_2_results', results);
    console.log('level_2_results', localStorage.getItem('level_2_results'));
  } else if (levelCompleted === 3) {
    localStorage.setItem('level_3_results', results);
    console.log('level_3_results', localStorage.getItem('level_3_results'));
  }

  const resultsMessage = () => {
    if (levelCompleted === 1 || levelCompleted === 2) {
      return <h4>
        You completed level {levelCompleted} in {results} seconds!
      </h4>
    } else if (levelCompleted === 3) {
      return <>
        <h4>
          You completed level 1 in {localStorage.getItem('level_1_results')} seconds!
        </h4>
        <h4>
          You completed level 2 in {localStorage.getItem('level_2_results')} seconds!
        </h4>
        <h4>
          You completed level 3 in {localStorage.getItem('level_3_results')} seconds!
        </h4>
      </>
    }
  }

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    if (levelCompleted === 3) {
      setBtnText('Play Again');
    }

    const titles = [
      'Great job!',
      'Awesome!',
      'You’re a real pro!',
    ];

    // Set a random title
    setTitle(titles[Math.floor(Math.random() * titles.length)]);

    setCurrentPage('resultsPage');
  }, [setCurrentPage]);

  // const resultsMessage = () => {
  //   if (levelCompleted === 1 || levelCompleted === 2) {
  //     return <h4>
  //       You completed level {levelCompleted} in {results} seconds!
  //     </h4>
  //   } else if (levelCompleted === 3) {
  //     return <>
  //       <h4>
  //         You completed level 1 in {localStorage.getItem('level_1_results')} seconds!
  //       </h4>
  //       <h4>
  //         You completed level 2 in {localStorage.getItem('level_2_results')} seconds!
  //       </h4>
  //       <h4>
  //         You completed level 3 in {localStorage.getItem('level_3_results')} seconds!
  //       </h4>
  //     </>
  //   }
  // }

  // console.log(InitialResultsData);

  return (
    <div className={styles.bgContainer + ' ' + styles['completed' + levelCompleted]}>
      <div className={styles.copyContainer}>
        <h1>
          {title}
        </h1>
        {/*<h4>*/}
        {/*  You completed level {levelCompleted} in {results} seconds!*/}
        {/*</h4>*/}
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
