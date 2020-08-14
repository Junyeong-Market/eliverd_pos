/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/camelcase */
/*global kakao*/
import React, { useEffect } from 'react';

const appKey = 'c2b403218f79d9a10b7612644566b4a4';

const MapContent = () => {
  const mapStyle = {
    width: '100%',
    height: '90vh'
  };
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 7
        };

        const map = new window.kakao.maps.Map(container, options);
      });
    };
  });
  return <div id="map" style={mapStyle} />;
};

export default MapContent;
