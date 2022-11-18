import React from "react";
import styles from './styles.module.scss';

const CardBack = ({card, handleChoice}) => {

  const handleClick = () => {
    handleChoice(card)
  }

  return (
    <div className={styles.cardBack} onClick={handleClick}>
      <img className={styles.cardBackImg} src="/images/rhino.png" alt="card back"/>
    </div>
  );
}

export default CardBack;
