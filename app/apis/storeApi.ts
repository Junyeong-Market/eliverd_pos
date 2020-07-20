/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import Alert from '../components/repeat/Alert';

// 세션 생성(로그인, POST)
const createStore = async (
  na: string,
  desc: string,
  regi_num: string,
  plat: number,
  plng: number
) => {
  const response = await axios.post(`http://donote.co:8000/store/`, {
    name: na,
    description: desc,
    registered_number: regi_num,
    lat: plat,
    lng: plng
  });

  const { data } = response;

  localStorage.setItem('store_name', data.name);
  console.log(data.name);
};

export default createStore;
