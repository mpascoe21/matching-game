import React, {useEffect, useState, useRef} from "react";
import styles from './styles.module.scss';

const CountdownTimer = () => {

    const hasLoaded = useRef(false);
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
      if (hasLoaded.current) return;
      hasLoaded.current = true;

      const countdown = () => {
        setTimeout(() => {
          setTimeLeft((timeLeft) => timeLeft - 1);

          countdown();
        }, 1000);
      };

      countdown();
    },[]);

  return (
    <div className={styles.counter}>
      <span className={styles.label}>TIME</span>
      <span className={styles.value}>{timeLeft}</span>
    </div>
  );
}

export default CountdownTimer;
