/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Header } from './repeat';
import routes from '../constants/routes.json';
import styles from './SelectStore.css';

// eslint-disable-next-line react/prop-types
export default function SelectStore() {
  const history = useHistory();
  const btnClickEvent = event => {
    event.preventDefault();
    const { value } = event.target;
    localStorage.setItem('store_name', value);
    localStorage.setItem('store_id', event.target.getAttribute('data-key'));
    history.push(routes.CALCULATOR);
  };
  return (
    <div>
      <Header nav={false} />
      <div id={styles.select_store_container}>
        <h1>
          여러 상점에 가입되어 있습니다. <br /> 상점을 선택하여 주세요.
        </h1>
        <div id={styles.btn_sort_area}>
          {JSON.parse(localStorage.getItem('select_stores')).map(data => (
            <input
              type="button"
              key={data.id}
              data-key={data.id}
              className={styles.btn_select_store}
              value={`${data.name}`}
              onClick={btnClickEvent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
