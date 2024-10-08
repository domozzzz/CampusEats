import React, { useState, useEffect, useRef } from 'react';
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
import { useAuth } from '../components/AuthProvider';
import { Navigate } from 'react-router-dom';
import supabase from '../supabase';

const Profile = () => {
    const { user } = useAuth()
    const { signOut } = useAuth()


    const uploadRef = useRef(null)
    const orderRef = useRef(null)
    const executeUploadScroll = (ref) => {
        window.scrollTo({
            top: ref.offsetTop,
            left: 0,
            behavior: "smooth",
          });
    }

    const [orders, setOrderds] = useState([])

    const [uploads, setUploads] = useState([])


    useEffect(() => {
        const getUploads = async () => {
            if (user) {
                const {data, error} = await supabase
                .from('sellers')
                .select('*,meals(*)')
                .eq('user_id',user.id)

                if (data.length > 0) {  // hello I changed this to check for length becuase users not in sellers table got react error on page
                    let filtered = data[0]['meals']
                    setUploads(filtered)
                }

                if (error) {
                    console.log(error)
                }
            }    
        }

        getUploads()
    },[])
    const [userDetails] = useState({
        name: user ? `${user['user_metadata']['first_name']} ${user['user_metadata']['last_name'][0]}` : null,
        email: user ? user.email : null,
        address: 'UQ St Lucia',
        orders: [
            { id: 1, name: 'Pesto Chicken & Pasta', date: 'July 15, 2024', image: PestoChicken },
            { id: 2, name: 'Mango Tango Smoothie', date: 'July 15, 2024', image: MangoSmoothie },
            { id: 3, name: 'Sausage & Egg Breakfast Sandwich', date: 'July 14, 2024', image: SausageSandwich },
        ],
    });

    return user ? (
        <div>
            <div class="welcome" alt="Avatar">
                <div class="heading-image">
                    <img src={homepage} alt="Avatar" style={{ zIndex: "0", width: "100%", height: "100vh", position: "relative" }}></img>
                </div>
            </div>
            <div className="profile">
                <div className="profile-header">
                    <div className="name-email-container">
                        <h2>{userDetails.name}</h2>
                        <p className="email">{userDetails.email}</p>
                    </div>
                    <div className="profile-buttons">
                        <button className="btn-account" onClick={() => signOut()}>Log Out</button>
                        <button className="btn-account" onClick={() => {executeUploadScroll(orderRef.current)}}>Order History</button>
                        <button className="btn-order-history" onClick={() => {executeUploadScroll(uploadRef.current)}}>Upload History</button>
                    </div>
                </div>

                <div className="details">
                    <h2>Details</h2>
                    <div className="detail-item">
                        <div className="detail-field">
                            <img src={EmailIcon} alt="Email Icon" className="icon" />
                            <div className="label-info">
                                <label>Email Address</label>
                                <p>{userDetails.email}</p>
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

                <div className="order-history" ref={orderRef}>
                    <h2>Order History</h2>
                    {userDetails.orders.map((order) => (
                        <div key={order.id} className="order-item">
                            <div className="order-text">
                                <h3>{order.name}</h3>
                                <p>{order.date}</p>
                            </div>
                            <img src={order.image} alt={order.name} />
                        </div>
                    ))}
                </div>

                <div className="order-history" ref={uploadRef}>
                    <h2>Uploaded MealKits</h2>
                    {uploads.map((upload) => (
                        <div key={upload.id} className="order-item">
                            <div className="order-text">
                                <h3>{upload.name}</h3>
                                <p>Number of Orders: {upload.number_of_orders}</p>
                                <p>You have made: ${0.50 * upload.number_of_orders}</p>
                                <p></p>
                            </div>
                            <img src={upload.photo} alt={upload.name} />
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
    ) : <Navigate to="/login"/>;
};

export default Profile;
