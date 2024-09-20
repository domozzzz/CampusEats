import React, { useState } from "react";
import '../css/Slideshow.css';

// Disregard negative results
function mod(n, m) {
    return ((n % m) + m) % m;
}

const Slideshow = ({ slides }) => {
    const [index, setIndex] = useState(0);

    const prev = () => {
        setIndex((prev) => mod((prev - 1), slides.length));
    };

    const next = () => {
        setIndex((prev) => mod((prev + 1), slides.length));
    };

    const goToSlide = (index) => {
        setIndex(index);
    };

    return (
        <div>
            <div className="slideshow">
                <div className="slideshow-content" style={{ transform: `translateX(${-index * 100}%)` }}>
                    {slides.map((slide, i) => (
                        <div className="slideshow-item" key={i}>
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
                    {slides.map((_, i) => (
                        <span
                            key={i}
                            className={`dot ${i === index ? "active" : ""}`}
                            onClick={() => goToSlide(i)}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slideshow;