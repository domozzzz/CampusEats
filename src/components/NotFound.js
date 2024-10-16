import homepage from '../images/Homepage.png'
function NotFound() {
    return (
        <div>
            <div class="welcome" alt="Avatar">
                <div class="heading-image">
                    <img src={homepage} alt="Avatar" style={{zIndex: "0", width: "100%", height: "100vh", position: "relative"}}></img>
                </div>
            </div>
            <div className='white' style={{'height': '60vh'}}>
                <h1>Whoops!</h1>
                <br/>
                <p>The page your looking for doesn't exist...</p>
            </div>
         </div>
    )
}

export default NotFound