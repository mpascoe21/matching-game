import React from 'react';
import styles from './styles.module.scss';

const IntroStaffCard = ({staffMember}) => {
    return (
      <div className={styles.staff}>
          <img src={staffMember.image.desktop} className={styles.staffImg} alt={'Staff member'}/>
          <div className={styles.staffDetails}>
              <h4>{staffMember.title}</h4>
              <p>{staffMember.position}</p>
          </div>
      </div>
    );
}

export default IntroStaffCard;
