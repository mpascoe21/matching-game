import React from 'react';
import styles from './styles.module.scss';

const IntroStaffCard = () => {
    return (
      <div className={styles.staff}>
          <img src='/images/avatar.png' className={styles.staffImg} alt={'Staff member'}/>
          <div className={styles.staffDetails}>
              <h4>Name</h4>
              <p>Job title</p>
          </div>
      </div>
    );
}

export default IntroStaffCard;
