import React from 'react';
import styles from './styles.module.scss';

const IntroStaffCard = ({staffMember}) => {

  return <div className={styles.staff}>
    <img src={staffMember.image.desktop ? staffMember.image.desktop : staffMember.image.mobile} className={styles.staffImg} alt={'Staff member'}/>
    <div className={styles.staffDetails}>
      <h4 data-testid='title'>{staffMember.title}</h4>
      <p data-testid='position'>{staffMember.position}</p>
    </div>
  </div>;
}

export default IntroStaffCard;
