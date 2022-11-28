import React from "react";
import styles from './styles.module.scss';

const LevelError = ({setCurrentPage}) => {

  setCurrentPage('errorPage');

  return (
    <div className={styles.bgContainer}>
      <div className={styles.copyContainer}>
        <h1>Level failed!</h1>
        <h4>Better luck next time.</h4>
        <a href='/card-list' className={styles.button}><span>TRY AGAIN</span></a>
      </div>
    </div>
  );
}

export default LevelError;
