import React from 'react';
import CountdownTimer from "../CountdownTimer";
import styles from './styles.module.scss';

const HeaderTitle = ({currentPage, timeLeft, setTimeLeft, countdown, currentLevel, teamName, time, isActive, isPaused, handleStart, setTime, handleReset, handlePauseResume}) => {

  const introHeader = () => {
    return <p className={styles.introTitle}>Twogether</p>;
  }

  const cardListHeader = () => {
    return <>
      <p className={styles.cardListTitle}>Level {currentLevel}</p>
      <CountdownTimer
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        isActive={isActive}
        isPaused={isPaused}
        setTime={setTime}
        time={time}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
        setTimeLeft={setTimeLeft}
        countdown={countdown}/>
    </>;
  }

  return (
      <div className={styles.titleContainer}>
        {currentPage === 'cardList' ? cardListHeader() : introHeader()}
        {/*<CountdownTimer*/}
        {/*  timeLeft={timeLeft}*/}
        {/*  setTimeLeft={setTimeLeft}*/}
        {/*  countdown={countdown}/>*/}
      </div>
  );
}

export default HeaderTitle;
