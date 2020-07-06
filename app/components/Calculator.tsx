import React from 'react';
import { Header } from './repeat';
import styles from './Calculator.css';

export default function Calculator() {
  return (
    <div>
      <Header />
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
