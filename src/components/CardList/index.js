import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';
import LevelConfig from '../../config/LevelConfig';

import styles from './styles.module.scss';

const CardList = ({ staffArr, currentLevel, nextLevel, setTurns, setCurrentPage, handlePause, handleStart}) => {
  const hasLoaded = useRef(false);
  const [cards, setCards] = useState([]);
  const [gameArr, setGameArr] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  handleStart();

  // Randomizes images
  useEffect(() => {
    if (0 === staffArr.length) return;

    //* shuffle cards
    staffArr.sort(() => Math.random() - 0.5);

    console.log('Staff arr in card list.', staffArr);
  }, [staffArr]);

  useEffect(() => {
    if (hasLoaded.current === currentLevel) return;
    hasLoaded.current = currentLevel;

    // Set amount of cards from config
    setGameArr(staffArr.slice(0, LevelConfig[currentLevel].cards));

    // Set current page (for header)
    setCurrentPage('cardList');
  }, [currentLevel, staffArr, hasLoaded, setGameArr, setCurrentPage]);

  useEffect(() => {
    // Duplicate each member for matching
    const shuffledCards = [...gameArr, ...gameArr]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
  }, [gameArr]);

  //* handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //* compare 2 selected cards
  useEffect(() => {
    //* reset choices & increase turn
    const resetTurn = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns(prevTurns => prevTurns + 1);
      setDisabled(false);
    }

    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.slug === choiceTwo.slug) {
        console.log('cards match');
        setCards((prevCards) => {
          return prevCards.map(card =>
            (card.slug === choiceOne.slug) ? { ...card, matched: true } : card
          );
        });
        resetTurn();
      } else {
        console.log('cards do not match');

        //* delays the turn of un-matched cards by 0.5s.
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo, setTurns]);


  useEffect(() => {
    if (cards.length === 0) return;

    // Checks if all cards are matched.
    if (cards.every(card => card.matched === true)) {
      console.log('Well done!');

      handlePause();
      nextLevel();

      setTimeout(() => navigate("/level-results"), 1000);
    }
  }, [cards, navigate, handlePause, nextLevel]);

  return (
    <div className={styles.cardGrid + ' ' + (currentLevel === 3 ? styles.cardLevel3 : '')}>
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          currentLevel={currentLevel}
        />
      ))}
    </div>
  );
}

export default CardList;
