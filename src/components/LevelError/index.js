import React from "react";
import styles from './styles.module.scss';
// import background from '../../../public/images/failed.jpg'

const LevelError = () => {
  return (
    <div className={styles.bgContainer}>
      <div className={styles.copyContainer}>
        <h1>Level failed!</h1>
        <h4>Better luck next time.</h4>
        <a className={styles.button}>TRY AGAIN</a>
      </div>
    </div>
  );
}

export default LevelError;
