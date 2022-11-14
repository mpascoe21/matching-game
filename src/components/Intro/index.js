import React from "react";
import styles from './styles.module.scss';
import IntroStaffCard from "../IntroStaffCard";
import Tile from "../Tile";
import LevelError from "../LevelError";
import CountdownTimer from "../CountdownTimer";


const Intro = () => {

  const startGame = () => {

  }


  return (
    <div className={styles.background}>
      <div className={styles.copyContainer}>
        <h1>Speed Match</h1>
        <p>Can you match all the team pairs before the time runs out?</p>
        <p>Simply click two identical card in succession to create a match.<br/>The fastest player to complete all three levels wins a spin.</p>
        <h4>Welcome</h4>
        <a className={styles.button} onClick={() => startGame()}>LET'S PLAY</a>
      </div>
      <div className={styles.imgContainer}>
        < IntroStaffCard />
        < IntroStaffCard />
        < IntroStaffCard />
        < IntroStaffCard />
        < IntroStaffCard />
        < IntroStaffCard />
      </div>


    </div>


  );
}

export default Intro;
