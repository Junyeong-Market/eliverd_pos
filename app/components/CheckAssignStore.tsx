/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Header } from './repeat';
import { DirectStore } from './AccountComponents';
import styles from './SelectStore.css';

// eslint-disable-next-line react/prop-types
export default function Home() {
  return (
    <div>
      <Header nav={false} />
      <div id={styles.select_store_container}>
        <DirectStore />
      </div>
    </div>
  );
}
