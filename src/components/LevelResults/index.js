import React from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.scss';

const LevelResults = () => {
  return (
    <div className={styles.bgContainer}>
      <div className={styles.copyContainer}>
        <h1>You’re a real pro!</h1>
        <h4>You completed LEVEL x in x seconds!</h4>
        <Link to='/card-list' className={styles.button}>Next Level</Link>
      </div>
    </div>
  );
}

export default LevelResults;
