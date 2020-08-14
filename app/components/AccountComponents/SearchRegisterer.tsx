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
import { NavLink } from 'react-router-dom';

const SearchRegisterer = () => {
  const [state, setState] = useState({
    searchedBoards: [{}],
    selectedBoards: [{}]
  });

  const { searchedBoards, selectedBoards } = state;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const resp = await searchUser(value);
    setState(prevState => ({
      ...prevState,
      searchedBoards: resp
    }));
  };

  const addSelectedRegister = (_realname: string, _nickname: string) => {
    let temp = state.selectedBoards;
    const object = { realname: _realname, nickname: _nickname };
    if (_.isEmpty(temp[0])) {
      temp = [object];
    } else if (temp.findIndex(i => i.nickname === _nickname) === -1)
      temp.push(object);
    setState(prevState => ({
      ...prevState,
      selectedBoards: temp
    }));
  };

  const removeSelectedRegister = (_realname: string, _nickname: string) => {
    let temp = state.selectedBoards;
    const object = { realname: _realname, nickname: _nickname };
    temp.splice(
      temp.findIndex(i => i.nickname === _nickname),
      1
    );
    if (temp.length === 0) temp = [{}];
    setState(prevState => ({
      ...prevState,
      selectedBoards: temp
    }));
  };

  return (
    <div id={styles.login_container}>
      이름으로 직원 찾기
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
              realname={row.realname}
              nickname={row.nickname}
              customClickEvent={addSelectedRegister}
            />
          ))}
        </div>
        <div className={styles.selected_register}>
          {selectedBoards.map((row, index) => (
            <SelectedArea
              key={index}
              realname={row.realname}
              nickname={row.nickname}
              customClickEvent={removeSelectedRegister}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchRegisterer;
