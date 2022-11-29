import React, { useEffect, useRef, useState } from 'react';
import Cache from '../../service/Cache';
import IntroStaffCard from '../IntroStaffCard';

import styles from './styles.module.scss';

const Intro = ({ filteredStaff }) => {
  const [staffGridArr] = useState(() => {
    filteredStaff.sort(() => Math.random() - 0.5);

    return filteredStaff.slice(0, 6);
  });
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const cache = new Cache();

    // Reset cache
    cache.reset();
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.copyContainer}>
        <h1>Speed Match</h1>
        <p>Can you match all the team pairs before the time runs out?</p>
        <p>Simply click two identical card in succession to create a match.<br/>The fastest player to complete all three levels wins a spin.</p>
        <h4>Welcome</h4>
        <a href='/card-list' className={styles.button} >LET'S PLAY</a>
      </div>
      <div className={styles.imgContainer}>
        {staffGridArr.map(staffMember => (
          <IntroStaffCard key={staffMember.id} staffMember={staffMember}/>
        ))}
      </div>
    </div>
  );
}

export default Intro;
