import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Calculator.css';
import routes from '../constants/routes.json';
import imgSetting from '../../resources/inappIcon/settings@3x.png';

export default function Calculator() {
  return (
    <div>
      <div className={styles.banner}>
        <span className={styles.banner_text}>EliverdPOSSystem</span>
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
      <form>
        <div id={styles.ItemList_Box}>
          안에 아이템 리스트를 불러올 함수가 작동
        </div>
        <div id={styles.AddedItemList_Box}> 안에 결제할 아이템을 넣어둠 </div>
        <div id={styles.ResultCost_Box}>총 200,000</div>
        <div id={styles.Btn_Box}>
          <input
            type="reset"
            value="취소"
            className={`${styles.btn_reset} ${styles.btn_font} `}
          />
          <input
            type="submit"
            value="확인"
            className={`${styles.btn_submit} ${styles.btn_font} `}
          />
        </div>
      </form>
    </div>
  );
}
