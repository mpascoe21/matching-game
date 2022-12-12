import React from "react";
import styles from './styles.module.scss';

const CardFront = ({card, flipped}) => {
  return (
    <div className={styles.cardFront + ' ' + (flipped ? styles.flipped : '')}>
      <img role='img' className={styles.cardFrontImg} src={card.image.desktop ? card.image.desktop : card.image.mobile} alt="card front"/>
      <div className={styles.staffDetails}>
        <h4 data-testid='title'>{card.title}</h4>
        <p>{card.position}</p>
      </div>
    </div>
  );
}

export default CardFront;
