/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';

// 세션 생성(로그인, POST)
exports.loginCheck = async () => {
  const { session } = await axios.post(
    'http://donote.co:8000/account/session',
    {
      user_id: 'string',
      password: 'string'
    }
  );
  console.log(session);
  localStorage.setItem('session', session);
};

// 세션 삭제(로그아웃, DELETE)
exports.logout = async () => {
  axios.delete('http://donote.co:8000/account/session', {
    headers: {
      Authorization: localStorage.getItem('session')
    }
  });
  localStorage.clear();
  console.log('로컬 스토리지 클리어');
};

// 세션 정보 조회(GET)
exports.checkUserInfo = async () => {
  const response = await axios.get(`http://donote.co:8000/account/session`, {
    headers: {
      Authorization: localStorage.getItem('session')
    }
  });
  localStorage.setItem('pid', response.data.pid);
  localStorage.setItem('user_id', response.data.user_id);
  localStorage.setItem('nickname', response.data.nickname);
  localStorage.setItem('realname', response.data.realname);
  localStorage.setItem('is_seller', response.data.is_seller);
};

// 사용자 정보 생성(회원가입, POST)
exports.join = async () => {
  const response = await axios.post('http://donote.co:8000/account/user', {
    user_id: 'string',
    password: 'string',
    nickname: 'string',
    realname: 'string',
    is_seller: true
  });
  localStorage.setItem('pid', response.data.pid);
  localStorage.setItem('user_id', response.data.user_id);
  localStorage.setItem('nickname', response.data.nickname);
  localStorage.setItem('realname', response.data.realname);
  localStorage.setItem('is_seller', response.data.is_seller);
  console.log(localStorage.getItem('nickname'));
};
