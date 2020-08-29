/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
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
import _apikey from '../../constants/apikey.json';
import Alert from './Alert';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const apikey = _apikey.GOOGLE;

let map: google.maps.Map;
let clicked_markers: google.maps.Marker[] = [];
// @ts-ignore
window.initMap = () => {
  map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center: { lat: 37.5516957, lng: 126.99251 },
    zoom: 14,
    disableDefaultUI: true
  });
};

const MapContent = () => {
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

      map.addListener('click', function(e: google.maps.MapsEventListener) {
        placeMarkerAndPanTo(e.latLng, map);
      });

      const geocoder = new google.maps.Geocoder();

      const openCheckWindow = (_marker: google.maps.Marker) => {
        geocoder.geocode(
          { location: _marker.getPosition() },
          async (
            results: google.maps.GeocoderResult[],
            status: google.maps.GeocoderStatus
          ) => {
            if (status === 'OK') {
              if (results[0]) {
                const resp = await Alert(
                  ['확인', '취소'],
                  `${results[0].formatted_address}
가 맞습니까?`,
                  '장소 확인'
                );
                if (resp === 0)
                  ipcRenderer.send(
                    'sendPositionData',
                    _marker.getPosition().lat(),
                    _marker.getPosition().lng(),
                    results[0].formatted_address
                  );
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
          }
        );
      };

      function placeMarkerAndPanTo(
        latLng: google.maps.LatLng,
        map: google.maps.Map
      ) {
        // Clear out the old markers.
        clicked_markers.forEach(marker => {
          marker.setMap(null);
        });
        clicked_markers = [];
        const clicked_marker = new google.maps.Marker({
          position: latLng,
          map
        });
        clicked_markers.push(clicked_marker);
        clicked_marker.addListener('click', function(e) {
          openCheckWindow(clicked_marker);
        });
        map.panTo(latLng);
      }
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
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
            openCheckWindow(marker);
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
      <div id="map" className={styles.mapStyle} />
      <input
        id="pac-input"
        type="text"
        placeholder="검색 창"
        className={styles.searchWindow}
      />
    </div>
  );
};

export default MapContent;
