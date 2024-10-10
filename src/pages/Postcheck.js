
import homepage from '../images/Homepage.png'
import '../css/Postcheck.css'

export default function Postcheckout() {
    return (
        <div>
            <div class="welcome" alt="Avatar">
                <div class="heading-image">
                <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                    <div class="title">
                        <h1>About Us</h1>
                    </div>
                </div>
            </div>
            <div className='thankDiv'>
                <h1>Thank you for ordering!</h1>
                <p> We will contact you shortly to update you on your order status</p>
            </div>
        </div>
    );
}