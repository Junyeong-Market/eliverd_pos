/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import Alert from '../components/repeat/Alert';

// 세션 생성(로그인, POST)
const loginCheck = async (id = '', pwd = '') => {
  try {
    const { session } = await axios.post(
      'http://donote.co:8000/account/session/',
      {
        user_id: id,
        password: pwd
      }
    );
    console.log(session);
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

    Alert(['확인'], `환영합니다 ${nick}님. 로그인 해주세요.`, '회원가입 성공');

    return true;
  } catch (error) {
    if (error.response.status === 400) {
      const { data } = error.response;
      let pMessage = '';

      if (data.user_id[0] === 'user with this user id already exists.') {
        pMessage += `중복된 아이디입니다. \n`;
      }
      if (data.nickname[0] === 'user with this nickname already exists.') {
        pMessage += `중복된 닉네임입니다.`;
      }
      Alert(['확인'], pMessage, '중복되었습니다!');
      return false;
    }
    Alert(['확인'], '알수없는 에러', '에러');
    return false;
  }
};

export { loginCheck, logout, checkUserInfo, join };
