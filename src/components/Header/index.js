import React from "react";
import styles from './styles.module.scss';
import CountdownTimer from "../CountdownTimer";
import HeaderTitle from "../HeaderTitle";

const Header = ({currentPage, timeLeft, setTimeLeft, countdown, currentLevel, teamName, time, isActive, isPaused, handleStart, setTime, handleReset, handlePauseResume}) => {




  return (
    <div className={styles.header + ' ' + (currentPage === 'cardList' ? styles.gameHeader : '')}>
      <img src='/images/img-rhino-logo.png' alt="Twogether Rhino Logo"/>
      <div>
        <HeaderTitle currentPage={currentPage}
                     timeLeft={timeLeft}
                     isActive={isActive}
                     isPaused={isPaused}
                     setTime={setTime}
                     time={time}
                     handleStart={handleStart}
                     handlePauseResume={handlePauseResume}
                     handleReset={handleReset}
                     setTimeLeft={setTimeLeft}
                     countdown={countdown}
                     currentLevel={currentLevel}
                     teamName={teamName}/>
      </div>
      <div className={styles.placeholder}></div>
    </div>
  );
}

export default Header;
