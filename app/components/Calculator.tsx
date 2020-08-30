/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Header, CalcStock } from './repeat';
import styles from './Calculator.css';
import dummyImage from '../../resources/inappIcon/Eliverd_200px.png';
import { referStoreStocks } from '../apis/storeApi';

export default function Calculator() {
  const [state, setState] = useState({
    stocks: [{}],
    selectedStocks: [{}],
    finalPrice: 0
  });

  const clickStock = data => {
    let temp = state.selectedStocks;
    if (_.isEmpty(temp[0])) {
      temp = [data];
      setState(prevState => ({
        ...prevState,
        finalPrice: state.finalPrice + data.price,
        selectedStocks: temp
      }));
    } else if (temp.findIndex(i => i.product.id === data.product.id) === -1) {
      temp.push(data);
      setState(prevState => ({
        ...prevState,
        finalPrice: state.finalPrice + data.price,
        selectedStocks: temp
      }));
    }
  };

  const calcFinalPrice = (value: number) => {
    setState(prevState => ({
      ...prevState,
      finalPrice: state.finalPrice + value
    }));
  };

  const destroySelStock = data => {
    let temp = state.selectedStocks;
    temp.splice(
      temp.findIndex(i => i.product.id === data.product.id),
      1
    );
    if (temp.length === 0) temp = [{}];
    setState(prevState => ({
      ...prevState,
      selectedStocks: temp
    }));
  };

  useEffect(() => {
    const page = 1;
    const didMount = async () => {
      const response = await referStoreStocks(page);
      setState(prevState => ({
        ...prevState,
        stocks: response
      }));
    };
    console.log('반자이?');
    didMount();
  }, []);

  return (
    <div>
      <Header
        store_name={localStorage.getItem('store_name') as string}
        btnPage="계산"
      />
      <form>
        <div id={styles.ItemList_Box}>
          <div>
            {Object.keys(state.stocks[0]).length !== 0
              ? state.stocks.map(value => (
                  <div
                    key={value.id}
                    className={styles.stock}
                    onClick={() => {
                      clickStock(value);
                    }}
                  >
                    <img src={dummyImage} className={styles.stock_img} />
                    <br />
                    <span>{value.product.name}</span>
                  </div>
                ))
              : ``}
          </div>
        </div>
        <div id={styles.AddedItemList_Box}>
          {Object.keys(state.selectedStocks[0]).length !== 0
            ? state.selectedStocks.map(value => (
                <CalcStock
                  key={value.product.id}
                  data={value}
                  calcPrice={calcFinalPrice}
                  deselectStock={destroySelStock}
                />
              ))
            : ``}
        </div>
        <div id={styles.ResultCost_Box}>{state.finalPrice}원</div>
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
