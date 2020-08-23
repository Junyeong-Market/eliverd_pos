/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Header } from './repeat';
import { SearchRegisterer, InfoStore } from './AccountComponents';
import styles from './SelectStore.css';

// eslint-disable-next-line react/prop-types
export default function SelectStore() {
  return (
    <div>
      <Header store_name="소속중인 상점을 만들어 주세요" />
      <div id={styles.select_store_container}>
        <InfoStore />
        <SearchRegisterer />
      </div>
    </div>
  );
}
