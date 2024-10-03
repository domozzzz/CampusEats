import React, { useState } from 'react';
import homepage from '../images/homepage.png'; 
import BeefBurrito from '../images/Beef_burrito.png';
import Heart from '../images/Heart.png'; 
import '../css/OrderStatus.css';

function orderItem(image, name, cost, quantity, onIncrease, onDecrease) {
    return (
        <div className='orderItem'>
            <img src={image} alt={name} />
            <p>{name}<br/>${cost}</p>
            <div className='quantity-control'>
                <button onClick={onDecrease}>-</button>
                <p>{quantity}</p>
                <button onClick={onIncrease}>+</button> 
            </div>
            <p>
                ${ (quantity * cost).toFixed(2) } 
            </p>
            <img src={Heart} alt="Favorite" style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
        </div>
    );
}

export default function OrderStatus() {
    const [quantity, setQuantity] = useState(2);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <div>
            <div className="welcome">
                <div className="heading-image">
                    <img src={homepage} alt="Homepage" style={{ zIndex: "0", width: "100%", height: "100vh", position: "relative" }} />
                </div>
            </div>

            <div className='order-status'>
                <h1>Your Most Recent Order</h1>

                {orderItem(BeefBurrito, 'Braised Beef Burrito', 14.00, quantity, increaseQuantity, decreaseQuantity)}

                <div className="order-status-info">
                    <p>Status:</p>
                    <h2>On the way</h2>
                </div>

                <button className='report-problem'>Report a Problem</button>
            </div>
        </div>
    );
}
