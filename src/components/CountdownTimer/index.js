import React, {useEffect, useState, useRef} from "react";
import styles from './styles.module.scss';
import Timer from "../Timer";
import StopTimer from "../StopTimer";

// {timeLeft, setTimeLeft, countdown}

const CountdownTimer = ({time, setTime, isActive, isPaused}) => {
  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time > 0 ? time - 10 : time);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  return (
    <div>
      <Timer time={time} />
    </div>
  );
}

export default CountdownTimer;
