/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css';
import routes from '../../constants/routes.json';

// 헤더 컴포넌트
const Header = ({ nav = true, store_name = 'Eliverd_Pos', btnPage = '' }) => {
  if ('user_id' in localStorage) {
    console.log(localStorage.getItem('user_id'));
  } else {
    console.log('음슴');
  }
  // 내비게이션이 없다면
  if (!nav) {
    return (
      <div className={styles.header}>
        <span className={styles.header_text}>{store_name}</span>
        <span className={styles.name_space}>
          {'nickname' in localStorage
            ? `${localStorage.getItem('nickname')}님이 로그인 중입니다.`
            : ''}
        </span>
      </div>
    );
  }
  return (
    <div className={styles.header}>
      <span className={styles.header_text}>{store_name}</span>
      <div id={styles.link_area}>
        <Link
          to={routes.CALCULATOR}
          className={
            btnPage === '계산' ? styles.btn_link_pressed : styles.btn_link
          }
        >
          <div className={styles.btn_link_font}>계산</div>
        </Link>
        <Link
          to={routes.STOCKMANAGE}
          className={
            btnPage === '재고' ? styles.btn_link_pressed : styles.btn_link
          }
        >
          <div className={styles.btn_link_font}>재고</div>
        </Link>
        <Link
          to={routes.ORDER}
          className={
            btnPage === '주문' ? styles.btn_link_pressed : styles.btn_link
          }
        >
          <div className={styles.btn_link_font}>주문</div>
        </Link>
        <Link
          to={routes.SETTING}
          className={
            btnPage === '설정' ? styles.btn_link_pressed : styles.btn_link
          }
        >
          <div className={styles.btn_link_font}>설정</div>
        </Link>
      </div>
      <span className={styles.name_space}>
        {'nickname' in localStorage
          ? `${localStorage.getItem('nickname')}님이 로그인 중입니다.`
          : ''}
      </span>
    </div>
  );
};

export default Header;
