import React from "react";
import styles from './styles.module.scss';
import CardBack from "../CardBack";
import CardFront from "../CardFront";

const Card = ({ card, handleChoice, flipped, disabled, currentLevel }) => {

  return (
    <div className={styles.card + ' ' + (flipped ? styles.flipped : '') + ' ' + styles['cardLevel' + currentLevel]}>
      <CardFront card={card} flipped={flipped} />
      <CardBack card={card} flipped={flipped} disabled={disabled} handleChoice={handleChoice}/>
    </div>
  );
}
export default Card;
