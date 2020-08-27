/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/jsx-key */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import _ from 'lodash';
import styles from './SearchRegisterer.css';
import { SearchedArea, SelectedArea } from '../repeat';
import { searchUser } from '../../apis/accountApi';

const SearchRegisterer = ({ parentFunc }) => {
  const [state, setState] = useState({
    searchedBoards: [{}],
    selectedBoards: [{}]
  });

  const { searchedBoards, selectedBoards } = state;

  const sendDataToParent = data => {
    const pids = data.map(d => d.pid);
    parentFunc(pids);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const resp = await searchUser(value);
    setState(prevState => ({
      ...prevState,
      searchedBoards: resp
    }));
  };

  const addSelectedRegister = (userData: {}) => {
    let temp = state.selectedBoards;
    if (_.isEmpty(temp[0])) {
      temp = [userData];
    } else if (temp.findIndex(i => i.nickname === userData.nickname) === -1)
      temp.push(userData);
    setState(prevState => ({
      ...prevState,
      selectedBoards: temp
    }));
    sendDataToParent(temp);
  };

  const removeSelectedRegister = (userData: {}) => {
    let temp = state.selectedBoards;
    temp.splice(
      temp.findIndex(i => i.nickname === userData.nickname),
      1
    );
    if (temp.length === 0) temp = [{}];
    setState(prevState => ({
      ...prevState,
      selectedBoards: temp
    }));
    sendDataToParent(temp);
  };

  return (
    <div id={styles.login_container}>
      <div style={{ textAlign: 'left', marginLeft: '10px' }}>
        이름으로 직원 찾기
      </div>
      <form>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            className={styles.textfield}
            onChange={handleChange}
          />
        </div>
      </form>
      <div className={styles.search_register_area}>
        <div className={styles.search_results}>
          {searchedBoards.map((row, index) => (
            <SearchedArea
              key={index}
              userData={row}
              customClickEvent={addSelectedRegister}
            />
          ))}
        </div>
        <div className={styles.selected_register}>
          {selectedBoards.map((row, index) => (
            <SelectedArea
              key={index}
              userData={row}
              customClickEvent={removeSelectedRegister}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchRegisterer;
