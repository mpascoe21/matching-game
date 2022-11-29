import React from 'react';
import HeaderTitle from '../HeaderTitle';

import styles from './styles.module.scss';

const Header = ({ currentPage, currentLevel, time, isActive, isPaused, setTime }) => {
  return (
    <div className={styles.header + ' ' + (currentPage === 'cardList' ? styles.gameHeader : '')}>
      <img src='/images/img-rhino-logo.png' alt="Twogether Rhino Logo"/>
      <div>
        <HeaderTitle
          currentPage={currentPage}
          isActive={isActive}
          isPaused={isPaused}
          setTime={setTime}
          time={time}
          currentLevel={currentLevel}
        />
      </div>
      <div className={styles.placeholder + ' ' + (currentPage === 'cardList' ? styles.noPlaceholder : '')}></div>
    </div>
  );
}

export default Header;
