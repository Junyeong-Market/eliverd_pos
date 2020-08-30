/* eslint-disable promise/catch-or-return */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from './repeat';
import { SearchRegisterer, InfoStore } from './AccountComponents';
import styles from './CreateStore.css';
import { createStore } from '../apis/storeApi';
import routes from '../constants/routes.json';
import Alert from './repeat/Alert';

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
  const history = useHistory();
  const [selectedPIDs, setSelectedPIDs] = useAsyncState([]);

  const loadDataFromSearchRegisterer = async data => {
    await setSelectedPIDs(data);
  };

  const loadDataFromInfoStore = async data => {
    // pid가 아예 존재하지 않을 경우 Alert
    if (_.isEmpty(selectedPIDs)) {
      Alert(['확인'], '직원이 아무도 선택되지 않았습니다.', '알겠습니까?');
    } else {
      // pid가 현재 로그인 중인 pid와 일치하는 게 없을 때 Alert
      const currentPid = localStorage.getItem('pid');
      let isJoinedSelf = false;
      await selectedPIDs.map(id => {
        if (id.toString() === currentPid) {
          isJoinedSelf = true;
        }
      });
      if (!isJoinedSelf) {
        Alert(['확인'], '자기 자신을 포함시켜 주세요', '알겠습니까?');
      } else {
        await createStore(selectedPIDs, data);
        history.push(routes.CALCULATOR);
      }
    }
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
