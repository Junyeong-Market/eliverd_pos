/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './InfoStore.css';

const electron = window.require('electron');
const { ipcRenderer } = electron;
const replaceNotInt = /[^0-9]/gi;

// eslint-disable-next-line react/prop-types
// @ts-ignore
const InfoStore = ({ parentFunc }) => {
  // @ts-ignore
  const sendDataToParent = data => {
    parentFunc(data);
  };

  const numberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 0) {
      if (value.match(replaceNotInt)) {
        e.target.value = value.replace(replaceNotInt, '');
      }
    }
  };

  const showSelectRegisterer = () => {
    ipcRenderer.send('openGoogleMaps');
  };

  ipcRenderer.on('setLatLng', (event, arg1, arg2) => {
    (document.getElementById('lat') as HTMLInputElement).value = arg1;
    (document.getElementById('lng') as HTMLInputElement).value = arg2;
  });

  // @ts-ignore
  const submitStore = event => {
    event.preventDefault();
    const data = {
      name: event.target[0].value,
      desc: event.target[1].value,
      reginum: event.target[2].value,
      lat: event.target[4].value,
      lng: event.target[5].value
    };
    sendDataToParent(data);
    return false;
  };

  return (
    <div id={styles.create_store_div}>
      <form onSubmit={submitStore}>
        <div className={styles.label}>
          상점 이름
          <br />
          <input type="text" id="name" required />
        </div>
        <div className={styles.label}>
          상점 설명
          <br />
          <textarea id="desc" rows={5} style={{ width: '166px' }} />
        </div>
        <div className={styles.label}>
          사업자 등록번호(-를 뺀 10자리)
          <br />
          <input
            type="text"
            id="reginum"
            onChange={numberChange}
            maxLength={10}
          />
        </div>
        <br />
        <input
          type="button"
          value="위도 및 경도"
          className={styles.btn_fl}
          onClick={showSelectRegisterer}
        />
        <br />
        <label className={styles.location_label}>
          위도{' '}
          <input
            type="text"
            id="lat"
            className={styles.location}
            defaultValue={0}
            disabled
          />
        </label>
        <br />
        <label className={styles.location_label}>
          경도{' '}
          <input
            type="text"
            id="lng"
            className={styles.location}
            defaultValue={0}
            disabled
          />
        </label>
        <br />
        <input type="submit" value="생성" className={styles.btn_create} />
      </form>
    </div>
  );
};

export default InfoStore;
