import React from 'react';
import HeaderTitle from '../HeaderTitle';

import styles from './styles.module.scss';
import Image from "../Image";

const Header = ({ currentPage, currentLevel, time, isActive, isPaused, setTime }) => {
  return (
    <div className={styles.header + ' ' + (currentPage === 'cardList' ? styles.gameHeader : '')}>
      <Image className={styles.logo} src='/images/img-rhino-logo' alt='Twogether rhino logo' />
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
