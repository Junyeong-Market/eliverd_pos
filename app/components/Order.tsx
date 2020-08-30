/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Header, OrderElement } from './repeat';
import styles from './SelectStore.css';
import { referStoreOrders } from '../apis/storeApi';

// eslint-disable-next-line react/prop-types
export default function Order() {
  useEffect(() => {
    const didmount = async () => {
      await referStoreOrders();
    };

    didmount();
  });
  return (
    <div>
      <Header btnPage="주문" />
      <div
        id={styles.select_store_container}
        style={{ overflowY: 'scroll', resize: 'none' }}
      >
        <OrderElement data={'뭐'} />
        <OrderElement data={'뭐'} />
        <OrderElement data={'뭐'} />
        <OrderElement data={'뭐'} />
        <OrderElement data={'뭐'} />
        <OrderElement data={'뭐'} />
        <OrderElement data={'뭐'} />
        <OrderElement data={'뭐'} />
        <OrderElement data={'뭐'} />
        <OrderElement data={'뭐'} />
        <OrderElement data={'뭐'} />
        <OrderElement data={'뭐'} />
        <OrderElement data={'뭐'} />
        <OrderElement data={'뭐'} />
        <OrderElement data={'뭐'} />
      </div>
    </div>
  );
}
