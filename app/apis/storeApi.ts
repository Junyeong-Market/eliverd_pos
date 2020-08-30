/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';

// 세션 생성(로그인, POST)
const createStore = async (regis: [], info) => {
  const response = await axios.post(
    `http://donote.co:8000/store/`,
    {
      registerer: regis,
      name: info.name,
      description: info.desc,
      registered_number: info.reginum,
      lat: info.lat,
      lng: info.lng
    },
    {
      headers: {
        Authorization: localStorage.getItem('session')
      }
    }
  );

  const { data } = response;

  localStorage.setItem('store_name', data.name);
  localStorage.setItem('store_id', data.id);
  return data;
};

// 상점 정보 조회
const referStoreInfo = async storeId => {
  const response = await axios.get(`http://donote.co:8000/store/${storeId}/`, {
    headers: {
      Authorization: localStorage.getItem('session')
    }
  });
  console.log(response);
};

// 상점 재고 목록 조회
const referStoreStocks = async (page: number) => {
  const response = await axios.get(
    `http://donote.co:8000/store/${1}/stocks/?page=${page}`,
    {
      headers: {
        Authorization: localStorage.getItem('session')
      }
    }
  );
  if (response.data.count === 0) return [{}];
  const { results } = await response.data;
  return results;
};

// 상점 재고 목록 조회 쿼리와 함께
const referStoreStocksWithQuery = async (
  category: string,
  sName: string,
  orderBy: string,
  page: number
) => {
  const response = await axios.get(
    `http://donote.co:8000/store/${localStorage.getItem(
      'store_id'
    )}/stocks/?page=${page}&category=${category}&name=${sName}&order_by=${orderBy}`,
    {
      headers: {
        Authorization: localStorage.getItem('session')
      }
    }
  );
  console.log(response);
};

// 상점 재고 수정
const changeStoreStocks = async (
  storeId: string,
  sIan: string,
  sPrice: number,
  sAmount: number
) => {
  const response = await axios.post(
    `http://donote.co:8000/store/${storeId}/stocks/`,
    {
      ian: sIan,
      price: sPrice,
      amount: sAmount
    },
    {
      headers: {
        Authorization: localStorage.getItem('session')
      }
    }
  );
  console.log(response);
};

// 상점 별 주문 내역 조회
const referStoreOrders = async () => {
  const page = 1;
  const response = await axios.get(
    `http://donote.co:8000/store/${1}/orders/?page=${page}`
  );
  console.log(response);
  return response.data;
};

export {
  createStore,
  referStoreInfo,
  referStoreStocks,
  referStoreStocksWithQuery,
  changeStoreStocks,
  referStoreOrders
};
