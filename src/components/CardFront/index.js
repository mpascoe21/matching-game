import React from "react";
import styles from './styles.module.scss';

const CardFront = ({ card, flipped }) => {
  return (
    <div className={styles.cardFront}>
      {/*<img src="/images/avatar.png" className={styles.staffImg} alt={'Staff member'}/>*/}

      <img className={styles.cardFrontImg} src={card.src} alt="card front"/>

      <div className={styles.staffDetails}>
        <h4>Name</h4>
        <p>Job title</p>
      </div>
    </div>
  );
}

export default CardFront;
