import React, {useEffect, useRef, useState} from "react";
import styles from './styles.module.scss';
import Card from "../Card";
import {useNavigate} from "react-router-dom";

const CardList = ({ staffImages }) => {

  const hasLoaded = useRef(false);
  const [cards, setCards] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const navigate = useNavigate();

  // randomizes dummy images
  staffImages.sort(() => Math.random() - 0.5);
  console.log(staffImages);


  let dummyGameArr = [];
// Cuts array dependent on game level. WORKING
  if (currentLevel === 1) {
    dummyGameArr = staffImages.slice(0, 3);
    console.log(dummyGameArr);
  } else if (currentLevel === 2) {
    dummyGameArr = staffImages.slice(0, 6);
    console.log(dummyGameArr);
  } else if (currentLevel === 3) {
    dummyGameArr = staffImages.slice(0, 12);
    console.log(dummyGameArr);
  }

  //* Adds 'matched' to each staff member
  allStaff.forEach((staffMember) => {
    staffMember.matched = false;
  });
  console.log(cards.map(card => card.matched));

  //* shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...dummyGameArr, ...dummyGameArr]
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
      if (choiceOne.src === choiceTwo.src) {
        console.log('cards match')
        setCards((prevCards) => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
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

  // const matchedCards = cards.every(card => card.matched === true);
  // console.log(matchedCards); //WORKING!
  //
  //
  // const success = () => {
  //   if (matchedCards === true) {
  //     console.log('Well done!'); // WORKING!
  //     // display <LevelResults/>
  //     // on button click go to next level (<Card/>) setCurrentLevel(2)
  //   }
  // }



  // // Checking if all cards are matched
  // const success = () => {
  //   if (cards.every(card => card.matched === true)) {
  //     console.log('Well done!'); // WORKING!
  //     // display <LevelResults/>
  //     // on button click go to next level (<Card/>) setCurrentLevel(2)
  //   }
  // }
  // success();


  useEffect(() => {
    console.log(cards);
    if (cards.length === 0) return;
    if (cards.every(card => card.matched === true)) {
      navigate("/level-results");
      console.log('Well done!'); // WORKING!
      // display <LevelResults/>
      // on button click go to next level (<Card/>) setCurrentLevel(2)
    }
  }, [cards]);


  // if (matchedCards === true) {
  //   console.log('Well done!'); // WORKING!
  //   // setCurrentLevel(2);
  //   // display <LevelResults/>
  //   // on button click go to next level (<Card/>) setCurrentLevel(2)
  // }


  return (
    <div className={styles.cardGrid}>
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

export default CardList;
