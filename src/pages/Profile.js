import React, { useState, useEffect, useRef } from 'react';
import homepage from '../images/Homepage.png';
import EmailIcon from '../images/EmailIcon.png';
import PasswordIcon from '../images/PasswordIcon.png';
import '../css/Profile.css';
import { useAuth } from '../components/AuthProvider';
import { Navigate } from 'react-router-dom';
import supabase from '../supabase';

/**
 * Profile componet for rendering the Profile page
 * @returns Profile page
 */
const Profile = () => {

    //Used to generate Date of week before.
    //This is used when querying supabase for only recent orders
    const currentDate = new Date();
    const lastWeekDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    //User authentication and signout 
    const { user } = useAuth()
    const { signOut } = useAuth()

    //Used for scrolling to relevant section on button click
    const uploadRef = useRef(null)
    const orderRef = useRef(null)
    const executeUploadScroll = (ref) => {
        window.scrollTo({
            top: ref.offsetTop,
            left: 0,
            behavior: "smooth",
          });
    }

    //Store state of uploaded meals, and liked orders on page
    const [uploads, setUploads] = useState([])
    const [liked, setLiked] = useState([])
    //Basic user details, order array empty until supabase query
    const [userDetails, setUserDetails] = useState({
        name: user ? `${user['user_metadata']['first_name']} ${user['user_metadata']['last_name'][0]}` : null,
        email: user ? user.email : null,
        address: 'UQ St Lucia',
        orders: []
    })

    /***
     * UseEffect is not dependent on any state (runs once at start)
     * Returns seller meals (uploads) and orders connected to user
     */
    useEffect(() => {
        /**
         * Set state of user uploaded meals
         */
        const getUploads = async () => {
            if (user) {
                const {data, error} = await supabase
                .from('sellers')
                .select('*,meals(*)')
                .eq('user_id',user.id)
                //If user not a seller, ignore
                if (data.length > 0) {
                    let filtered = data[0]['meals']
                    setUploads(filtered)
                }

                if (error) {
                    console.log(error)
                }
            }    
        }
        /**
         * Return orders of user
         */
        const getOrders = async () => {
            //Only run if user is logged in
            if (user) {
                const {data, error} = await supabase
                .from('orders')
                .select('*,meals(*)')
                .eq('buyer_id',user.id)
                // < One Week Old
                .gte("created_at",lastWeekDate.toISOString())
                .order('created_at', {ascending: false})

                if (error) {
                    console.log(error)
                }

                if (data) {
                    //Generate an array for storing liked state.
                    //Array length = length of returned orders
                    let likes = new Array(data.length).fill(false)
                    setLiked(likes)
                    //Set userDetails as orders
                    setUserDetails({...userDetails, 
                        orders: data
                    })

                }
            }
        }
        getOrders()
        getUploads()

    },[])
    /**
     * When a user likes an order, supabase updates meal row to increment likes column
     * @param {*} e the element clicked by user (stores index in liked array)
     */
    const likeOrder = async (e) => {
        //e.target.name is index of relevant order
        //Check user hasn't already liked meal
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
        //Update likes in 'liked' array
        let likes = liked.map( (l, i) => {
            if (i == e.target.name) {
                return true
            } else {
                return l
            }   
        })
        setLiked(likes)
    }
    /**
     * format date to be displayed on front-end
     * @param {*} date date in timestamp format
     * @returns date in format YYYY/MM/DD
     */
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
                    {/* Map each order as an entry */}
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
                    {/* Map each upload as an entry */}
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
            </div>
        </div>
    ) : <Navigate to="/login"/>;
};

export default Profile;
