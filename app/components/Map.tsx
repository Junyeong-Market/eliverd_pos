/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Header, MapContent } from './repeat';

// eslint-disable-next-line react/prop-types
export default function Join() {
  return (
    <div>
      <Header nav={false} />
      <MapContent />
    </div>
  );
}
