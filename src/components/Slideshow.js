import React, { useState }  from "react";

// Disregard negative results
function mod(n, m) {
    return ((n % m) + m) % m;
  }

const Slideshow = ({ slides }) => {
    var [index, setIndex] = useState(0);
  
    const prev = () => {
        setIndex((prev) => mod((prev - 1), 2));
    };
  
    const next = () => {
        setIndex((prev) => mod((prev + 1), 2));
    };
  
    const goToSlide = (index) => {
        setIndex(index);
    };
  
    return (
      <div>
        <div className="slideshow">
          <div className="slideshow-content" style={{ transform: `translateX(${-index * 100}%)` }}>
            {slides.map((slide, index) => (
              <div className="slideshow-item" key={index}>
                {slide}
              </div>
            ))}
          </div>
          <button className="slideshow-button left" onClick={prev}>
            &#8249;
          </button>
          <button className="slideshow-button right" onClick={next}>
            &#8250;
          </button>
          <div className="center">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    );
  };  

  export default Slideshow