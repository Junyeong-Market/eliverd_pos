/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosResponse, AxiosError } from 'axios';
import Alert from '../components/repeat/Alert';

// 세션 생성(로그인, POST)
const loginCheck = async (id = '', pwd = '') => {
  try {
    const { session } = (
      await axios.post('http://donote.co:8000/account/session/', {
        user_id: id,
        password: pwd
      })
    ).data;

    localStorage.setItem('session', session);
    return true;
  } catch (error) {
    Alert(['확인'], '아이디 또는 비밀번호를 확인해주세요', '로그인 실패');
    return false;
  }
};

// 세션 삭제(로그아웃, DELETE)
const logout = async () => {
  axios.delete('http://donote.co:8000/account/session/', {
    headers: {
      Authorization: localStorage.getItem('session')
    }
  });
  localStorage.clear();
  console.log('로컬 스토리지 클리어');
};

// 세션 정보 조회(GET)
const checkUserInfo = async () => {
  const response = await axios.get(`http://donote.co:8000/account/session/`, {
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

// 권한있는 상점 조회
const checkUserStore = async () => {
  const param_page = 1;
  const param_pageSize = 20;
  const response = await axios.get(
    `http://donote.co:8000/account/user/${localStorage.getItem(
      'pid'
    )}/stores/?page=${param_page}&page_size=${param_pageSize}`,
    {
      headers: {
        Authorization: localStorage.getItem('session')
      }
    }
  );
  localStorage.setItem('select_stores', JSON.stringify(response.data.results));
  return response.data;
};

const checkJoinError = async (errdata: AxiosError) => {
  // @ts-ignore
  const { data } = errdata.response;
  let pMessage = '';

  if (data.user_id !== undefined) {
    // 유저 네임에 문제가 있다면
    if (data.user_id[0].indexOf('Ensure this') !== -1)
      pMessage += `아이디를 50문자 내로 입력해주세요\n`;
    if (data.user_id[0].indexOf('already exists') !== -1)
      pMessage += `중복된 아이디입니다. \n`;
  }

  if (data.nickname !== undefined) {
    // 유저 닉네임에 문제가 있다면
    if (data.nickname[0].indexOf('already exists') !== -1)
      pMessage += `중복된 닉네임입니다. \n`;
    if (data.nickname[0].indexOf('Ensure this') !== -1)
      pMessage += `닉네임을 50문자 내로 입력해주세요\n`;
  }

  if (data.realname !== undefined) {
    // 유저 실명이 문제가 있다면
    if (data.realname[0].indexOf('Ensure this') !== -1)
      pMessage += `실명를 128문자 내로 입력해주세요\n`;
  }

  if (data.password !== undefined) {
    // 유저 패스워드가 문제가 있다면
    if (data.password[0].indexOf('Ensure this') !== -1)
      pMessage += `패스워드를 256문자 내로 입력해주세요\n`;
  }
  Alert(['확인'], pMessage, '회원가입 실패!');
};

// 사용자 정보 생성(회원가입, POST)
const join = async (id = '', pwd = '', real = '', nick = '') => {
  if (id === '' || pwd === '' || nick === '') {
    Alert(['확인'], '* 칸을 모두 채워주세요', '에러!');
    return false;
  }

  try {
    const response = await axios.post('http://donote.co:8000/account/user/', {
      user_id: id,
      password: pwd,
      nickname: nick,
      realname: real,
      is_seller: true
    });

    await Alert(
      ['확인'],
      `환영합니다 ${nick}님. 로그인 해주세요.`,
      '회원가입 성공'
    );

    return true;
  } catch (error) {
    if (error.response.status === 400) {
      checkJoinError(error);
      return false;
    }
    Alert(['확인'], '알수없는 에러', '에러');
    return false;
  }
};

// 사람 이름가지고 조회하는 api
const searchUser = async (name = '') => {
  const param_page = 1;
  const param_pageSize = 20;
  if (name === '') return [{}];
  const response = await axios.get(
    `http://donote.co:8000/account/user/search/${name}/?page=${param_page}&page_size=${param_pageSize}&is_seller=True`
  );
  const { data } = response;

  if (data.count !== 0) {
    console.log(data.results);
  }
  return response.data.results;
};

export { loginCheck, logout, checkUserInfo, join, searchUser, checkUserStore };
