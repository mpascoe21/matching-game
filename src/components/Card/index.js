import React, {useState} from "react";
import styles from './styles.module.scss';
import CardBack from "../CardBack";
import CardFront from "../CardFront";

const Card = ({ card, handleChoice, flipped, disabled }) => {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className={styles.card + ' ' + (flipped ? styles.flipped : '')}>
      <div className={styles.cardFront}>
        <img className={styles.cardFrontImg} src={card.src} alt="card front"/>
        <div className={styles.staffDetails}>
          <h4>{card.name}</h4>
          <p>Job title</p>
        </div>
      </div>
      <div className={styles.cardBack} onClick={handleClick}>
        <img className={styles.cardBackImg} src="/images/rhino.png" alt="card back"/>
      </div>
      {/*<CardFront card={card} flipped={flipped}/>*/}
      {/*<CardBack onClick={handleClick}/>*/}
    </div>
  );
}
export default Card;
