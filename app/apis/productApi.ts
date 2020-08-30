/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import Alert from '../components/repeat/Alert';

// 상점 주문 생성
const createOrder = async purchaseStocks => {
  const response = await axios.post(
    `http://donote.co:8000/purchase/`,
    {
      orders: [
        { store: localStorage.getItem('store_id'), stocks: purchaseStocks }
      ],
      deliver_to: { lat: 0, lng: 0 }
    },
    {
      headers: {
        Authorization: localStorage.getItem('session')
      }
    }
  );
  console.log(response);
  return response.data;
};

export { createOrder };
