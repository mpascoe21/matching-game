import React, {useEffect, useState, useRef} from "react";
import styles from './styles.module.scss';
import Timer from "../Timer";
import StopTimer from "../StopTimer";

// {timeLeft, setTimeLeft, countdown}

const CountdownTimer = ({time, setTime, handleStart, handleReset, isActive, isPaused, handlePauseResume}) => {
  //  const hasLoaded = useRef(false);
  // // const [timeLeft, setTimeLeft] = useState(10);
  //
  // useEffect(() => {
  //     if (hasLoaded.current) return;
  //     hasLoaded.current = true;
  //
  //     console.log('START COUNTDOWN');
  //     countdown();
  //     //
  //     // const countdown = () => {
  //     //   setTimeout(() => {
  //     //       setTimeLeft((timeLeft) => timeLeft > 0 ? timeLeft - 1 : timeLeft);
  //     //     countdown();
  //     //   }, 1000);
  //     // };
  //
  //     // return () => {
  //     //   clearTimeout(countdown);
  //     // }
  //     //
  //     // countdown();
  // },[]);

  // const [isActive, setIsActive] = useState(false);
  // const [isPaused, setIsPaused] = useState(true);
  // const [time, setTime] = useState(10000);

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

  // handleStart()
  //
  // handlePauseResume();
  //
  // handleReset()

  // const handleStart = () => {
  //   setIsActive(true);
  //   setIsPaused(false);
  // };
  //
  // const handlePauseResume = () => {
  //   setIsPaused(!isPaused);
  // }
  //
  // const handleReset = () => {
  //   setIsActive(false);
  //   setTime(10000)
  // }

  return (
    <div>
      <Timer time={time} />
      {/*<StopTimer*/}
      {/*  active={isActive}*/}
      {/*  isPaused={isPaused}*/}
      {/*  handleStart={handleStart}*/}
      {/*  handlePauseResume={handlePauseResume}*/}
      {/*  handleReset={handleReset}*/}
      {/*/>*/}

    </div>

    // <div className={styles.counter}>
    //   <span className={styles.label}>TIME</span>
    //   <span className={styles.value}>{timeLeft}</span>
    // </div>
  );
}

export default CountdownTimer;
