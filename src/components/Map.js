

import React, {useEffect, useState} from 'react';
import homepage from '../images/Homepage.png'
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Link } from 'react-router-dom';
import "../css/Map.css"
import "../css/App.css"
import supabase from '../supabase';
import { useAuth } from './AuthProvider';
import { Navigate } from 'react-router-dom';

const MAP_API_KEY = process.env.REACT_APP_MAP

/**
 * Map compoent to display in APP
 * @returns map component (also considered location-select page)
 */
const MapDisplay = () => {
      // Load google API key script
      const { isLoaded } = useLoadScript({
        googleMapsApiKey: MAP_API_KEY,
      });
      //Location options
      const [locations, setLocations] = useState([])
      //Current search value
      const [search, setSearch] = useState([])
      //Is the map currently displayed
      const [display, setDisplay] = useState(null)

      /**
       * Scroll to top of page and retrieve all locations when page is loaded
       */
      useEffect(() => {
        window.scrollTo(0, 0)
        async function getLocations() {
          const {data, error} = await supabase
          .from('Locations')
          .select('*')

          if (data) {
            setLocations(data)
          }

          if (error) {
            console.log(error)
          }
        }
        getLocations()
      },[])
      
      /**
       * Filter locations based on the current search
       * @param {*} e target input where search value is stored
       */
      const get_search = (e) => {
        setSearch(locations.filter((location) => location.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())))
        setDisplay(null)
      }
      /**
       * Sets the location to display on map
       * @param {*} e location name to display
       */
      const set_display = (e) => {
        const displayLocation = locations.find((location) => location.id == e.target.name)
        setDisplay(displayLocation)
        setSearch([])
      }
      
      const { user } = useAuth()
      
      // Only display if user is authenticated
      return user ? (
        <div>
          <div class="welcome" alt="Avatar">
              <div class="heading-image">
                  <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
              </div>
          </div>
          <div className='map'>
            <h1>Step 1: Select your location</h1>
            <div className='search-box'>
                  <input type="search"  placeholder="Search for a location..." onChange={get_search} />
                  {search.map((location) => {
                    return (
                    <div key={location.id} className='possible_location'> 
                        <button className={display ? 'inactive' : ''} name={location.id} onClick={set_display}>{location.name}</button>
                    </div>)
                  })}
            </div>
            {/* Display heading if map is loading or no location has been selected */}
          {!isLoaded || !display? (
            <h2>search a location...</h2>
          ) : (
            <div>
            <GoogleMap
              mapContainerClassName='map-style'
              // position the map at the locations cordinates
              center={{lat: display.lat, lng: display.lng}}
              zoom={15}>
            </GoogleMap>
            {/* Location id becomes param in next url */}
            <Link to={`../order/${display.id}`}>
            <button className='submit_location'>Select {display.name}</button>
            </Link>
            </div>
          )}
        </div>          
      </div>
      ) : <Navigate to='/login'/>
}

export default MapDisplay;
