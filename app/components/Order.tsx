/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Header } from './repeat';
import styles from './SelectStore.css';

// eslint-disable-next-line react/prop-types
export default function Order() {
  return (
    <div>
      <Header btnPage="주문" />
      <div id={styles.select_store_container}>
        <div>여기에 그거 들어갈거임</div>
      </div>
    </div>
  );
}
