
import about from '../images/about.jpeg'
import homepage from '../images/homepage.png'
import { Link } from 'react-router-dom';

export default function About() {
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
            <div class="about" alt="Avatar">
                <div class="about-image">
                    <img src={about} alt="Avatar" style={{ width: "100%", height: "100%" }}></img>
                </div>
                <div class="about-text">
                    <h1>Who are we?</h1>
                    <p>
                        We are Team Alliance, a dedicated group of students from DECO3801 Design Computing Studio 3
                        - Build course. Our team is passionate about creating meaningful and innovative solutions to
                        everyday challenges, and we're excited to introduce our project—CampusEats.
                    </p>
                </div>
            </div>
            <div class="about2" alt="Avatar">
                <div class="about2-title">
                    <h1>What is CampusEats?</h1>
                </div>
                <div class="about2-text">
                    <p>
                        CampusEats is a custom meal kit service designed to cater to students' busy lifestyles. Our
                        goal is to provide students with easy access to fresh, nutritious, and customizable meal kits
                        that can be delivered right to their university. Our motto, "The Solution for Your Everyday
                        Meals," reflects our commitment to making meal planning and preparation simpler for students.
                        Whether you're looking to cook quickly between classes or enjoy a healthy meal at the end of
                        the day, CampusEats is here to support your culinary needs.
                    </p>
                </div>
            </div>
            <div class="join-us" alt="Avatar" style={{ width: "100%", height: "250px" }}>
            <div class="join-us-container">
                <h1>Join Us!</h1>
                <p>Ready to start eating better? Join CampusEats today and discover meal plans that fit your life.</p>
                <Link to="/register" class="about-register-button">Register</Link>
                </div>
            </div>
        </div>
    );
}