/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
// const { dialog } = require('electron').remote;

// const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
//   e.preventDefault();
//   const options = {
//     buttons: ['Yes'],
//     message: `환영합니다 님`,
//     title: '알림창'
//   };
//   dialog.showMessageBox(options);
// };

/* <input
        type="button"
        onClick={handleClick}
        value="아니 이게 바로 전설의 그 버튼이라구요"
      /> */

// 헤더 컴포넌트
const TestBtn = () => {
  return (
    <div>
      <Link to={routes.CALCULATOR}> 로그인 성공시 </Link>
    </div>
  );
};

export default TestBtn;
