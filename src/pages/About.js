
import about from '../images/about.jpeg'

export default function About() {
    return (
        <div>
            <div class="about" alt="Avatar" style={{ width: "100%", height: "600px" }}>
                <div className="about-image">
                    <img src={about} alt="Avatar" style={{ width: "100%", height: "100%" }}></img>
                </div>
                <div className="about-text" style={{}}>
                    <h1>About Us</h1>
                    <p>
                        At CampusEats, our mission is to make healthy eating accessible and convenient <br></br>for university students. We believe that nutritious meals
                        are essential for academic success and overall well-being.<br></br> Our goal is to deliver fresh, wholesome meal kits that save time and provide 
                        the energy needed to excel in both studies and life.
                    </p>
                </div>
            </div>
        </div>
    );
}