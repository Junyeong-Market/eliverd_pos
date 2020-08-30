import React, { useState } from 'react';
import styles from './CalcStock.css';

const CalcStock = ({ data, calcPrice, deselectStock }) => {
  const [count, setCount] = useState(1);

  const increaseCount = () => {
    setCount(count + 1);
    // TODO-총 가격에 자신의 가격을 더한다.
    calcPrice(data.price as number);
  };

  const decreaseCount = () => {
    if (count !== 1) {
      // TODO- 총 가격에 자신의 가격을 제한다.
      calcPrice(-1 * (data.price as number));
      setCount(count - 1);
    } else {
      // TODO- 총 가격에 자신의 가격을 제한다.
      calcPrice(-1 * (data.price as number));
      // TODO-제거.
      deselectStock(data);
    }
  };

  return (
    <div className={styles.stock_wrapper}>
      <span className={styles.stock_name}>{data.product.name}</span>
      <span className={styles.order_counts}>
        <button
          className={styles.btn}
          data-tclass="btn"
          type="button"
          onClick={decreaseCount}
        >
          <i className="fa fa-minus" />
        </button>
        <span style={{ margin: '0px 4px' }}>{count}</span>
        <button
          className={styles.btn}
          data-tclass="btn"
          type="button"
          onClick={increaseCount}
        >
          <i className="fa fa-plus" />
        </button>
      </span>
      <span className={styles.stock_price}>{data.price * count}원</span>
    </div>
  );
};

export default CalcStock;
