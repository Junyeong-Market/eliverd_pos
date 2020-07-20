/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './JoinField.css';
import routes from '../../constants/routes.json';
import { join } from '../../apis/accountApi';

const JoinField = () => {
  const history = useHistory();
  const [state, setState] = useState({
    id: '',
    password: '',
    realname: '',
    nickname: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmitClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (await join(state.id, state.password, state.realname, state.nickname)) {
      history.push(routes.HOME);
    } else {
      history.push(routes.JOIN);
    }
  };

  return (
    <div id={styles.join_container}>
      <form>
        <div className={styles.input_area}>
          <label className={styles.label_font}>
            *아이디
            <input
              type="text"
              name="id"
              id="id"
              className={styles.textfield}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.input_area}>
          <label className={styles.label_font}>
            *패스워드
            <input
              type="password"
              name="pwd"
              id="password"
              className={styles.textfield}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.input_area}>
          <label className={styles.label_font}>
            실명
            <input
              type="text"
              name="realname"
              id="realname"
              className={styles.textfield}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.input_area}>
          <label className={styles.label_font}>
            *닉네임
            <input
              type="text"
              name="nickname"
              id="nickname"
              className={styles.textfield}
              onChange={handleChange}
            />
          </label>
        </div>
        <input
          type="submit"
          value="회원가입"
          className={styles.btn_login}
          onClick={handleSubmitClick}
        />
      </form>
      <div>
        <Link to={routes.HOME} className={styles.join_font}>
          로그인으로
        </Link>
      </div>
    </div>
  );
};

export default JoinField;
