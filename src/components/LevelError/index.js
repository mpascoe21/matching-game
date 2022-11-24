import React from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.scss';
// import background from '../../../public/images/failed.jpg'

const LevelError = ({setCurrentPage}) => {



  setCurrentPage('errorPage');

  return (
    <div className={styles.bgContainer}>
      <div className={styles.copyContainer}>
        <h1>Level failed!</h1>
        <h4>Better luck next time.</h4>
        <Link to='/card-list' className={styles.button}><span>TRY AGAIN</span></Link>
      </div>
    </div>
  );
}

export default LevelError;
