import React, {useEffect, useRef, useState} from "react";
import styles from './styles.module.scss';
import Card from "../Card";
import {useNavigate} from "react-router-dom";

const CardList = ({ staffArr, filteredAllStaff, currentLevel, nextLevel, setCurrentPage, timeLeft, setTimeLeft, countdown, stopTimer }) => {

  console.log('Checking time left in cardList.', timeLeft);

  const hasLoaded = useRef(false);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [gameArr, setGameArr] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  //* Adds 'matched' to each staff member
  filteredAllStaff.forEach((staffMember) => {
    staffMember.matched = false;
  });
  console.log('filtered All Staff in card list', filteredAllStaff);
  console.log('Checking if cards matched.', cards.map(card => card.matched));

  setCurrentPage('cardList');
  // console.log('currentPage is:', currentPage);

  // Randomizes images
  staffArr.sort(() => Math.random() - 0.5);
  console.log('Staff arr in card list.', staffArr);

  useEffect(() => {
    if (hasLoaded.current === currentLevel) return;
    hasLoaded.current = currentLevel;

    if (currentLevel === 1) {
      setGameArr(staffArr.slice(0, 3));
      setTimeLeft(15);
    } else if (currentLevel === 2) {
      setGameArr(staffArr.slice(0, 6));
      setTimeLeft(30);
    } else if (currentLevel === 3) {
      setGameArr(staffArr.slice(0, 12));
      setTimeLeft(45);
    }
  }, [currentLevel, staffArr, setTimeLeft, hasLoaded, setGameArr]);

  // let gameArr = []; //set as state
// Cuts array dependent on game level
//   if (currentLevel === 1) {
//     gameArr = staffArr.slice(0, 3);
//     setTimeLeft(15);
//   } else if (currentLevel === 2) {
//     gameArr = staffArr.slice(0, 6);
//     setTimeLeft(30);
//     // console.log('Timeleft in card list:', timeLeft);
//   } else if (currentLevel === 3) {
//     gameArr = staffArr.slice(0, 12);
//     setTimeLeft(45);
//   }



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
  console.log('cards in cardList', cards);

  //* handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //* compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.slug === choiceTwo.slug) {
        console.log('cards match')
        setCards((prevCards) => {
          return prevCards.map(card => {
            if (card.slug === choiceOne.slug) {
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

  if (timeLeft === 0) {
    navigate("/level-error");
    // setTimeLeft(currentLevel === 1 ? 15 : currentLevel === 2 ? 30 : currentLevel === 3 ? 45 : '')
  }

  useEffect(() => {
    console.log(cards);
    if (cards.length === 0) return;
    // Checks if all cards are matched.
    if (cards.every(card => card.matched === true)) {
      stopTimer();
      // setTimerRunning(false);
      // console.log('TIme left when all card match', timeLeft);
      navigate("/level-results");
      console.log('Well done!');
      nextLevel();
    }
  }, [cards, stopTimer, navigate, nextLevel]);

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
