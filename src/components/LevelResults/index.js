import React from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.scss';

const LevelResults = () => {

  //if level 1 complete bgImg = level1.png h1 ...
    // level 2 complete bgImg = level2.png h1 ....
    // level 3 complete bgImg = level3.png h1 .....


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
