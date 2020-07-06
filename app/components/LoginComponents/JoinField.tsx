/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './JoinField.css';
import routes from '../../constants/routes.json';

const JoinField = () => {
  return (
    <div id={styles.join_container}>
      <form>
        <div className={styles.input_area}>
          <label className={styles.label_font}>
            아이디
            <input type="text" name="id" className={styles.textfield} />
          </label>
        </div>
        <div className={styles.input_area}>
          <label className={styles.label_font}>
            패스워드
            <input type="password" name="pwd" className={styles.textfield} />
          </label>
        </div>
        <div className={styles.input_area}>
          <label className={styles.label_font}>
            실명
            <input type="text" name="realname" className={styles.textfield} />
          </label>
        </div>
        <div className={styles.input_area}>
          <label className={styles.label_font}>
            닉네임
            <input type="text" name="nickname" className={styles.textfield} />
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
