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
  const [orders, setOrders] = useState([{}]);

  useEffect(() => {
    const didmount = async () => {
      const response = await referStoreOrders();
      setOrders(response);
    };

    didmount();
  }, []);
  return (
    <div>
      <Header btnPage="주문" />
      <div
        id={styles.select_store_container}
        style={{ overflowY: 'scroll', resize: 'none' }}
      >
        {Object.keys(orders[0]).length !== 0
          ? orders.map(value => <OrderElement data={value} />)
          : '주문이 입력될 곳입니다.'}
      </div>
    </div>
  );
}
