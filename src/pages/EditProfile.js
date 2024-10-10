import React, { useState } from 'react';
import homepage from '../images/homepage.png';
import '../css/EditProfile.css';

export default function EditProfile() {
    const [formData, setFormData] = useState({
        fullName: 'Gabriella O.',
        email: 'xxxxxxx@uq.edu.au',
        deliveryAddress: 'UQ St Lucia',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div>
            <div className="welcome">
                <div className="heading-image">
                    <img src={homepage} alt="Homepage" style={{ zIndex: "0", width: "100%", height: "100vh", position: "relative" }} />
                </div>
            </div>

            <div className="edit-profile">
                <form className="edit-profile-form">
                    <h1>Edit Profile</h1>

                    <div className="form-group">
                        <label htmlFor="fullName">Your Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="deliveryAddress">Delivery Address</label>
                        <input
                            type="text"
                            id="deliveryAddress"
                            name="deliveryAddress"
                            value={formData.deliveryAddress}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="save-btn">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
