import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home() {
  return (
    <div className={styles.container} data-tid="container">
      <h2>ELIVERD</h2>
      <div className={styles.box1}>결제방식</div>
      <div className={styles.box2}>
        <div className={styles.Selector}>
          <Link to={routes.COUNTER}>to Counter</Link>
        </div>
        <div className={styles.Selector}>
          <Link to={routes.NEW}>to New</Link>
        </div>
      </div>
    </div>
  );
}
