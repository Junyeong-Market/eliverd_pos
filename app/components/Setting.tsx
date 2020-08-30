/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from './repeat';
import styles from './SelectStore.css';
import routes from '../constants/routes.json';
import { logout } from '../apis/accountApi';

// eslint-disable-next-line react/prop-types
export default function Setting() {
  const history = useHistory();

  const logoutFunc = async () => {
    await logout();
    // Home화면 가기.
    history.push(routes.HOME);
  };

  return (
    <div>
      <Header btnPage="설정" />
      <div id={styles.select_store_container}>
        <h2>설정은 현재 구현중입니다.</h2>
        <button
          style={{
            width: '280px',
            height: '100px',
            marginTop: '114px',
            fontSize: '28px',
            fontWeight: '1000'
          }}
          onClick={logoutFunc}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
