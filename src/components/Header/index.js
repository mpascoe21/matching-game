import React from "react";
import styles from './styles.module.scss';
import HeaderTitle from "../HeaderTitle";

const Header = ({currentPage, currentLevel, teamName, time, isActive, isPaused, setTime}) => {

  return (
    <div className={styles.header + ' ' + (currentPage === 'cardList' ? styles.gameHeader : '')}>
      <img src='/images/img-rhino-logo.png' alt="Twogether Rhino Logo"/>
      <div>
        <HeaderTitle currentPage={currentPage}
                     isActive={isActive}
                     isPaused={isPaused}
                     setTime={setTime}
                     time={time}
                     currentLevel={currentLevel}
                     teamName={teamName}/>
      </div>
      <div className={styles.placeholder}></div>
    </div>
  );
}

export default Header;
