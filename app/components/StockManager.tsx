/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Header } from './repeat';
import styles from './Calculator.css';
import logo from '../../resources/inappIcon/Eliverd_200px.png';
import { referStoreStocks } from '../apis/storeApi';

// eslint-disable-next-line react/prop-types
export default function StockManager() {
  const [state, setState] = useState({
    stocks: [{}]
  });

  useEffect(() => {
    const page = 1;
    const didMount = async () => {
      const response = await referStoreStocks(page);
      setState(prevState => ({
        ...prevState,
        stocks: response
      }));
    };
    didMount();
  }, []);

  return (
    <div>
      <Header
        store_name={localStorage.getItem('store_name') as string}
        btnPage="재고"
      />
      <div id={styles.ItemList_Box}>
        <div>
          {Object.keys(state.stocks[0]).length !== 0
            ? state.stocks.map(value => (
                <div key={value.id} className={styles.stock}>
                  <img src={logo} className={styles.stock_img} />
                  <br />
                  <span>{value.product.name}</span>
                </div>
              ))
            : ``}
        </div>
      </div>
      <div id={styles.AddedItemList_Box}>아마도 뭐가 들어갈까요?</div>
      <div id={styles.Btn_Box}>
        <input
          type="button"
          value="취소"
          className={`${styles.btn_reset} ${styles.btn_font} `}
        />
        <input
          type="button"
          value="확인"
          className={`${styles.btn_submit} ${styles.btn_font}`}
        />
      </div>
    </div>
  );
}
