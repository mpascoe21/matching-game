import React from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.scss';
import IntroStaffCard from "../IntroStaffCard";

const Intro = ({ staffImages }) => {

  console.log(staffImages);

  // onClick={shuffleCards} to go on button - it happens on the page load
  return (
    <div className={styles.background}>
      <div className={styles.copyContainer}>
        <h1>Speed Match</h1>
        <p>Can you match all the team pairs before the time runs out?</p>
        <p>Simply click two identical card in succession to create a match.<br/>The fastest player to complete all three levels wins a spin.</p>
        <h4>Welcome</h4>
        <Link to='/card-list' className={styles.button} >LET'S PLAY</Link>
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
