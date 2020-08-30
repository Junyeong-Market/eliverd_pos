import React, { useState } from 'react';
import styles from './CalcStock.css';

const CalcStock = ({ data }) => {
  const [count, setCount] = useState(1);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
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
      <span className={styles.stock_price}>{data.price}원</span>
    </div>
  );
};

export default CalcStock;
