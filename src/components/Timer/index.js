import React from "react";
import styles from './styles.module.scss';

const Timer = ({time}) => {
  return (
    <div className={styles.timer}>
      <span className={styles.timeTitle}>TIME</span>
      <span>
        {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
      </span>
      <span>
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
      </span>
    </div>
  );
}

export default Timer;
