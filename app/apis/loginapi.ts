/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';

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

exports.join = async () => {
  const { user_id, nickname } = await axios.post(
    'http://donote.co:8000/account/user',
    {
      user_id: 'string',
      password: 'string',
      nickname: 'string',
      realname: 'string',
      is_seller: true
    }
  );

  console.log(`유저 아이디: ${user_id} \n닉네임: ${nickname}`);
};
