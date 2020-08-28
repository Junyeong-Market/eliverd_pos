/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import styles from './DirectStore.css';

// eslint-disable-next-line react/prop-types
const DirectStore = () => {
  return (
    <div id="wrapper">
      <div id="introduce_place" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '36px', fontWeight: 'bold', margin: '30px' }}>
          현재 소속되어 있는 상점이 없습니다.
        </div>
        <div>종업원이라면 상점 관리자에게 소속을 부탁하세요.</div>
        <div>
          서비스를 새로 접하는 상점이라면 아래의 버튼을 클릭해 새로운 상점을
          만들어 주세요.
        </div>
        <Link to={routes.CREATESTORE}>
          <input
            type="button"
            value="바로가기"
            className={styles.btn_link_create}
          />
        </Link>
      </div>
    </div>
  );
};

export default DirectStore;
