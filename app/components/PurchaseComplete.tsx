/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from './repeat';
import logo from '../../resources/inappIcon/Eliverd_200px.png';
import styles from './AccountComponents/LoginField.css';
import routes from '../constants/routes.json';

// eslint-disable-next-line react/prop-types
export default function PurchaseComplete() {
  const history = useHistory();

  return (
    <div>
      <Header nav={false} />
      <div id={styles.login_container}>
        <img src={logo} className={styles.Eliverd_logo} alt="logo" />
        <br />
        <div style={{ fontSize: '32px', fontWeight: 'bold' }}> 결제 완료 </div>
        <button
          onClick={() => history.push(routes.CALCULATOR)}
          style={{
            width: '200px',
            height: '40px',
            fontSize: '20px',
            marginTop: '20px'
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
}
