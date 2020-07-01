/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import imgE from '../../resources/inappIcon/Eliverd_200px.png';

export default function Home() {
  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.banner_text}>EliverdPOSSystem</div>
      </div>
      <div id={styles.login_container}>
        <img src={imgE} className={styles.Eliverd_logo} alt="imgE" />
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
          <div className={styles.chk_area}>
            <input type="checkbox" className={styles.chk_option} />
            자동로그인&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="checkbox" className={styles.chk_option} />
            아이디 저장
          </div>
          <input type="submit" value="로그인" className={styles.btn_login} />
        </form>
        <div>
          <Link to={routes.COUNTER} className={styles.join_font}>
            아직 회원이 아니십니까?
          </Link>
        </div>
      </div>
    </div>
  );
}
