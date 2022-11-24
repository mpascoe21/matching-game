import React from "react";
import styles from './styles.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <p>Loading...</p>
      <div className={styles.loader}></div>
      {/*<img src="/images/icon-spinner-solid.svg" alt=""/>*/}
    </div>
  );
}

export default Loading;
