/* eslint-disable promise/catch-or-return */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Header } from './repeat';
import { SearchRegisterer, InfoStore } from './AccountComponents';
import styles from './CreateStore.css';
import createStore from '../apis/storeApi';

function useAsyncState(initialValue) {
  const [value, setValue] = useState(initialValue);
  const setter = x =>
    new Promise(resolve => {
      setValue(x);
      resolve(x);
    });
  return [value, setter];
}

// eslint-disable-next-line react/prop-types
export default function CreateStore() {
  const [selectedPIDs, setSelectedPIDs] = useAsyncState([]);

  const loadDataFromSearchRegisterer = async data => {
    await setSelectedPIDs(data);
  };

  const loadDataFromInfoStore = data => {
    createStore(selectedPIDs, data);
  };

  return (
    <div>
      <Header nav={false} />
      <div id={styles.create_store_container}>
        <InfoStore parentFunc={loadDataFromInfoStore} />
        <SearchRegisterer parentFunc={loadDataFromSearchRegisterer} />
      </div>
    </div>
  );
}
