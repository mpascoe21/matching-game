import React, {useEffect, useRef, useState} from "react";
import styles from './styles.module.scss';
import Card from "../Card";
import {useNavigate} from "react-router-dom";

const CardList = ({ staffArr, allStaff, currentLevel, nextLevel, currentPage }) => {

  const hasLoaded = useRef(false);
  const [cards, setCards] = useState([]);
  // const [allStaff, setAllStaff] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  // const [currentLevel, setCurrentLevel] = useState(1);
  const navigate = useNavigate();

  currentPage = 'cardList';
  console.log(currentPage);

  // Randomizes dummy images
  staffArr.sort(() => Math.random() - 0.5);

  let gameArr = [];
// Cuts array dependent on game level
  if (currentLevel === 1) {
    gameArr = staffArr.slice(0, 3);
  } else if (currentLevel === 2) {
    gameArr = staffArr.slice(0, 6);
  } else if (currentLevel === 3) {
    gameArr = staffArr.slice(0, 12);
  }

  //* Adds 'matched' to each staff member
  allStaff.forEach((staffMember) => {
    staffMember.matched = false;
  });
  console.log('Checking if cards matched.', cards.map(card => card.matched));

  //* shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...gameArr, ...gameArr]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  }
  console.log(cards);

  //* handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //* compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.image.desktop === choiceTwo.image.desktop) {
        console.log('cards match')
        setCards((prevCards) => {
          return prevCards.map(card => {
            if (card.image.desktop === choiceOne.image.desktop) {
              return {...card, matched: true}
            } else {
              return card;
            }
          })
        })
        resetTurn()
      } else {
        console.log('cards do not match')

        //* delays the turn of un-matched cards by 0.5s.
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  //* reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // Start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, []);

  useEffect(() => {
    console.log(cards);
    if (cards.length === 0) return;
    // Checks if all cards are matched.
    if (cards.every(card => card.matched === true)) {
      navigate("/level-results");
      console.log('Well done!');
      nextLevel();
      // console.log(currentLevel + ' in cardList');
    }
  }, [cards]);

  return (
    <div className={styles.cardGrid}>
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
