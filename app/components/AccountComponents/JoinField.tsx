/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './JoinField.css';
import routes from '../../constants/routes.json';
import { join } from '../../apis/accountApi';

const JoinField = () => {
  const history = useHistory();

  // @ts-ignore
  const handleSubmitClick = async event => {
    event.preventDefault();
    if (
      await join(
        event.target[0].value,
        event.target[1].value,
        event.target[2].value,
        event.target[3].value
      )
    ) {
      history.push(routes.HOME);
    } else {
      history.push(routes.JOIN);
    }
    return false;
  };

  return (
    <div id={styles.join_container}>
      <form onSubmit={handleSubmitClick}>
        <div className={styles.input_area}>
          <label className={styles.label_font}>
            *아이디
            <input type="text" name="id" id="id" className={styles.textfield} />
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
            />
          </label>
        </div>
        <input type="submit" value="회원가입" className={styles.btn_login} />
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
