import React, { useState } from 'react';
import styles from './OrderElement.css';

const OrderElement = ({ data }) => {
  return (
    <div
      style={{
        width: '760px',
        height: '50px',
        margin: '0px 18px',
        marginTop: '18px',
        border: '1px solid #dadce0',
        borderRadius: '5px',
        textAlign: 'left'
      }}
    >
      <div>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>주문</div>
        {data.stocks.map(val => (
          <span>
            {' '}
            {val.stock.product.name}X{val.amount} {'/'}
          </span>
        ))}
      </div>
    </div>
  );
};

export default OrderElement;
