/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import styles from './S_Area.css';

const SelectedArea = ({ userData = {}, customClickEvent }) => {
  const childClickEvent = () => {
    customClickEvent(userData);
  };
  if (Object.keys(userData).length !== 0) {
    return (
      <div className={styles.custom_button} onClick={childClickEvent}>
        이름 : {userData.realname}
        <br />
        닉네임 : {userData.nickname}
        <hr />
      </div>
    );
  }
  return <span> 선택한 직원 </span>;
};

export default SelectedArea;
