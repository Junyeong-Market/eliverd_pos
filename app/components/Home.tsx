/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Header } from './repeat';
import { LoginField, JoinField } from './LoginComponents';

export default function Home() {
  return (
    <div>
      <Header nav={false} />
      <JoinField />
    </div>
  );
}
