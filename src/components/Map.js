

import React, {useEffect, useState, useRef, useCallback,useMemo} from 'react';
import homepage from '../images/Homepage.png'
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Link } from 'react-router-dom';
import "../css/Map.css"
import "../css/App.css"
import supabase from '../supabase';
import { useAuth } from './AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

const MAP_API_KEY = process.env.REACT_APP_MAP


const MapDisplay = () => {

      const { isLoaded } = useLoadScript({
        googleMapsApiKey: MAP_API_KEY,
      });
      const [locations, setLocations] = useState([])
      const [search, setSearch] = useState([])
      const [display, setDisplay] = useState(null)

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
      
      const get_search = (e) => {
        setSearch(locations.filter((location) => location.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())))
        setDisplay(null)
      }

      const set_display = (e) => {
        const displayLocation = locations.find((location) => location.id == e.target.name)
        setDisplay(displayLocation)
        setSearch([])
      }
      
      const { user } = useAuth()

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
          {!isLoaded || !display? (
            <h1></h1>
          ) : (
            <div>
            <GoogleMap
              mapContainerClassName='map-style'
              center={{lat: display.lat, lng: display.lng}}
              zoom={15}>
            </GoogleMap>
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
