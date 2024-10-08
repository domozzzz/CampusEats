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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const currentDate = new Date();
    const lastWeekDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
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


    const [uploads, setUploads] = useState([])
    const [liked, setLiked] = useState([])

    const [userDetails, setUserDetails] = useState({
        name: user ? `${user['user_metadata']['first_name']} ${user['user_metadata']['last_name'][0]}` : null,
        email: user ? user.email : null,
        address: 'UQ St Lucia',
        orders: []
    })


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

        const getOrders = async () => {
            if (user) {
                const {data, error} = await supabase
                .from('orders')
                .select('*,meals(*)')
                .eq('buyer_id',user.id)
                .gte("created_at",lastWeekDate.toISOString())
                .order('created_at', {ascending: false})

                if (error) {
                    console.log(error)
                }

                if (data) {
                    
                    let likes = new Array(data.length).fill(false)
                    setLiked(likes)
                    setUserDetails({...userDetails, 
                        orders: data
                    })

                }
            }
        }
        getOrders()
        getUploads()

    },[])

    const likeOrder = async (e) => {
        if (liked[e.target.name] != true) {
            let meal = userDetails.orders[e.target.name]
            const {data, error} = await supabase
            .from('meals')
            .update({'likes': meal.meals['likes'] + 1})
            .eq('id', meal.meals['id'])
            .select()

            if (error) {
                console.log(error)
            }

        }    
        let likes = liked.map( (l, i) => {
            if (i == e.target.name) {
                return true
            } else {
                return l
            }   
        })
        setLiked(likes)
    }

    const dateFormat = (date) => {
        return date.slice(0,10)
    }

 
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
                    {userDetails.orders.map((order, i) => (
                        <div key={order.id} className="order-item">
                            <div className="order-text">
                                <h3>{order.meals.name}</h3>
                                <p>{dateFormat(order.created_at)}</p>
                            </div>
                            <button name={i} onClick={likeOrder} className={liked[i] ? 'heart-button activeProfile' : 'heart-button'}>♥</button>
                            <img src={order.meals.photo} alt={order.meals.name} />
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

                {/* <div className="pagination">
                    <a href="#">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                </div> */}
            </div>
        </div>
    ) : <Navigate to="/login"/>;
};

export default Profile;
