import React, {useEffect, useState, useRef} from "react";
import styles from './styles.module.scss';

const CountdownTimer = ({timeLeft, setTimeLeft, countdown}) => {
   const hasLoaded = useRef(false);
  // const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
      if (hasLoaded.current) return;
      hasLoaded.current = true;

      console.log('START COUNTDOWN');
      countdown();
      //
      // const countdown = () => {
      //   setTimeout(() => {
      //       setTimeLeft((timeLeft) => timeLeft > 0 ? timeLeft - 1 : timeLeft);
      //     countdown();
      //   }, 1000);
      // };

      // return () => {
      //   clearTimeout(countdown);
      // }
      //
      // countdown();
  },[]);

  return (
    <div className={styles.counter}>
      <span className={styles.label}>TIME</span>
      <span className={styles.value}>{timeLeft}</span>
    </div>
  );
}

export default CountdownTimer;
