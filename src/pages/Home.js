import bowl from '../images/bowl.jpeg'
import welcome from '../images/welcome.jpg'

export default function Home() {
    return (
        <div>
            <div class="welcome">
                <img src={welcome} alt="Avatar" style={{width: "100%", height:"600px"}}></img>
                <div class="title">
                    <h1>Eat Smart, Study Hard</h1>
                    <div class="centerButton"><button>Start Now</button></div>
                </div>
            </div>
            <section id="projects">
                <h1>Discover Meal Plans Tailored <br></br> for Busy Students!</h1>
                <div class="cards">
                    <div class="card">
                        <h2>Quick & Easy</h2>
                        <img src={bowl} alt="Avatar" style={{width: "100%"}}></img>
                        <div class="container">
                            <p>"Meals ready in under 30 minutes"</p>
                            <button>Explore Quick & Easy</button> 
                        </div>
                    </div>
                    <div class="card">
                        <h2>Quick & Easy</h2>
                        <img src={bowl} alt="Avatar" style={{width: "100%"}}></img>
                        <div class="container">
                            <p>"Meals ready in under 30 minutes"</p>
                            <button>Explore Quick & Easy</button> 
                        </div>
                    </div>
                    <div class="card">
                        <h2>Quick & Easy</h2>
                        <img src={bowl} alt="Avatar" style={{width: "100%"}}></img>
                        <div class="container">
                            <p>"Meals ready in under 30 minutes"</p>
                            <button>Explore Quick & Easy</button> 
                        </div>
                    </div>
                    <div class="card">
                        <h2>Quick & Easy</h2>
                        <img src={bowl} alt="Avatar" style={{width: "100%"}}></img>
                        <div class="container">
                            <p>"Meals ready in under 30 minutes"</p>
                            <button>Explore Quick & Easy</button> 
                        </div>
                    </div>
                    <div class="card">
                        <h2>Quick & Easy</h2>
                        <img src={bowl} alt="Avatar" style={{width: "100%"}}></img>
                        <div class="container">
                            <p>"Meals ready in under 30 minutes"</p>
                            <button>Explore Quick & Easy</button> 
                        </div>
                    </div>
                    <div class="card">
                        <h2>Quick & Easy</h2>
                        <img src={bowl} alt="Avatar" style={{width: "100%"}}></img>
                        <div class="container">
                            <p>"Meals ready in under 30 minutes"</p>
                            <button>Explore Quick & Easy</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}