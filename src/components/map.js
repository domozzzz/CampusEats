

import React, {useEffect, useState, useRef, useCallback} from 'react';
import homepage from '../images/homepage.png'

import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  MapCameraChangedEvent,
  Pin
} from '@vis.gl/react-google-maps';

const MAP_API_KEY = 'Not yet set'

const locations = [
  {key: 'operaHouse', location: { lat: -33.8567844, lng: 151.213108  }},
  {key: 'tarongaZoo', location: { lat: -33.8472767, lng: 151.2188164 }},
  {key: 'manlyBeach', location: { lat: -33.8209738, lng: 151.2563253 }},
  {key: 'hyderPark',  location: { lat: -33.8690081, lng: 151.2052393 }},
  {key: 'theRocks',   location: { lat: -33.8587568, lng: 151.2058246 }},
  {key: 'circularQuay', location: { lat: -33.858761, lng: 151.2055688 }},
  {key: 'harbourBridge', location: { lat: -33.852228, lng: 151.2038374 }},
  {key: 'kingsCross', location: { lat: -33.8737375, lng: 151.222569 }},
  {key: 'botanicGardens', location: { lat: -33.864167, lng: 151.216387 }},
  {key: 'museumOfSydney', location: { lat: -33.8636005, lng: 151.2092542 }},
  {key: 'maritimeMuseum', location: { lat: -33.869395, lng: 151.198648 }},
  {key: 'kingStreetWharf', location: { lat: -33.8665445, lng: 151.1989808 }},
  {key: 'aquarium', location: { lat: -33.869627, lng: 151.202146 }},
  {key: 'darlingHarbour', location: { lat: -33.87488, lng: 151.1987113 }},
  {key: 'barangaroo', location: { lat: - 33.8605523, lng: 151.1972205 }},
];

const MapDisplay = () => {
      let pos = {lat: -27.496082133387972, lng: 153.01187003175372}
      
      return (
        <div>
          <div class="welcome" alt="Avatar">
              <div class="heading-image">
                  <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
              </div>
          </div>
          <APIProvider apiKey={MAP_API_KEY}>
            <div style={{height: "600px"}}>
              <Map zoom={11} center={pos} mapId={'50b77c7700aaebef'}/>
              <AdvancedMarker position={{lat: pos.lat, lng: pos.lng}} onClick={() => {console.log("hello")}}>
                <Pin background={"blue"}/>
              </AdvancedMarker>
            </div>
          </APIProvider>
      </div>
      )
}

export default MapDisplay;
