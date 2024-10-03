import homepage from '../images/homepage.png';
import { Link } from "react-router-dom";
import React, { useState } from 'react';


export default function OrderSelect() {
    return (
        <div>
            <div class="welcome" alt="Avatar">
                <div class="heading-image">
                <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                </div>
            </div>
            <div class="order">
                <h1>Search Universities</h1>
                    <div className='search-box'>
                        <input type="search" placeholder="Search for University"/>
                    </div>
            </div>
        </div>
    );
}