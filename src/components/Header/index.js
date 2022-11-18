import React from "react";
import styles from './styles.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <img src='/images/rhino-logo.png' alt="Twogether Rhino Logo"/>
      <p>X Team / Level & Timer</p>
      <div></div>
    </div>
  );
}

export default Header;
