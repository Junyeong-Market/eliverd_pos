/* eslint-disable no-loop-func */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/camelcase */
/* global kakao */

import React, { useEffect } from 'react';
import styles from './MapContent.css';

const apikey = 'AIzaSyD8nq6nsny7jn8dLS7qACJ-CiPsnYH1h0o';

let map: google.maps.Map;
// @ts-ignore
window.initMap = () => {
  map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center: { lat: 37.33, lng: 126.58 },
    zoom: 14
  });
};

const MapContent = () => {
  const mapStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden'
  };
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apikey}&callback=initMap&libraries=places&v=weekly`;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      const input = document.getElementById('pac-input') as HTMLInputElement;
      const searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
      });
      let markers: google.maps.Marker[] = [];

      const infowindow = new google.maps.InfoWindow({
        content: `contentString`
      });

      infowindow.openAdvanced = (
        _map: google.maps.Map,
        _marker: google.maps.Marker,
        _title: string,
        _position: google.maps.LatLng
      ) => {
        infowindow.setContent(
          `<div><div>타이틀 : ${_title}</div><div>포지션: ${_position.lat()}, ${_position.lng()}</div></div>`
        );
        infowindow.open(_map, _marker);
      };
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(marker => {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
          if (!place.geometry) {
            console.log('Returned place contains no geometry');
            return;
          }
          const icon = {
            url: place.icon as string,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          const marker = new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location
          });

          marker.addListener('click', () => {
            infowindow.openAdvanced(
              map,
              marker,
              place.name,
              place.geometry.location
            );
          });

          // Create a marker for each place.
          markers.push(marker);

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    };
  });
  return (
    <div className={styles.map_wrap}>
      <input
        id="pac-input"
        type="text"
        placeholder="Search Box"
        style={{
          zIndex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          margin: '50px 0 30px 10px'
        }}
      />
      <div id="map" style={mapStyle} />
    </div>
  );
};

export default MapContent;
