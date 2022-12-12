import React from 'react';
import CountdownTimer from '../CountdownTimer';

import styles from './styles.module.scss';

const HeaderTitle = ({ currentPage, currentLevel, time, isActive, isPaused, setTime }) => {
  const introHeader = () => {
    return
    <p className={styles.introTitle}>
      Twogether
    </p>;
  }

  const cardListHeader = () => {
    return <>
      <p className={styles.cardListTitle}>
        Level {currentLevel}
      </p>
      <CountdownTimer
        isActive={isActive}
        isPaused={isPaused}
        setTime={setTime}
        time={time}/>
    </>;
  }

  return (
    <div className={styles.titleContainer}>
      {currentPage === 'cardList' ? cardListHeader() : introHeader()}
    </div>
  );
}

export default HeaderTitle;
