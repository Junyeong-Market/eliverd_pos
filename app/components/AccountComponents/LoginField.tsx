/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable import/named */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './LoginField.css';
import routes from '../../constants/routes.json';
// @ts-ignore
import imgE from '../../../resources/inappIcon/Eliverd_200px.png';
import {
  loginCheck,
  checkUserInfo,
  checkUserStore
} from '../../apis/accountApi';

const LoginField = () => {
  const history = useHistory();
  const [state, setState] = useState({
    id: '',
    password: ''
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
    if (await loginCheck(state.id, state.password)) {
      await checkUserInfo();
      const { count, results } = await checkUserStore();
      history.push(routes.SELECTSTORE);
      // if (count === 0) {
      //   history.push(routes.CKS);
      // } else {

      // }
    } else {
      history.push(routes.HOME);
    }
  };

  return (
    <div id={styles.login_container}>
      <img src={imgE} className={styles.Eliverd_logo} alt="imgE" />
      <form>
        <div className={styles.input_area}>
          <label className={styles.label_font}>
            아이디
            <input
              type="text"
              name="id"
              id="id"
              className={styles.textfield}
              value={state.id}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.input_area}>
          <label className={styles.label_font}>
            패스워드
            <input
              type="password"
              name="password"
              id="password"
              className={styles.textfield}
              value={state.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.chk_area}>
          <input type="checkbox" className={styles.chk_option} />
          자동로그인&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="checkbox" className={styles.chk_option} />
          아이디 저장
        </div>
        <input
          type="submit"
          value="로그인"
          className={styles.btn_login}
          onClick={handleSubmitClick}
        />
      </form>
      <div>
        <Link to={routes.JOIN} className={styles.join_font}>
          아직 회원이 아니십니까?
        </Link>
      </div>
    </div>
  );
};

export default LoginField;
