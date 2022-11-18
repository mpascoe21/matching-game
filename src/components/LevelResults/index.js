import React, {useState} from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.scss';

const LevelResults = ({currentLevel, levelCompleted}) => {

console.log(currentLevel + ' in results');


  return (
    <div className={styles.bgContainer + ' ' + (currentLevel === 2 ? styles.completed1 : currentLevel === 3 ? styles.completed2 : styles.completed3)}>
      <div className={styles.copyContainer}>
        <h1>You’re a real pro!</h1>
        <h4>You completed level {levelCompleted} in x seconds!</h4>
        <Link to='/card-list' className={styles.button}>Next Level</Link>
      </div>
    </div>
  );
}

export default LevelResults;
