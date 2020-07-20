/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Header } from './repeat';
import { JoinField } from './AccountComponents';

// eslint-disable-next-line react/prop-types
export default function Home() {
  return (
    <div>
      <Header nav={false} />
      <JoinField />
    </div>
  );
}
