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

  console.log(`${data.id} ${data.name}`);

  localStorage.setItem('store_name', data.name);
  console.log(data.name);
};

export default createStore;
