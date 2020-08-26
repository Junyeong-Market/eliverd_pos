/* eslint-disable promise/catch-or-return */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Header } from './repeat';
import { SearchRegisterer, InfoStore } from './AccountComponents';
import styles from './SelectStore.css';
import Alert from './repeat/Alert';
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
export default function SelectStore() {
  const [selectedBoards, setSelectedBoards] = useAsyncState([{}]);

  const loadDataFromSearchRegisterer = async data => {
    await setSelectedBoards(data);
  };

  const loadDataFromInfoStore = data => {
    Alert(
      ['확인'],
      `${data.name}
${data.desc}
${data.reginum}
${data.lat}
${data.lng}
${selectedBoards[0].realname} 외 ${selectedBoards.length - 1}명`,
      '확인'
    );
    // createStore(info.name, info.desc, info.reginum, info.lat, info.lng);
  };

  return (
    <div>
      <Header />
      <div id={styles.select_store_container}>
        <InfoStore parentFunc={loadDataFromInfoStore} />
        <SearchRegisterer parentFunc={loadDataFromSearchRegisterer} />
      </div>
    </div>
  );
}
