/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, CalcStock } from './repeat';
import styles from './Calculator.css';
import dummyImage from '../../resources/inappIcon/Eliverd_200px.png';
import routes from '../constants/routes.json';
import { referStoreStocks } from '../apis/storeApi';
import { createOrder } from '../apis/productApi';

let iframe: HTMLIFrameElement | null;

export default function Calculator() {
  const history = useHistory();
  const [state, setState] = useState({
    stocks: [{}],
    selectedStocks: [{}],
    finalPrice: 0,
    isProcess: false,
    url: ''
  });

  const onLoadFunction = () => {
    console.log('abc');
    console.log(iframe?.contentWindow?.location.href);
    // TODO- 주문정보 조회를 통해 status 확인 후 fail, success 구별하여 처리
  };

  const clickStock = data => {
    let temp = state.selectedStocks;
    if (_.isEmpty(temp[0])) {
      temp = [data];
      setState(prevState => ({
        ...prevState,
        finalPrice: state.finalPrice + data.price,
        selectedStocks: temp
      }));
    } else if (temp.findIndex(i => i.id === data.id) === -1) {
      temp.push(data);
      setState(prevState => ({
        ...prevState,
        finalPrice: state.finalPrice + data.price,
        selectedStocks: temp
      }));
    }
  };

  const calcFinalPrice = (value: number, _amount: number, _id: number) => {
    const temp = state.selectedStocks;
    temp.map((val, index) => {
      if (val.id === _id) {
        temp[index].wantedAmount = _amount;
      }
    });
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

  const resetState = () => {
    setState(prevState => ({
      ...prevState,
      selectedStocks: [{}],
      finalPrice: 0
    }));
  };

  const purchaseProcess = async () => {
    let packData = [];
    state.selectedStocks.map(value => {
      packData.push({
        id: value.id,
        amount: value.wantedAmount !== undefined ? value.wantedAmount : 1
      });
    });
    const data = await createOrder(packData);
    setState(prevState => ({
      ...prevState,
      isProcess: true,
      url: data.next_redirect_pc_url
    }));
    console.log(data.next_redirect_pc_url);
    // history.push(routes.PURCHASECOMPLETE);
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
    didMount();
  }, []);

  return (
    <div>
      <Header
        store_name={localStorage.getItem('store_name') as string}
        btnPage="계산"
      />
      <div
        id={styles.ItemList_Box}
        style={
          state.isProcess ? { overflowY: 'hidden' } : { overflowY: 'scroll' }
        }
      >
        {state.isProcess ? (
          <iframe
            src={state.url}
            id={styles.PurchaseIFrame}
            onLoad={onLoadFunction}
            ref={ref => {
              iframe = ref;
            }}
          />
        ) : (
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
        )}
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
          type="button"
          value="취소"
          className={`${styles.btn_reset} ${styles.btn_font} `}
          onClick={resetState}
        />
        <input
          type="button"
          value="확인"
          className={`${styles.btn_submit} ${styles.btn_font}`}
          onClick={purchaseProcess}
        />
      </div>
    </div>
  );
}
