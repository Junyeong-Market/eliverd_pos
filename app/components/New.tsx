import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './New.css';

type Props = {
  printtrash: () => void;
  counter: number;
};

export default function New(props: Props) {
  const { printtrash, counter } = props;
  return (
    <div className={styles.container} data-tid="container">
      <h2>New</h2>
      <Link to={routes.HOME}>to Home</Link>
      <div>
        {counter}
        <button onClick={printtrash} type="button">
          어째서인거야?
        </button>
      </div>
    </div>
  );
}
