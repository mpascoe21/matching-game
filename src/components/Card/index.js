import React, {useState} from "react";
import styles from './styles.module.scss';
import CardBack from "../CardBack";
import CardFront from "../CardFront";

const Card = ({ card, handleChoice, flipped, disabled, currentLevel }) => {

  // console.log(currentLevel + ' in Card');

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className={styles.card + ' ' + (flipped ? styles.flipped : '') + ' ' + (currentLevel === 1 ? styles.cardLevel1 : currentLevel === 2 ? styles.cardLevel2 : styles.cardLevel3)}>
      <div className={styles.cardFront}>
        <img className={styles.cardFrontImg} src={card.image.desktop} alt="card front"/>
        <div className={styles.staffDetails}>
          <h4>{card.name}</h4>
          <p>Job title</p>
        </div>
      </div>
      <div className={styles.cardBack} onClick={handleClick}>
        <img className={styles.cardBackImg} src="/images/rhino.png" alt="card back"/>
      </div>
    </div>
  );
}
export default Card;
