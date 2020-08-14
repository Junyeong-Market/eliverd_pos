/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import styles from './S_Area.css';

const SearchedArea = ({ realname = '', nickname = '', customClickEvent }) => {
  const childClickEvent = () => {
    customClickEvent(realname, nickname);
  };
  if (realname !== '' && nickname !== '') {
    return (
      <div className={styles.custom_button} onClick={childClickEvent}>
        이름 : {realname}
        <br />
        닉네임 : {nickname}
        <hr />
      </div>
    );
  }
  return <span> 검색 결과 </span>;
};

export default SearchedArea;
