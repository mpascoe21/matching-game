import React from "react";
import styles from './styles.module.scss';
import Image from "../Image";

const CardBack = ({ card, flipped, handleChoice, disabled }) => {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className={styles.cardBack + ' ' + (flipped ? styles.flipped : '')} onClick={handleClick}>
      <Image className={styles.cardBackImg} src='/images/img-rhino' alt='Card back with Twogether rhino logo' />
    </div>
  );
}

export default CardBack;
