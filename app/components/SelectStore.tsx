/* eslint-disable promise/catch-or-return */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './repeat';
import routes from '../constants/routes.json';

// eslint-disable-next-line react/prop-types
export default function SelectStore() {
  return (
    <div>
      <Header />
      <div>와 샌즈!</div>
      <Link to={routes.CALCULATOR}>와 샌즈222222</Link>
    </div>
  );
}
