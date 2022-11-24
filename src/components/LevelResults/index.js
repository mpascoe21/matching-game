import React, {useState} from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.scss';

const LevelResults = ({currentLevel, levelCompleted, setCurrentPage}) => {

console.log(currentLevel + ' in results');

  setCurrentPage('resultsPage');

  return (
    <div className={styles.bgContainer + ' ' + (currentLevel === 2 ? styles.completed1 : currentLevel === 3 ? styles.completed2 : styles.completed3)}>
      <div className={styles.copyContainer}>
        <h1>You’re a real pro!</h1>
        <h4>You completed level {levelCompleted} in x seconds!</h4>
        <a href='/card-list' className={styles.button}>Next Level</a>
      </div>
    </div>
  );
}

export default LevelResults;
