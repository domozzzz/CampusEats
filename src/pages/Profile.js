import React, { useState } from 'react';
import homepage from '../images/Homepage.png';
import PestoChicken from '../images/Pesto_chicken.png';
import MangoSmoothie from '../images/Mango_smoothie.png';
import SausageSandwich from '../images/Sausage_sandwich.png';
import AcaiBowl from '../images/Acai_bowl.png';
import VeggieWrap from '../images/Veggie_wrap.png';
import AddressIcon from '../images/AddressIcon.png';
import EmailIcon from '../images/EmailIcon.png';
import PasswordIcon from '../images/PasswordIcon.png';
import '../css/Profile.css';

const Profile = () => {
    const [user] = useState({
        name: 'Gabriella O.',
        email: 'xxxxxxx@uq.edu.au',
        address: 'UQ St Lucia',
        orders: [
            { id: 1, name: 'Pesto Chicken & Pasta', date: 'July 15, 2024', image: PestoChicken },
            { id: 2, name: 'Mango Tango Smoothie', date: 'July 15, 2024', image: MangoSmoothie },
            { id: 3, name: 'Sausage & Egg Breakfast Sandwich', date: 'July 14, 2024', image: SausageSandwich },
            { id: 4, name: 'Acai Berry Bowl', date: 'July 13, 2024', image: AcaiBowl },
            { id: 5, name: 'California Veggie Wrap', date: 'July 12, 2024', image: VeggieWrap },
        ],
    });

    return (
        <div>
            <div class="welcome" alt="Avatar">
                <div class="heading-image">
                    <img src={homepage} alt="Avatar" style={{ zIndex: "0", width: "100%", height: "100vh", position: "relative" }}></img>
                </div>
            </div>
            <div className="profile">
                <div className="profile-header">
                    <div className="name-email-container">
                        <h2>{user.name}</h2>
                        <p className="email">{user.email}</p>
                    </div>
                    <div className="profile-buttons">
                        <button className="btn-account">Account</button>
                        <button className="btn-order-history">Order History</button>
                    </div>
                </div>

                <div className="details">
                    <h2>Details</h2>
                    <div className="detail-item">

                        <div className="detail-field">
                            <img src={AddressIcon} alt="Address Icon" className="icon" />
                            <div className="label-info">
                                <label>Delivery Address</label>
                                <p>{user.address}</p>
                            </div>
                        </div>

                        <div className="detail-field">
                            <img src={EmailIcon} alt="Email Icon" className="icon" />
                            <div className="label-info">
                                <label>Email Address</label>
                                <p>{user.email}</p>
                            </div>
                        </div>

                        <div className="detail-field">
                            <img src={PasswordIcon} alt="Password Icon" className="icon" />
                            <div className="label-info">
                                <label>Password</label>
                                <p>********</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order-history">
                    <h2>Order History</h2>
                    {user.orders.map((order) => (
                        <div key={order.id} className="order-item">
                            <div className="order-text">
                                <h3>{order.name}</h3>
                                <p>{order.date}</p>
                            </div>
                            <img src={order.image} alt={order.name} />
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <a href="#">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                </div>
            </div>
        </div>
    );
};

export default Profile;
