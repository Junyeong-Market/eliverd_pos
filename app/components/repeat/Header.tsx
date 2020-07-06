/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css';
import routes from '../../constants/routes.json';
// 엘리버드 로고 가져오기
import imgSetting from '../../../resources/inappIcon/settings@2x.png';

// 헤더 컴포넌트
const Header = ({ nav = true, store_name = 'Eliverd_Pos' }) => {
  // 내비게이션이 없다면
  if (!nav) {
    return (
      <div className={styles.header}>
        <span className={styles.header_text}>{store_name}</span>
      </div>
    );
  }
  return (
    <div className={styles.header}>
      <span className={styles.header_text}>{store_name}</span>
      <div id={styles.link_area}>
        <Link to={routes.HOME} className={styles.btn_link}>
          <div className={styles.btn_link_font}>계산</div>
        </Link>
        <Link to={routes.COUNTER} className={styles.btn_link}>
          <div className={styles.btn_link_font}>재고</div>
        </Link>
        <Link to={routes.NEW} className={styles.btn_link}>
          <div className={styles.btn_link_font}>상점</div>
        </Link>
        <div className={styles.btn_link}>
          <div className={styles.btn_link_font}>매출</div>
        </div>
      </div>
      <img src={imgSetting} className={styles.btn_Setting} alt="Setting" />
    </div>
  );
};

export default Header;
