/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

const SelectedArea = ({ name = '박씨', nickname = '씨박' }) => {
  return (
    <div>
      이름 : {name}
      닉네임 : {nickname}
    </div>
  );
};

export default SelectedArea;
