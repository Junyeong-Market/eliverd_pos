/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/jsx-key */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styles from './SearchRegisterer.css';
import { searchUser } from '../../apis/accountApi';

const SearchRegisterer = () => {
  const [state, setState] = useState({
    name: ''
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
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
      <div>
        <div className={styles.selected_register}>머리아파</div>
        <div className={styles.search_results}>재고관리</div>
      </div>
    </div>
  );
};

export default SearchRegisterer;
