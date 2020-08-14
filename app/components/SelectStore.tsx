/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Header } from './repeat';
import { SearchRegisterer } from './AccountComponents';
import styles from './SelectStore.css';

const electron = window.require('electron');
const { ipcRenderer } = electron;

// eslint-disable-next-line react/prop-types
export default function SelectStore() {
  const [state, setState] = useState({
    id: '',
    password: '',
    realname: '',
    nickname: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmitClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(localStorage.getItem('session'));
  };

  const showSelectRegisterer = () => {
    ipcRenderer.send('select-registerer');
  };

  return (
    <div>
      <Header store_name="소속중인 상점을 만들어 주세요" />
      <div id={styles.select_store_container} onChange={handleChange}>
        <div id={styles.create_store_div}>
          <form>
            <div className={styles.label}>
              상점 이름
              <br />
              <input
                type="textarea"
                id="name"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.label}>
              상점 설명
              <br />
              <input type="textarea" id="desc" onChange={handleChange} />
            </div>
            <div className={styles.label}>
              사업자 등록번호(10자리의 숫자)
              <br />
              <input type="number" id="reginum" onChange={handleChange} />
            </div>
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
                type="number"
                id="lat"
                className={styles.location}
                defaultValue={0}
              />
            </label>
            <br />
            <label className={styles.location_label}>
              경도{' '}
              <input
                type="number"
                id="lng"
                className={styles.location}
                defaultValue={0}
              />
            </label>
            <br />
            <input
              type="submit"
              value="생성"
              className={styles.btn_create}
              onClick={handleSubmitClick}
            />
          </form>
        </div>
        <SearchRegisterer />
      </div>
    </div>
  );
}
